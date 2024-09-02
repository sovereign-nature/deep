import { z } from 'zod';

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

export const ErrorSchema = z.object({
  error: z.boolean(),
  message: z.string(),
});
