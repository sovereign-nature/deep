import { z } from 'zod';

export const NftScanResponse = z.object({
  data: z.object({
    content: z.array(
      z.object({
        token_id: z.string(),
        name: z.optional(z.string()),
        description: z.optional(z.string()),
        image_uri: z.optional(z.string()),
        contract_address: z.string(),
        contract_name: z.optional(z.string()),
        erc_type: z.string(),
      })
    ),
  }),
});
