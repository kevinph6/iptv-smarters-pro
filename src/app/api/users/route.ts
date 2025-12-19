import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user, session, account } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { hash } from '@node-rs/argon2';

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
      return { error: 'Forbidden - Admin role required', status: 403, user: null };
    }

    return { error: null, status: 200, user: currentUser };
  } catch (error) {
    console.error('Session verification error:', error);
    return { error: 'Session verification failed', status: 500, user: null };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAdminSession(request);
    if (authResult.error || !authResult.user) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    // Single user by ID
    if (id) {
      const users = await db.select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        image: user.image,
        createdAt: user.createdAt,
      }).from(user)
        .where(eq(user.id, id))
        .limit(1);

      if (users.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(users[0]);
    }

    // List all users with role information
    const allUsers = await db.select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }).from(user)
      .orderBy(user.createdAt);

    // Convert timestamps to milliseconds for frontend
    const formattedUsers = allUsers.map(u => ({
      ...u,
      createdAt: u.createdAt ? new Date(u.createdAt).getTime() : Date.now(),
    }));

    return NextResponse.json({
      users: formattedUsers,
      currentUserRole: authResult.user.role,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAdminSession(request);
    if (authResult.error || !authResult.user) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { id, name, email, role } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Validate role
    if (role && !['admin', 'dev', 'writer'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be admin, dev, or writer' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is already taken by another user
    if (email && email !== existingUser[0].email) {
      const emailCheck = await db.select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);

      if (emailCheck.length > 0) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 400 }
        );
      }
    }

    // Update user
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    await db.update(user)
      .set(updateData)
      .where(eq(user.id, id));

    const updatedUser = await db.select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }).from(user)
      .where(eq(user.id, id))
      .limit(1);

    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser[0],
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAdminSession(request);
    if (authResult.error || !authResult.user) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { id, password } = body;

    if (!id || !password) {
      return NextResponse.json(
        { error: 'User ID and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete the old account
    await db.delete(account)
      .where(and(
        eq(account.userId, id),
        eq(account.providerId, 'credential')
      ));

    // Use better-auth to create a temporary user with the new password
    // This ensures the password is hashed correctly
    const tempEmail = `temp_${Date.now()}_${Math.random().toString(36).substring(7)}@temp.local`;
    const signUpResult = await auth.api.signUpEmail({
      body: {
        email: tempEmail,
        password: password,
        name: 'Temporary User',
      }
    });

    if (!signUpResult) {
      return NextResponse.json(
        { error: 'Failed to hash password' },
        { status: 500 }
      );
    }

    // Get the password hash from the temporary account
    const tempAccounts = await db.select()
      .from(account)
      .where(and(
        eq(account.userId, signUpResult.user.id),
        eq(account.providerId, 'credential')
      ))
      .limit(1);

    if (tempAccounts.length === 0) {
      return NextResponse.json(
        { error: 'Failed to retrieve password hash' },
        { status: 500 }
      );
    }

    const newPasswordHash = tempAccounts[0].password;

    // Clean up - delete temporary user and their account
    await db.delete(account).where(eq(account.userId, signUpResult.user.id));
    await db.delete(user).where(eq(user.id, signUpResult.user.id));

    // Create new account for the actual user with the properly hashed password
    await db.insert(account).values({
      id: `${id}_${Date.now()}_credential`, // Generate unique ID
      userId: id,
      providerId: 'credential',
      accountId: existingUser[0].email,
      password: newPasswordHash,
      accessToken: null,
      refreshToken: null,
      idToken: null,
      accessTokenExpiresAt: null,
      refreshTokenExpiresAt: null,
      scope: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      message: 'Password updated successfully',
      userId: id,
    });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { error: 'Failed to update password: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAdminSession(request);
    if (authResult.error || !authResult.user) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    if (existingUser.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent user from deleting themselves
    if (authResult.user.id === id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 403 }
      );
    }

    // Delete user (cascade will handle sessions and accounts due to schema foreign key constraints)
    await db.delete(user).where(eq(user.id, id));

    return NextResponse.json({
      message: 'User deleted successfully',
      deletedUser: {
        id: existingUser[0].id,
        name: existingUser[0].name,
        email: existingUser[0].email
      }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}