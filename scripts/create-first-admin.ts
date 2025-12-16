import { auth } from '../src/lib/auth';
import { db } from '../src/db';
import { user } from '../src/db/schema';
import { eq } from 'drizzle-orm';

async function createFirstAdmin() {
  try {
    console.log('🔐 Creating first admin user...');
    
    const adminEmail = 'admin@iptvsmarterspro.com';
    const adminPassword = 'AdminIPTV2025!';
    const adminName = 'Admin IPTV';

    // Check if any users exist
    const existingUsers = await db.select().from(user).limit(1);
    
    if (existingUsers.length > 0) {
      console.log('⚠️  Users already exist. Checking if admin exists...');
      const admins = await db.select().from(user).where(eq(user.email, adminEmail)).limit(1);
      
      if (admins.length > 0) {
        console.log('✅ Admin user already exists!');
        console.log('📧 Email:', adminEmail);
        console.log('🔑 Use your existing password to login');
        return;
      }
    }

    // Create admin user using better-auth
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

    // Update role to admin
    await db.update(user)
      .set({ role: 'admin' })
      .where(eq(user.id, result.user.id));

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 LOGIN CREDENTIALS:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('🌐 Login at: http://localhost:3000/login');
    console.log('');
    console.log('⚠️  IMPORTANT: Change this password after first login!');
    
  } catch (error: any) {
    console.error('❌ Error creating admin user:', error.message || error);
    
    if (error.message?.includes('UNIQUE constraint') || error.message?.includes('already exists')) {
      console.log('');
      console.log('ℹ️  Admin might already exist. Try logging in with:');
      console.log('📧 Email: admin@iptvsmarterspro.com');
    }
    
    process.exit(1);
  }
}

createFirstAdmin();
