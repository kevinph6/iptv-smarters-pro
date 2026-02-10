
import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';

const url = process.env.TURSO_CONNECTION_URL || 'file:local.db';
const authToken = process.env.TURSO_AUTH_TOKEN;
const isRemote = url.startsWith('libsql://');

const dbConfig: Config = defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: isRemote ? 'turso' : 'sqlite',
  dbCredentials: {
    url,
    ...(isRemote && authToken ? { authToken } : {}),
  },
});

export default dbConfig;