import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  //TODO: Add email, telegram, etc.
});
