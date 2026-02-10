/**
 * Payment Settings Helper
 * 
 * Loads admin-configurable payment settings from the database.
 */

import { db } from '@/db';
import { paymentSettings } from '@/db/schema';

/**
 * Load all payment settings as a key-value record
 */
export async function loadPaymentSettings(): Promise<Record<string, string>> {
  const rows = await db.select().from(paymentSettings);
  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return settings;
}

/**
 * Get a single payment setting by key
 */
export async function getPaymentSetting(key: string): Promise<string | null> {
  const all = await loadPaymentSettings();
  return all[key] || null;
}

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `IPT-${timestamp}-${random}`;
}

/**
 * List of available PayGate.to payment providers
 */
export const PAYGATE_PROVIDERS = [
  { value: 'multi', label: 'Multi-provider (recommande)' },
  { value: 'stripe', label: 'Stripe' },
  { value: 'moonpay', label: 'MoonPay' },
  { value: 'banxa', label: 'Banxa' },
  { value: 'transak', label: 'Transak' },
  { value: 'guardarian', label: 'Guardarian' },
  { value: 'rampnetwork', label: 'Ramp Network' },
  { value: 'mercuryo', label: 'Mercuryo' },
  { value: 'utorg', label: 'Utorg' },
  { value: 'transfi', label: 'TransFi' },
  { value: 'topper', label: 'Topper' },
  { value: 'sardine', label: 'Sardine' },
  { value: 'revolut', label: 'Revolut' },
  { value: 'coinbase', label: 'Coinbase' },
  { value: 'unlimit', label: 'Unlimit' },
  { value: 'bitnovo', label: 'Bitnovo' },
  { value: 'simplex', label: 'Simplex' },
  { value: 'binance', label: 'Binance' },
] as const;
