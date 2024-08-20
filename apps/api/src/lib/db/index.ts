import { drizzle } from 'drizzle-orm/better-sqlite3';
import { profiles, users } from './schemas';

export async function addUser(db: D1Database, address: string) {
  const orm = drizzle(db);

  return orm.insert(users).values({ id: address }).onConflictDoNothing();
}

export async function setEmail(
  db: D1Database,
  address: string,
  email: string,
  verified: boolean
) {
  const orm = drizzle(db);

  return orm
    .insert(profiles)
    .values({ id: address, userId: address, email, emailVerified: verified })
    .onConflictDoUpdate({
      target: profiles.id,
      set: { email, emailVerified: verified },
    });
}
