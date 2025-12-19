import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { session, user } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Middleware to verify session and check admin role using Better Auth
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

    // Check if user has admin role
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
    // Verify authentication and admin role
    const authResult = await verifyAdminSession(request);
    if (authResult.error) {
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

    // Validate name
    if (typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Validate role if provided
    const validRoles = ['admin', 'dev', 'writer'];
    const assignedRole = role || 'writer';
    
    if (!validRoles.includes(assignedRole)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    // Use better-auth to create the user with proper password hashing
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

    // Update the user's role if not default
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
    
    // Handle specific errors
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