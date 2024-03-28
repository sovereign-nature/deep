import { z } from 'zod';

export const CrossmintWalletResponse = z.array(
  z.object({
    chain: z.string(),
    contractAddress: z.string(),
    tokenId: z.string(),
    metadata: z.object({
      name: z.string(),
      description: z.string(),
      image: z.string(),
      animationUrl: z.string().optional(),
    }),
    tokenStandard: z.string(),
  })
);
