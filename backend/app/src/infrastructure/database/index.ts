import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export * from '$database/schema/users';

export const createDatabaseConnection = (url: string) => {
  return drizzle(postgres(url));
};

export type Database = ReturnType<typeof createDatabaseConnection>;
