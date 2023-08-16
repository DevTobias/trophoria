/* eslint-disable no-console */

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

export const main = async () => {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL environment is not set');
  const migrationClient = drizzle(postgres(process.env.DATABASE_URL, { max: 1 }));

  console.log('Running migrations');
  await migrate(migrationClient, { migrationsFolder: './src/infrastructure/database/migrations' });
  console.log('Migrated successfully');

  process.exit(0);
};

main().catch((e) => {
  console.error('Migration failed: ', e);
  process.exit(1);
});
