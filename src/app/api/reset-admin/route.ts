import { NextResponse } from 'next/server';
import { db } from '@/db';
import { user, session } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const adminEmail = 'admin@iptvsmarterspro.com';
    const newPassword = 'AdminIPTV2025!';
    const adminName = 'Admin IPTV';
    
    const existingUser = await db.select().from(user).where(eq(user.email, adminEmail)).limit(1);
    
    if (existingUser.length > 0) {
      await db.delete(session).where(eq(session.userId, existingUser[0].id));
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
        password: newPassword,
      },
      loginUrl: '/login'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Error resetting admin:', error);
    return NextResponse.json({
      error: 'Failed to reset admin user',
      details: error.message || String(error)
    }, { status: 500 });
  }
}
