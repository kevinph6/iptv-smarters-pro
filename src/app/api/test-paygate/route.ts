/**
 * GET /api/test-paygate
 * 
 * Debug endpoint to test PayGate.to integration step by step.
 * Shows exactly what wallet.php returns and what payment URL would be generated.
 */

import { NextResponse } from 'next/server';
import { loadPaymentSettings } from '@/lib/payment-settings';

export async function GET() {
  try {
    const settings = await loadPaymentSettings();
    const usdcWallet = settings['paygate_usdc_wallet'] || '';
    const provider = settings['paygate_provider'] || 'multi';
    const currency = settings['paygate_currency'] || 'EUR';

    const debug: Record<string, unknown> = {
      step0_settings: {
        usdcWallet: usdcWallet ? `${usdcWallet.substring(0, 10)}...${usdcWallet.substring(usdcWallet.length - 6)}` : 'NOT SET',
        usdcWalletLength: usdcWallet.length,
        provider,
        currency,
      },
    };

    if (!usdcWallet) {
      return NextResponse.json({ error: 'No USDC wallet configured', debug });
    }

    // Step 1: Create temporary wallet
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
    const testOrderNumber = `TEST-${Date.now()}`;
    const callbackUrl = `${siteUrl}/api/checkout/callback?order=${testOrderNumber}`;
    const encodedCallback = encodeURIComponent(callbackUrl);

    const walletUrl = `https://api.paygate.to/control/wallet.php?address=${encodeURIComponent(usdcWallet)}&callback=${encodedCallback}`;
    
    debug.step1_walletRequest = {
      url: walletUrl,
      callbackUrl,
    };

    const walletResponse = await fetch(walletUrl);
    const walletRawText = await walletResponse.text();

    debug.step1_walletResponse = {
      status: walletResponse.status,
      statusText: walletResponse.statusText,
      rawBody: walletRawText.substring(0, 500),
    };

    let walletData: Record<string, unknown>;
    try {
      walletData = JSON.parse(walletRawText);
    } catch {
      return NextResponse.json({ error: 'wallet.php returned non-JSON', debug });
    }

    const addressIn = walletData.address_in as string;

    debug.step1_parsed = {
      address_in: addressIn ? `${addressIn.substring(0, 30)}...` : 'MISSING',
      address_in_length: addressIn ? addressIn.length : 0,
      polygon_address_in: walletData.polygon_address_in,
      callback_url: walletData.callback_url,
      ipn_token: walletData.ipn_token ? 'present' : 'MISSING',
    };

    if (!addressIn) {
      return NextResponse.json({ error: 'No address_in in wallet response', debug });
    }

    // Step 2: Build payment URL
    // address_in is already URL-encoded — do NOT encodeURIComponent it again
    const encodedEmail = encodeURIComponent('test@example.com');
    const testAmount = '7';

    const VALID_PROVIDERS = [
      'moonpay', 'banxa', 'transak', 'particle', 'guardarian', 'rampnetwork',
      'mercuryo', 'utorg', 'transfi', 'stripe', 'topper', 'sardine', 'upi',
      'robinhood', 'coinbase', 'unlimit', 'bitnovo', 'simplex', 'interac',
      'binance', 'revolut',
    ];

    let paymentUrl: string;
    if (provider !== 'multi' && VALID_PROVIDERS.includes(provider)) {
      paymentUrl = `https://checkout.paygate.to/process-payment.php?address=${addressIn}&amount=${testAmount}&provider=${provider}&email=${encodedEmail}&currency=${currency}`;
    } else {
      paymentUrl = `https://checkout.paygate.to/pay.php?address=${addressIn}&amount=${testAmount}&email=${encodedEmail}&currency=${currency}`;
    }

    debug.step2_paymentUrl = {
      mode: VALID_PROVIDERS.includes(provider) ? 'single-provider' : 'multi-provider',
      provider,
      url: paymentUrl,
      addressInPreview: `${addressIn.substring(0, 40)}...`,
    };

    return NextResponse.json({ success: true, debug });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
