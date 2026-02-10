import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

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

    const existingUsers = await db.select().from(user).limit(1);
    
    if (existingUsers.length > 0) {
      return NextResponse.json({
        message: 'Users already exist. Please use /login',
        loginUrl: '/login'
      }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@officieliptvsmarterspro.fr';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminIPTV2026!Secure';
    const adminName = 'Admin IPTV';

    const result = await auth.api.signUpEmail({
      body: {
        name: adminName,
        email: adminEmail,
        password: adminPassword,
      }
    });

    if (!result) {
      throw new Error('Failed to create admin user');
    }

    await db.update(user)
      .set({ role: 'admin' })
      .where(eq(user.id, result.user.id));

    return NextResponse.json({
      message: 'Admin user created successfully!',
      credentials: {
        email: adminEmail,
        password: '********',
      },
      loginUrl: '/login',
      warning: 'IMPORTANT: Change this password after first login!'
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('Error creating admin:', error);
    
    if (error.message?.includes('UNIQUE') || error.message?.includes('already exists')) {
      return NextResponse.json({
        message: 'Admin user might already exist',
        loginUrl: '/login',
      }, { status: 409 });
    }
    
    return NextResponse.json({
      error: 'Failed to create admin user',
      details: process.env.NODE_ENV === 'development' ? (error.message || String(error)) : 'Internal error'
    }, { status: 500 });
  }
}
