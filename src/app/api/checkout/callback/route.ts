/**
 * GET /api/checkout/callback
 * 
 * PayGate.to callback handler. Called by PayGate after successful payment.
 * 
 * Flow:
 * 1. Receives GET request with ?order={ORDER_NUMBER}&value_coin={USDC_AMOUNT}
 * 2. Validates the order exists and is pending
 * 3. Updates order status to 'paid'
 * 4. Provisions IPTV subscription via MegaOTT API (POST /v1/subscriptions)
 * 5. Sends credentials email to customer
 * 6. Updates order status to 'provisioned'
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { loadPaymentSettings } from '@/lib/payment-settings';
import { createSubscription, getMegaOTTConfig } from '@/lib/megaott';
import { sendCredentialsEmail, getEmailConfig } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('order');
    const valueCoin = searchParams.get('value_coin');

    console.log(`[Callback] Received callback for order: ${orderNumber}, value_coin: ${valueCoin}`);

    if (!orderNumber) {
      console.error('[Callback] Missing order number');
      return NextResponse.json({ error: 'Missing order number' }, { status: 400 });
    }

    // Find the order
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderNumber, orderNumber))
      .limit(1);

    if (!order) {
      console.error(`[Callback] Order not found: ${orderNumber}`);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Prevent double processing - only skip if already fully provisioned
    if (order.status === 'provisioned') {
      console.log(`[Callback] Order ${orderNumber} already provisioned, skipping`);
      return NextResponse.json({ status: 'already_processed' });
    }

    // Allow 'pending' and 'paid' (retry provisioning if payment confirmed but provisioning failed)
    if (order.status !== 'pending' && order.status !== 'paid') {
      console.error(`[Callback] Order ${orderNumber} has unexpected status: ${order.status}`);
      return NextResponse.json({ error: 'Invalid order status' }, { status: 400 });
    }

    const now = new Date().toISOString();

    // Update order to paid (only if still pending)
    if (order.status === 'pending') {
      await db
        .update(orders)
        .set({
          status: 'paid',
          valueCoin: valueCoin || null,
          updatedAt: now,
        })
        .where(eq(orders.orderNumber, orderNumber));
      console.log(`[Callback] Order ${orderNumber} marked as paid`);
    } else {
      console.log(`[Callback] Order ${orderNumber} already paid, retrying provisioning...`);
    }

    // Load settings
    const settings = await loadPaymentSettings();

    // ─── Provision IPTV Subscription via MegaOTT ───
    let credentials = null;
    try {
      const megaottConfig = getMegaOTTConfig(settings);
      
      if (megaottConfig) {
        // Determine package ID based on product slug mapping in admin settings
        const packageKey = `megaott_package_${order.productSlug}`;
        const packageIdStr = settings[packageKey] || settings['megaott_default_package'] || '';
        
        if (!packageIdStr) {
          console.warn(`[Callback] No MegaOTT package ID configured for ${order.productSlug}`);
        }

        const packageId = parseInt(packageIdStr, 10);
        if (isNaN(packageId)) {
          throw new Error(`Invalid package ID "${packageIdStr}" for product ${order.productSlug}`);
        }

        // Read optional settings with defaults
        const forcedCountry = settings['megaott_forced_country'] || 'ALL';
        const templateIdStr = settings['megaott_template_id'];
        const templateId = templateIdStr ? parseInt(templateIdStr, 10) : undefined;

        credentials = await createSubscription(megaottConfig, {
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

        // Save credentials to order
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

        console.log(`[Callback] Order ${orderNumber} provisioned with username: ${credentials.username}`);
      } else {
        console.warn('[Callback] MegaOTT not configured, skipping provisioning');
      }
    } catch (provisionError) {
      console.error(`[Callback] Failed to provision IPTV for order ${orderNumber}:`, provisionError);
      // Don't fail the callback - the payment was received. Mark as paid so admin can manually provision.
      await db
        .update(orders)
        .set({
          status: 'paid', // Keep as paid, admin can manually provision
          updatedAt: new Date().toISOString(),
        })
        .where(eq(orders.orderNumber, orderNumber));
    }

    // ─── Send Email with Credentials ───
    if (credentials) {
      try {
        const emailConfig = getEmailConfig(settings);
        
        if (emailConfig) {
          await sendCredentialsEmail(emailConfig, {
            orderNumber,
            customerName: order.customerName || '',
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

          console.log(`[Callback] Credentials email sent to ${order.email}`);
        } else {
          console.warn('[Callback] Email not configured, skipping email notification');
        }
      } catch (emailError) {
        console.error(`[Callback] Failed to send email for order ${orderNumber}:`, emailError);
        // Don't fail - credentials are saved in DB, admin can resend
      }
    }

    // Return success (PayGate expects a 200 response)
    return NextResponse.json({ status: 'success', orderNumber });
  } catch (error) {
    console.error('[Callback] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
