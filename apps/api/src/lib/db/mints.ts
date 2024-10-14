import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm/sql';
import { mints } from './schemas';
import { CrossmintResponse } from '$lib/shared/types';

export async function addMint(
  db: D1Database, //TODO: Share DB through context?
  id: string,
  tokenData: CrossmintResponse
) {
  const orm = drizzle(db);

  return orm.insert(mints).values({
    id,
    tokenData,
  });
}

export async function getMint(db: D1Database, id: string) {
  const orm = drizzle(db);

  const result = await orm.select().from(mints).where(eq(mints.id, id));
  return result[0];
}

export async function updateMint(
  db: D1Database,
  id: string,
  tokenData: CrossmintResponse
) {
  const orm = drizzle(db);

  return orm.update(mints).set({ tokenData }).where(eq(mints.id, id));
}
