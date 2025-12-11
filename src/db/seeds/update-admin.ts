import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function updateToAdmin() {
  const email = 'superadmin@iptv-pro.fr';
  
  console.log(`Updating ${email} to admin role...`);
  
  await db.update(user)
    .set({ role: 'admin' })
    .where(eq(user.email, email));
  
  console.log('Done!');
}

updateToAdmin()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
