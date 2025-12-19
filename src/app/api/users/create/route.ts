import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function verifyAdminSession(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return { error: 'No active session', status: 401, user: null };
    }

    if (!session.user) {
      return { error: 'User not found in session', status: 401, user: null };
    }

    const currentUser = session.user as any;

    if (currentUser.role !== 'admin') {
      return { error: 'Forbidden - Admin role required to create users', status: 403, user: null };
    }

    return { error: null, status: 200, user: currentUser };
  } catch (error) {
    console.error('Session verification error:', error);
    return { error: 'Session verification failed', status: 500, user: null };
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyAdminSession(request);
    if (authResult.error || !authResult.user) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and password are required' },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name must be a non-empty string' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const validRoles = ['admin', 'dev', 'writer'];
    const assignedRole = role || 'writer';
    
    if (!validRoles.includes(assignedRole)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    const result = await auth.api.signUpEmail({
      body: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      }
    });

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    if (assignedRole !== 'writer') {
      await db.update(user)
        .set({ role: assignedRole })
        .where(eq(user.id, result.user.id));
    }

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: assignedRole,
        createdAt: result.user.createdAt,
      }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating user:', error);
    
    if (error.message?.includes('UNIQUE constraint failed') || error.message?.includes('already exists')) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create user: ' + (error.message || String(error)) },
      { status: 500 }
    );
  }
}
