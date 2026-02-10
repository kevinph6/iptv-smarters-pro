/**
 * GET /api/checkout/status/[orderNumber]
 * 
 * Returns the current status of an order.
 * Used by the success page to poll for payment confirmation and credentials.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';

type Props = {
  params: Promise<{ orderNumber: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { orderNumber } = await params;

    if (!orderNumber) {
      return NextResponse.json(
        { error: 'Order number is required' },
        { status: 400 }
      );
    }

    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderNumber, orderNumber))
      .limit(1);

    if (!order) {
      return NextResponse.json(
        { error: 'Commande introuvable' },
        { status: 404 }
      );
    }

    // Return order details based on status
    const response: Record<string, unknown> = {
      orderNumber: order.orderNumber,
      status: order.status,
      productTitle: order.productTitle,
      amount: order.amount,
      currency: order.currency,
      email: order.email,
      createdAt: order.createdAt,
    };

    // Only include credentials if order is provisioned
    if (order.status === 'provisioned' && order.iptvUsername) {
      response.credentials = {
        username: order.iptvUsername,
        password: order.iptvPassword,
        serverUrl: order.iptvServerUrl,
        playlistUrl: order.iptvPlaylistUrl,
        expDate: order.iptvExpDate,
      };
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Status] Error:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
