import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm/sql';
import { proofs } from './schemas';

export function addProofAsUsed(
  db: D1Database,
  proofDID: string,
  owner: string
) {
  const orm = drizzle(db);
  return orm.insert(proofs).values({ id: proofDID, used: true, owner });
}

export async function getProof(db: D1Database, proofDID: string) {
  const orm = drizzle(db);
  const items = await orm.select().from(proofs).where(eq(proofs.id, proofDID));

  if (items.length === 0) return null;

  return items[0];
}

export function setProofAsUsed(db: D1Database, proofDID: string) {
  const orm = drizzle(db);
  return orm.update(proofs).set({ used: true }).where(eq(proofs.id, proofDID));
}

//Needed only for testing. Not used in production
export function resetProofsForUser(db: D1Database, userId: string) {
  const orm = drizzle(db);
  return orm.delete(proofs).where(eq(proofs.owner, userId));
}
