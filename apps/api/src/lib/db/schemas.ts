import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  email: text('email').unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' })
    .notNull()
    .default(false),
  telegram: text('telegram').unique(),
  telegramVerified: integer('telegram_verified', { mode: 'boolean' })
    .notNull()
    .default(false),
});

export const sessions = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  expiresAt: integer('expires_at').notNull(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  chainId: integer('chain_id'),
});

export const dotphinClaims = sqliteTable('dotphin_claim', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(), // One claim per user
});

export const proofs = sqliteTable('proof', {
  id: text('id').notNull().primaryKey(),
  used: integer('used', { mode: 'boolean' }).notNull().default(false),
  owner: text('owner')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});
