import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm/sql';
import { dotphinClaims, users } from './schemas';
import { logger } from '$lib/logger';

export async function addUser(db: D1Database, address: string) {
  logger.debug('Adding user ', address);

  const orm = drizzle(db, { logger: true });

  const query = orm
    .insert(users)
    .values({
      id: address,
    })
    .onConflictDoNothing();

  return await query;
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

export async function setDotphinClaim(
  db: D1Database,
  claimId: string,
  userId: string
) {
  const orm = drizzle(db);

  //This is needed only for API testing with random addresses, can be removed
  await addUser(db, userId);

  return orm.insert(dotphinClaims).values({
    id: claimId,
    userId,
  });
}

export async function getDotphinClaim(db: D1Database, userId: string) {
  const orm = drizzle(db);

  return orm
    .select()
    .from(dotphinClaims)
    .where(eq(dotphinClaims.userId, userId));
}
