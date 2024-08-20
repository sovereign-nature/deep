import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  //TODO: Add email, telegram, etc.
});

export const sessions = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  expiresAt: integer('expires_at').notNull(),
  userId: text('user_id').references(() => users.id),
  chainId: integer('chain_id'),
});
