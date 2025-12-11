import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { session, user } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Middleware to verify session token and check admin role
async function verifyAdminSession(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'No authorization token provided', status: 401 };
  }

  const token = authHeader.substring(7);
  
  try {
    const sessions = await db.select()
      .from(session)
      .where(eq(session.token, token))
      .limit(1);

    if (sessions.length === 0) {
      return { error: 'Invalid session token', status: 401 };
    }

    const userSession = sessions[0];
    
    // Check if session is expired
    if (new Date(userSession.expiresAt) < new Date()) {
      return { error: 'Session expired', status: 401 };
    }

    // Get the user to check their role
    const users = await db.select()
      .from(user)
      .where(eq(user.id, userSession.userId))
      .limit(1);

    if (users.length === 0) {
      return { error: 'User not found', status: 401 };
    }

    const currentUser = users[0];

    // Check if user has admin role
    if (currentUser.role !== 'admin') {
      return { error: 'Forbidden - Admin role required to create users', status: 403 };
    }

    return { user: currentUser, status: 200 };
  } catch (error) {
    console.error('Session verification error:', error);
    return { error: 'Session verification failed', status: 500 };
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