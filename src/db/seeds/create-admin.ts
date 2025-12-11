import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

const ADMIN_EMAIL = 'admin@iptv-smarterspro.fr';
const ADMIN_PASSWORD = 'Admin@2024!Secure';
const ADMIN_NAME = 'Administrator';

async function createAdminUser() {
  console.log('Creating admin user...');
  
  try {
    const existingUsers = await db.select()
      .from(user)
      .where(eq(user.email, ADMIN_EMAIL))
      .limit(1);

    if (existingUsers.length > 0) {
      console.log('Admin user already exists. Updating role to admin...');
      await db.update(user)
        .set({ role: 'admin' })
        .where(eq(user.email, ADMIN_EMAIL));
      console.log('Admin role updated successfully!');
      console.log(`\nAdmin Credentials:`);
      console.log(`Email: ${ADMIN_EMAIL}`);
      console.log(`Password: ${ADMIN_PASSWORD}`);
      return;
    }

    const result = await auth.api.signUpEmail({
      body: {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }
    });

    if (!result || !result.user) {
      throw new Error('Failed to create user');
    }

    await db.update(user)
      .set({ role: 'admin' })
      .where(eq(user.id, result.user.id));

    console.log('Admin user created successfully!');
    console.log(`\nAdmin Credentials:`);
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log(`\nLogin at: /login`);
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      console.log('Admin user already exists. Updating role...');
      await db.update(user)
        .set({ role: 'admin' })
        .where(eq(user.email, ADMIN_EMAIL));
      console.log('Admin role updated!');
      console.log(`\nAdmin Credentials:`);
      console.log(`Email: ${ADMIN_EMAIL}`);
      console.log(`Password: ${ADMIN_PASSWORD}`);
    } else {
      console.error('Error creating admin user:', error);
      throw error;
    }
  }
}

createAdminUser()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
