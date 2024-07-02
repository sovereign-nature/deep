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

export const CrossmintResponse = z.object({
  id: z.string(),
  metadata: z.optional(
    z.object({ name: z.string(), description: z.string(), image: z.string() })
  ),
  onChain: z.object({
    status: z.string(), //TODO: Enum
    chain: z.string(),
    contractAddress: z.string(),
    owner: z.string().optional(),
    tokenId: z.string().optional(),
  }),
  actionId: z.string(),
});
