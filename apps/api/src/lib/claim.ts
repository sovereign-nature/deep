import { sign } from 'hono/jwt';
import { nanoid } from 'nanoid';

//TODO: Make REAL collection optional, so just claim works
export async function createClaimLink(
  config: { collectionId: string; seed: number; realCollection: string },
  secret: string
) {
  const token = await sign(
    {
      id: nanoid(),
      collection: config.collectionId,
      seed: config.seed,
    },
    secret,
    'HS256'
  );

  return `https://real.sovereignnature.com/?q=${config.realCollection}&claim=${token}`;
}
