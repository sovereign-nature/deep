import { z } from 'zod';

export const AccountTokensResponseSchema = z.object({
  tokens: z.array(
    z.object({
      collectionId: z.number(),
      tokenId: z.number(),
    })
  ),
});
