import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/infrastructure/database/schema/*',
  out: 'src/infrastructure/database/migrations',
  driver: 'pg',
  dbCredentials: { connectionString: process.env.DATABASE_URL! },
} satisfies Config;
