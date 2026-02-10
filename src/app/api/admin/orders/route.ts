/**
 * GET /api/admin/orders
 * POST /api/admin/orders (resend email for a specific order)
 * 
 * Admin-only route for viewing and managing orders.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { auth } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';
import { loadPaymentSettings } from '@/lib/payment-settings';
import { sendCredentialsEmail, getEmailConfig } from '@/lib/email';

export const runtime = 'nodejs';

const adminRoles = new Set(['admin', 'dev']);

async function requireAdmin(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  const userRole = (session.user as { role?: string }).role;
  if (!userRole || !adminRoles.has(userRole)) {
    return NextResponse.json({ error: 'Acces refuse - Admin requis' }, { status: 403 });
  }

  return null;
}

export async function GET(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const statusFilter = searchParams.get('status');
    const limit = limitParam ? Math.min(200, Math.max(1, Number(limitParam) || 50)) : 50;

    let allOrders;
    if (statusFilter) {
      allOrders = await db
        .select()
        .from(orders)
        .where(eq(orders.status, statusFilter))
        .orderBy(desc(orders.id))
        .limit(limit);
    } else {
      allOrders = await db
        .select()
        .from(orders)
        .orderBy(desc(orders.id))
        .limit(limit);
    }
    return NextResponse.json(allOrders);
  } catch (error) {
    console.error('[Admin Orders] GET error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

/**
 * POST: Resend credentials email for a specific order
 * Body: { orderNumber: string, action: 'resend_email' }
 */
export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { orderNumber, action } = body;

    if (!orderNumber || action !== 'resend_email') {
      return NextResponse.json({ error: 'Parametres invalides' }, { status: 400 });
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

    if (!order.iptvUsername || !order.iptvPassword) {
      return NextResponse.json({ error: 'Aucun identifiant IPTV pour cette commande' }, { status: 400 });
    }

    // Load email config and send
    const settings = await loadPaymentSettings();
    const emailConfig = getEmailConfig(settings);

    if (!emailConfig) {
      return NextResponse.json({ error: 'Configuration email manquante' }, { status: 500 });
    }

    const success = await sendCredentialsEmail(emailConfig, {
      orderNumber: order.orderNumber,
      customerName: order.customerName || '',
      customerEmail: order.email,
      productTitle: order.productTitle,
      amount: order.amount,
      currency: order.currency,
      credentials: {
        username: order.iptvUsername,
        password: order.iptvPassword,
        serverUrl: order.iptvServerUrl || '',
        playlistUrl: order.iptvPlaylistUrl || '',
        expDate: order.iptvExpDate || '',
      },
    });

    if (success) {
      return NextResponse.json({ success: true, message: 'Email renvoye avec succes' });
    } else {
      return NextResponse.json({ error: 'Echec de l\'envoi de l\'email' }, { status: 500 });
    }
  } catch (error) {
    console.error('[Admin Orders] POST error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
