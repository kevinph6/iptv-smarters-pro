/**
 * POST /api/checkout/create-session
 * 
 * Creates a PayGate.to payment session:
 * 1. Validates the product and customer email
 * 2. Creates a temporary wallet via PayGate.to API
 * 3. Saves a pending order in the database
 * 4. Returns the payment redirect URL
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { loadPaymentSettings, generateOrderNumber } from '@/lib/payment-settings';

// Product data (matches the hardcoded products in the product pages)
const PRODUCTS: Record<string, { title: string; price: string; type: string; duration: string }> = {
  'test-iptv-3-mois': { title: 'TEST 3 Mois IPTV', price: '7', type: 'HD', duration: '3 mois' },
  'abonnement-iptv-hd-3-mois': { title: '3 Mois IPTV HD', price: '19', type: 'HD', duration: '3 mois' },
  'abonnement-iptv-hd-6-mois': { title: '6 Mois IPTV HD', price: '22', type: 'HD', duration: '6 mois' },
  'abonnement-iptv-hd-12-mois': { title: '12 Mois IPTV HD', price: '39', type: 'HD', duration: '12 mois' },
  'abonnement-iptv-hd-24-mois': { title: '24 Mois IPTV HD', price: '59', type: 'HD', duration: '24 mois' },
  'abonnement-iptv-premium-4k-3-mois': { title: '3 Mois Premium 4K', price: '27', type: 'PREMIUM_4K', duration: '3 mois' },
  'abonnement-iptv-premium-4k-6-mois': { title: '6 Mois Premium 4K', price: '42', type: 'PREMIUM_4K', duration: '6 mois' },
  'abonnement-iptv-premium-4k-12-mois': { title: '12 Mois Premium 4K', price: '69', type: 'PREMIUM_4K', duration: '12 mois' },
  'abonnement-iptv-premium-4k-24-mois': { title: '24 Mois Premium 4K', price: '100', type: 'PREMIUM_4K', duration: '24 mois' },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, email, customerName, customerPhone } = body;

    // Validate inputs
    if (!slug || !email || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis (nom, email, téléphone)' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Validate phone (basic: at least 8 digits)
    const phoneDigits = customerPhone.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      return NextResponse.json(
        { error: 'Numéro de téléphone invalide (minimum 8 chiffres)' },
        { status: 400 }
      );
    }

    // Validate product exists
    const product = PRODUCTS[slug];
    if (!product) {
      return NextResponse.json(
        { error: 'Produit introuvable' },
        { status: 404 }
      );
    }

    // Load payment settings
    const settings = await loadPaymentSettings();
    const usdcWallet = settings['paygate_usdc_wallet'];
    const provider = settings['paygate_provider'] || 'multi';
    const currency = settings['paygate_currency'] || 'EUR';

    if (!usdcWallet) {
      console.error('[Checkout] Missing USDC wallet in payment settings');
      return NextResponse.json(
        { error: 'Configuration de paiement manquante. Veuillez contacter le support.' },
        { status: 500 }
      );
    }

    // Generate order number
    const orderNumber = generateOrderNumber();
    const requestOrigin = request.headers.get('origin') || request.nextUrl.origin;
    const siteUrl = requestOrigin || process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://abonnement-iptv-smarterspro.fr';
    
    // Build callback URL with order number as unique parameter
    const callbackUrl = `${siteUrl}/api/checkout/callback?order=${orderNumber}`;
    const encodedCallback = encodeURIComponent(callbackUrl);

    // Step 1: Create temporary wallet via PayGate.to
    const walletUrl = `https://api.paygate.to/control/wallet.php?address=${encodeURIComponent(usdcWallet)}&callback=${encodedCallback}`;
    
    const walletResponse = await fetch(walletUrl);
    if (!walletResponse.ok) {
      console.error('[Checkout] PayGate wallet creation failed:', walletResponse.status);
      return NextResponse.json(
        { error: 'Erreur lors de la creation du paiement. Veuillez reessayer.' },
        { status: 502 }
      );
    }

    const walletData = await walletResponse.json();
    const addressIn = walletData.address_in;
    const ipnToken = walletData.ipn_token;

    if (!addressIn) {
      console.error('[Checkout] No address_in in PayGate response:', walletData);
      return NextResponse.json(
        { error: 'Erreur de configuration du paiement. Veuillez reessayer.' },
        { status: 502 }
      );
    }

    // Save pending order in database
    const now = new Date().toISOString();
    await db.insert(orders).values({
      orderNumber,
      email,
      customerName,
      customerPhone,
      productSlug: slug,
      productTitle: product.title,
      amount: product.price,
      currency,
      status: 'pending',
      paymentProvider: provider,
      ipnToken: ipnToken || null,
      addressIn: addressIn,
      createdAt: now,
      updatedAt: now,
    });

    // Step 2: Build payment redirect URL per PayGate.to API docs
    // https://documenter.getpostman.com/view/14826208/2sA3Bj9aBi
    //
    // IMPORTANT: address_in from wallet.php is ALREADY URL-encoded (contains %2F, %3D, %2B).
    // Do NOT use encodeURIComponent() on it — double-encoding causes PayGate to reject it
    // with "Provided wallet address is not allowed" (400 error).
    // Pass address_in directly into the URL as-is.
    const encodedEmail = encodeURIComponent(email);

    let paymentUrl: string;

    // Valid single-provider names per API docs
    const VALID_PROVIDERS = [
      'moonpay', 'banxa', 'transak', 'particle', 'guardarian', 'rampnetwork',
      'mercuryo', 'utorg', 'transfi', 'stripe', 'topper', 'sardine', 'upi',
      'robinhood', 'coinbase', 'unlimit', 'bitnovo', 'simplex', 'interac',
      'binance', 'revolut',
    ];

    if (provider !== 'multi' && VALID_PROVIDERS.includes(provider)) {
      // Single provider mode → process-payment.php
      paymentUrl = `https://checkout.paygate.to/process-payment.php?address=${addressIn}&amount=${product.price}&provider=${provider}&email=${encodedEmail}&currency=${currency}`;
    } else {
      // Multi-provider mode → pay.php (shows all available payment methods)
      paymentUrl = `https://checkout.paygate.to/pay.php?address=${addressIn}&amount=${product.price}&email=${encodedEmail}&currency=${currency}`;
    }

    console.log(`[Checkout] Order ${orderNumber} | provider=${provider} | url=${paymentUrl}`);

    return NextResponse.json({
      success: true,
      orderNumber,
      paymentUrl,
    });
  } catch (error) {
    console.error('[Checkout] Create session error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
