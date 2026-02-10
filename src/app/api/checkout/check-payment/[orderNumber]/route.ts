/**
 * GET /api/checkout/check-payment/[orderNumber]
 * 
 * Polls PayGate payment status via ipn_token and triggers
 * provisioning when payment is confirmed.
 * Called by the success page to auto-detect payment.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { loadPaymentSettings } from '@/lib/payment-settings';
import { createSubscription, getMegaOTTConfig } from '@/lib/megaott';
import { sendCredentialsEmail, getEmailConfig } from '@/lib/email';

type Props = {
  params: Promise<{ orderNumber: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { orderNumber } = await params;

    if (!orderNumber) {
      return NextResponse.json({ error: 'Missing order number' }, { status: 400 });
    }

    // Find the order
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderNumber, orderNumber))
      .limit(1);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // If already provisioned, return credentials
    if (order.status === 'provisioned') {
      return NextResponse.json({
        status: 'provisioned',
        credentials: order.iptvUsername ? {
          username: order.iptvUsername,
          password: order.iptvPassword,
          serverUrl: order.iptvServerUrl,
          playlistUrl: order.iptvPlaylistUrl,
          expDate: order.iptvExpDate,
        } : null,
      });
    }

    // Check PayGate payment status via ipn_token
    if (!order.ipnToken) {
      return NextResponse.json({ status: order.status, paygateStatus: 'no_token' });
    }

    let paygateStatus = 'unknown';
    try {
      const statusUrl = `https://api.paygate.to/control/payment-status.php?ipn_token=${encodeURIComponent(order.ipnToken)}`;
      const statusResp = await fetch(statusUrl);
      if (statusResp.ok) {
        const statusData = await statusResp.json();
        paygateStatus = statusData.status || 'unknown';
      }
    } catch (e) {
      console.error(`[CheckPayment] PayGate status check failed:`, e);
    }

    // If PayGate confirms payment, trigger the full flow
    if (paygateStatus === 'paid' && (order.status === 'pending' || order.status === 'paid')) {
      console.log(`[CheckPayment] PayGate confirmed payment for ${orderNumber}, provisioning...`);

      // Mark as paid if still pending
      if (order.status === 'pending') {
        await db
          .update(orders)
          .set({ status: 'paid', updatedAt: new Date().toISOString() })
          .where(eq(orders.orderNumber, orderNumber));
      }

      // Provision IPTV
      try {
        const settings = await loadPaymentSettings();
        const megaottConfig = getMegaOTTConfig(settings);

        if (megaottConfig) {
          const packageKey = `megaott_package_${order.productSlug}`;
          const packageIdStr = settings[packageKey] || settings['megaott_default_package'] || '';
          const packageId = parseInt(packageIdStr, 10);

          if (!isNaN(packageId)) {
            const forcedCountry = settings['megaott_forced_country'] || 'ALL';
            const templateIdStr = settings['megaott_template_id'];
            const templateId = templateIdStr ? parseInt(templateIdStr, 10) : undefined;

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

            console.log(`[CheckPayment] Order ${orderNumber} provisioned: ${credentials.username}`);

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
            }

            return NextResponse.json({
              status: 'provisioned',
              credentials: {
                username: credentials.username,
                password: credentials.password,
                serverUrl: credentials.serverUrl,
                playlistUrl: credentials.playlistUrl,
                expDate: credentials.expDate,
              },
            });
          }
        }
      } catch (provisionError) {
        console.error(`[CheckPayment] Provisioning failed for ${orderNumber}:`, provisionError);
      }
    }

    return NextResponse.json({
      status: order.status,
      paygateStatus,
    });
  } catch (error) {
    console.error('[CheckPayment] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
