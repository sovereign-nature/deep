import { z } from 'zod';

export const ClaimBody = z.object({
  token: z.string(),
  address: z.string(),
});

export const JWTToken = z.object({
  header: z.object({ alg: z.string() }),
  payload: z.object({
    id: z.string(),
    collection: z.string(),
    seed: z.number(),
  }),
});

//TODO: Split schema into pending and completed responses
export const CrossmintResponse = z.object({
  id: z.string(),
  metadata: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      image: z.string(),
    })
    .optional(),
  onChain: z.object({
    status: z.string(), //TODO: Enum
    chain: z.string(),
    contractAddress: z.string(),
    owner: z.string().optional(),
    tokenId: z.string().optional(),
  }),
  actionId: z.string(),
});
