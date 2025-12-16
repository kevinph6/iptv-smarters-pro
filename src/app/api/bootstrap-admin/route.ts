import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const existingUsers = await db.select().from(user).limit(1);
    
    if (existingUsers.length > 0) {
      return NextResponse.json({
        message: 'Users already exist. Please use /login',
        loginUrl: '/login'
      }, { status: 400 });
    }

    const adminEmail = 'admin@iptvsmarterspro.com';
    const adminPassword = 'AdminIPTV2025!';
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
        password: adminPassword,
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
        hint: 'Try logging in with: admin@iptvsmarterspro.com'
      }, { status: 409 });
    }
    
    return NextResponse.json({
      error: 'Failed to create admin user',
      details: error.message || String(error)
    }, { status: 500 });
  }
}
