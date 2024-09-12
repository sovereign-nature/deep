import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm/sql';
import { dotphinClaims } from './schemas';
import { addUser } from '.';

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

export async function deleteDotphinClaim(db: D1Database, userId: string) {
  const orm = drizzle(db);

  return orm.delete(dotphinClaims).where(eq(dotphinClaims.userId, userId));
}
