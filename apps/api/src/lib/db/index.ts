import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm/sql';
import { profiles, users } from './schemas';

export async function addUser(db: D1Database, address: string) {
  const orm = drizzle(db);

  return orm.insert(users).values({ id: address }).onConflictDoNothing();
}

export async function setEmail(db: D1Database, address: string, email: string) {
  const orm = drizzle(db);

  return orm
    .insert(profiles)
    .values({ id: address, userId: address, email, emailVerified: false })
    .onConflictDoUpdate({
      target: profiles.id,
      set: { email, emailVerified: false },
    });
}

export async function verifyEmail(db: D1Database, address: string) {
  const orm = drizzle(db);

  return orm
    .update(profiles)
    .set({ emailVerified: true })
    .where(eq(profiles.userId, address));
}
