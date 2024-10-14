import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm/sql';
import { proofClaims } from './schemas';
import { addUser } from '.';

export async function addProofClaim(
  db: D1Database,
  userId: string,
  collectionId: string,
  mintId: string
) {
  const orm = drizzle(db);

  //This is needed only for API testing with random addresses, can be removed
  await addUser(db, userId);

  return orm.insert(proofClaims).values({
    id: `${userId}-${collectionId}`,
    userId,
    mintId,
  });
}

export async function getProofClaim(
  db: D1Database,
  userId: string,
  collectionId: string
) {
  const orm = drizzle(db);

  const result = await orm
    .select()
    .from(proofClaims)
    .where(eq(proofClaims.id, `${userId}-${collectionId}`));
  return result[0];
}
