import { sign } from 'hono/jwt';
import { nanoid } from 'nanoid';

export async function createClaimLink(
  config: { collectionId: string; seed: number; realCollection?: string },
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

  const collectionUrlParam = config.realCollection
    ? `q=${config.realCollection}&`
    : '';

  return `https://real.sovereignnature.com/?${collectionUrlParam}claim=${token}`;
}
