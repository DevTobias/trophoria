import { InferModel, sql } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

const emptyArray = sql`'{}'`;

export const user = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  tokens: text('tokens').array().default(emptyArray).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
});

export type User = InferModel<typeof user>;
export type CreateUser = Omit<InferModel<typeof user, 'insert'>, 'createdAt' | 'id' | 'tokens'>;
export type PublicUser = Omit<User, 'password' | 'tokens'>;
