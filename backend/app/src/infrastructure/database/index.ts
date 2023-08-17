import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '$database/schema/user';

export * from '$database/schema/user';

export const createDatabaseConnection = (url: string) => {
  return drizzle(postgres(url), { schema, logger: true });
};

export type Database = ReturnType<typeof createDatabaseConnection>;
