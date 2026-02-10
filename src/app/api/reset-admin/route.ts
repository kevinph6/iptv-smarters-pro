import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user, session, account } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Security: require ADMIN_SETUP_SECRET in production
    const setupSecret = process.env.ADMIN_SETUP_SECRET;
    if (setupSecret) {
      const body = await request.json().catch(() => ({}));
      if (body.secret !== setupSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Block in production unless explicitly allowed
    if (process.env.NODE_ENV === 'production' && !process.env.ALLOW_ADMIN_RESET) {
      return NextResponse.json({ error: 'Endpoint disabled in production' }, { status: 403 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@officieliptvsmarterspro.fr';
    const newPassword = process.env.ADMIN_PASSWORD || 'AdminIPTV2026!Secure';
    const adminName = 'Admin IPTV';
    
    const existingUser = await db.select().from(user).where(eq(user.email, adminEmail)).limit(1);
    
    if (existingUser.length > 0) {
      await db.delete(session).where(eq(session.userId, existingUser[0].id));
      await db.delete(account).where(eq(account.userId, existingUser[0].id));
      await db.delete(user).where(eq(user.id, existingUser[0].id));
    }
    
    const result = await auth.api.signUpEmail({
      body: {
        name: adminName,
        email: adminEmail,
        password: newPassword,
      }
    });
    
    if (!result || !result.user) {
      throw new Error('Failed to create admin user');
    }
    
    await db.update(user)
      .set({ role: 'admin' })
      .where(eq(user.id, result.user.id));
    
    return NextResponse.json({
      message: 'Admin user reset successfully!',
      credentials: {
        email: adminEmail,
        password: '********',
      },
      loginUrl: '/login'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Error resetting admin:', error);
    return NextResponse.json({
      error: 'Failed to reset admin user',
      details: process.env.NODE_ENV === 'development' ? (error.message || String(error)) : 'Internal error'
    }, { status: 500 });
  }
}
