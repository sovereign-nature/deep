import { drizzle } from 'drizzle-orm/better-sqlite3';
import { users } from './schemas';

export async function addUser(db: D1Database, address: string) {
  const orm = drizzle(db);

  return orm.insert(users).values({ id: address }).onConflictDoNothing();
}
