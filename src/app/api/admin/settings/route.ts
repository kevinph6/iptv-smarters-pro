/**
 * GET/POST /api/admin/settings
 * 
 * Admin-only route for managing payment and integration settings.
 * GET: Returns all settings
 * POST: Updates settings (accepts { key: value } pairs)
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { paymentSettings } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

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
    const rows = await db.select().from(paymentSettings);
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error('[Admin Settings] GET error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const now = new Date().toISOString();

    // body should be { key: value, key2: value2, ... }
    const entries = Object.entries(body);

    if (entries.length === 0) {
      return NextResponse.json({ error: 'Aucun parametre fourni' }, { status: 400 });
    }

    for (const [key, value] of entries) {
      if (typeof key !== 'string' || typeof value !== 'string') continue;

      // Upsert: try to update, if no rows affected then insert
      const existing = await db
        .select()
        .from(paymentSettings)
        .where(eq(paymentSettings.key, key))
        .limit(1);

      if (existing.length > 0) {
        await db
          .update(paymentSettings)
          .set({ value, updatedAt: now })
          .where(eq(paymentSettings.key, key));
      } else {
        await db.insert(paymentSettings).values({
          key,
          value,
          updatedAt: now,
        });
      }
    }

    // Return updated settings
    const rows = await db.select().from(paymentSettings);
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('[Admin Settings] POST error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
