import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const createDatabaseConnection = (url: string) => {
  const queryClient = postgres(url);
  return drizzle(queryClient);
};
