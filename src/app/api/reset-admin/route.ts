import { NextResponse } from 'next/server';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export const runtime = 'nodejs';

export async function POST() {
  try {
    const adminEmail = 'admin@iptvsmarterspro.com';
    const newPassword = 'AdminIPTV2025!';
    
    const hashedPassword = await hash(newPassword, 10);
    
    const result = await db.update(user)
      .set({ password: hashedPassword })
      .where(eq(user.email, adminEmail))
      .returning({ id: user.id, email: user.email });
    
    if (result.length === 0) {
      return NextResponse.json({
        error: 'User not found',
        hint: 'Try creating a new admin user'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      message: 'Password reset successfully!',
      credentials: {
        email: adminEmail,
        password: newPassword,
      },
      loginUrl: '/login'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Error resetting password:', error);
    return NextResponse.json({
      error: 'Failed to reset password',
      details: error.message || String(error)
    }, { status: 500 });
  }
}
