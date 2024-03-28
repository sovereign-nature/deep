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
  onchain: z.object({
    status: z.string(),
    chain: z.string(),
    contractAddress: z.string(),
    owner: z.optional(z.string()),
  }),
  actionId: z.string(),
});
