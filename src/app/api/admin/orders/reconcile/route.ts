/**
 * POST /api/admin/orders/reconcile
 * 
 * Admin endpoint to manually check PayGate payment status and trigger provisioning.
 * Uses PayGate's payment-status.php?ipn_token=TOKEN to verify payment.
 * 
 * Body: { orderNumber: string }
 * 
 * Flow:
 * 1. Look up order by orderNumber
 * 2. Check PayGate payment status via ipn_token
 * 3. If paid, trigger the full provisioning + email flow
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { loadPaymentSettings } from '@/lib/payment-settings';
import { createSubscription, getMegaOTTConfig } from '@/lib/megaott';
import { sendCredentialsEmail, getEmailConfig } from '@/lib/email';

export const runtime = 'nodejs';

const adminRoles = new Set(['admin', 'dev']);

async function requireAdmin(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }
  const userRole = (session.user as { role?: string }).role;
  if (!userRole || !adminRoles.has(userRole)) {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }
  return null;
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { orderNumber } = body;

    if (!orderNumber) {
      return NextResponse.json({ error: 'orderNumber requis' }, { status: 400 });
    }

    // Find the order
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderNumber, orderNumber))
      .limit(1);

    if (!order) {
      return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 });
    }

    if (order.status === 'provisioned') {
      return NextResponse.json({ message: 'Commande deja provisionee', status: order.status });
    }

    // Step 1: Check PayGate payment status via ipn_token
    let paygateStatus = 'unknown';
    if (order.ipnToken) {
      try {
        const statusUrl = `https://api.paygate.to/control/payment-status.php?ipn_token=${encodeURIComponent(order.ipnToken)}`;
        const statusResp = await fetch(statusUrl);
        if (statusResp.ok) {
          const statusData = await statusResp.json();
          paygateStatus = statusData.status || 'unknown';
          console.log(`[Reconcile] PayGate status for ${orderNumber}: ${paygateStatus}`);
        }
      } catch (e) {
        console.error(`[Reconcile] Failed to check PayGate status:`, e);
      }
    }

    // If PayGate says unpaid, return the status
    if (paygateStatus === 'unpaid') {
      return NextResponse.json({
        message: 'Paiement non encore confirme par PayGate',
        paygateStatus,
        orderStatus: order.status,
        polygonAddress: order.polygonAddressIn,
      });
    }

    // Step 2: Mark as paid if still pending
    if (order.status === 'pending') {
      await db
        .update(orders)
        .set({ status: 'paid', updatedAt: new Date().toISOString() })
        .where(eq(orders.orderNumber, orderNumber));
      console.log(`[Reconcile] Order ${orderNumber} marked as paid`);
    }

    // Step 3: Provision IPTV if not yet done
    if (!order.iptvUsername) {
      const settings = await loadPaymentSettings();
      const megaottConfig = getMegaOTTConfig(settings);

      if (!megaottConfig) {
        return NextResponse.json({
          message: 'MegaOTT non configure',
          paygateStatus,
          orderStatus: 'paid',
        }, { status: 500 });
      }

      const packageKey = `megaott_package_${order.productSlug}`;
      const packageIdStr = settings[packageKey] || settings['megaott_default_package'] || '';
      const packageId = parseInt(packageIdStr, 10);

      if (isNaN(packageId)) {
        return NextResponse.json({
          error: `Package ID manquant pour ${order.productSlug}`,
          paygateStatus,
        }, { status: 500 });
      }

      const forcedCountry = settings['megaott_forced_country'] || 'ALL';
      const templateIdStr = settings['megaott_template_id'];
      const templateId = templateIdStr ? parseInt(templateIdStr, 10) : undefined;

      try {
        const credentials = await createSubscription(megaottConfig, {
          type: 'M3U',
          packageId,
          maxConnections: 1,
          forcedCountry,
          templateId,
          adult: false,
          enableVpn: false,
          paid: false,
          note: `Order #${orderNumber} - ${order.productTitle}`,
          whatsappTelegram: order.customerPhone || '',
        });

        // Save credentials
        await db
          .update(orders)
          .set({
            status: 'provisioned',
            iptvUsername: credentials.username,
            iptvPassword: credentials.password,
            iptvServerUrl: credentials.serverUrl,
            iptvExpDate: credentials.expDate,
            iptvPlaylistUrl: credentials.playlistUrl,
            iptvPlaylistType: credentials.playlistType,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(orders.orderNumber, orderNumber));

        console.log(`[Reconcile] Order ${orderNumber} provisioned: ${credentials.username}`);

        // Send email
        const emailConfig = getEmailConfig(settings);
        if (emailConfig) {
          await sendCredentialsEmail(emailConfig, {
            orderNumber,
            customerEmail: order.email,
            productTitle: order.productTitle,
            amount: order.amount,
            currency: order.currency,
            credentials: {
              username: credentials.username,
              password: credentials.password,
              serverUrl: credentials.serverUrl,
              playlistUrl: credentials.playlistUrl,
              expDate: credentials.expDate,
            },
          });
          console.log(`[Reconcile] Email sent to ${order.email}`);
        }

        return NextResponse.json({
          success: true,
          message: 'Commande provisionee avec succes',
          paygateStatus,
          credentials: {
            username: credentials.username,
            expDate: credentials.expDate,
          },
        });
      } catch (provisionError) {
        console.error(`[Reconcile] Provisioning failed:`, provisionError);
        return NextResponse.json({
          error: `Provisioning echoue: ${String(provisionError)}`,
          paygateStatus,
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      message: 'Commande deja provisionee',
      paygateStatus,
      orderStatus: order.status,
    });
  } catch (error) {
    console.error('[Reconcile] Error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
