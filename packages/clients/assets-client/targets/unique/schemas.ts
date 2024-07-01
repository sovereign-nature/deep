import { z } from 'zod';

export const UniqueNFTResponseSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  image: z.string(),
  attributes: z.array(z.object({ trait_type: z.string(), value: z.string() })),
  collectionId: z.number(),
  tokenId: z.number(),
  owner: z.string(),
});
