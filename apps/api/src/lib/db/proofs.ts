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

export function getProof(db: D1Database, proofDID: string) {
  const orm = drizzle(db);
  return orm.select().from(proofs).where(eq(proofs.id, proofDID));
}

export function setProofAsUsed(db: D1Database, proofDID: string) {
  const orm = drizzle(db);
  return orm.update(proofs).set({ used: true }).where(eq(proofs.id, proofDID));
}
