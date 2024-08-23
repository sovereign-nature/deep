import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm/sql';
import { users } from './schemas';

export async function addUser(db: D1Database, address: string) {
  const orm = drizzle(db);

  return orm.insert(users).values({ id: address }).onConflictDoNothing();
}

export async function setEmail(db: D1Database, address: string, email: string) {
  const orm = drizzle(db);

  //TODO: Send verification email
  return orm
    .update(users)
    .set({ email, emailVerified: false })
    .where(eq(users.id, address));
}

//TODO: Check verification code
export async function verifyEmail(db: D1Database, address: string) {
  const orm = drizzle(db);

  return orm
    .update(users)
    .set({ emailVerified: true })
    .where(eq(users.id, address));
}