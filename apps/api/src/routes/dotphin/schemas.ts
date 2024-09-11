import { z } from 'zod';

export const ProfileParamsSchema = z.object({
  address: z.string().openapi({
    param: {
      name: 'address',
      in: 'path',
    },
    example: '0xcf12c02454a11c01857733d19d8a702b42780dd4',
  }), //TODO: Add validation?
});

//TODO: Move to packages/schemas
const DeepAssetSchema = z.object({
  id: z.string().openapi({ example: '1' }),
  tokenId: z.string().openapi({ example: '1' }),
  name: z.string().openapi({ example: 'Water' }),
  description: z.string().openapi({ example: 'Water is wet' }),
  image: z.string().openapi({ example: 'https://example.com/water.png' }),
  animation_url: z.string().optional().openapi({
    example: 'https://example.com/water.mp4',
  }),
  collection: z.object({
    id: z.string().openapi({ example: '1' }),
    name: z.string().optional().openapi({ example: 'Water Collection' }),
    description: z.string().optional().openapi({ example: 'Water Collection' }),
  }),
  attributes: z
    .array(z.object({ trait_type: z.string(), value: z.string() }))
    .optional()
    .openapi({ example: [{ trait_type: 'element', value: 'water' }] }),
  multipass: z
    .object({ name: z.string(), infoLink: z.string().optional() })
    .optional()
    .openapi({
      example: { name: 'Water', infoLink: 'https://example.com/water' },
    }),
  address: z
    .string()
    .openapi({ example: 'did:asset:eip155:8880.unique2:700:1' }),
});

export const ProfileResponseSchema = z.object({
  address: z.string().openapi({
    example: '0xcf12c02454a11c01857733d19d8a702b42780dd4',
  }),
  proofs: z.array(DeepAssetSchema).openapi({
    example: [
      {
        id: '1',
        tokenId: '1',
        name: 'Water',
        description: 'Water is wet',
        image: 'https://example.com/water.png',
        collection: {
          id: '1',
          name: 'Water Collection',
          description: 'Water Collection',
        },
        attributes: [{ trait_type: 'element', value: 'water' }],
        multipass: { name: 'Water', infoLink: 'https://example.com/water' },
        address: 'did:asset:eip155:8880.unique2:700:1',
      },
    ],
  }),
  proofsStats: z.object({
    total: z.number().openapi({
      example: 3,
    }),
    used: z.number().openapi({
      example: 1,
    }),
    available: z.object({
      water: z.number().openapi({
        example: 1,
      }),
      air: z.number().openapi({
        example: 1,
      }),
      earth: z.number().openapi({
        example: 1,
      }),
      total: z.number().openapi({
        example: 3,
      }),
    }),
  }),
  dotphinDID: z.string().nullable().openapi({
    example: 'did:asset:eip155:8880.unique2:700:1', //TODO: Update example with real DID
  }),
});

export const ClaimBodySchema = z.object({
  address: z
    .string()
    .openapi({ example: '0xcf12c02454a11c01857733d19d8a702b42780dd4' }),
  proofDID: z
    .string()
    .openapi({ example: 'did:asset:eip155:8880.unique2:665:592' }),
});

export const ClaimResponseSchema = z.object({
  token: z.string().openapi({ example: 'jwtToken' }),
  realCollection: z.string().openapi({ example: 'dotphin' }),
});

export const ClaimsParamsSchema = z.object({
  id: z.string().openapi({
    param: { name: 'id', in: 'path' },
    example: 'hK4lpasd',
  }),
});

export const BurnBodySchema = z.object({
  dotphinDID: z
    .string()
    .openapi({ example: 'did:asset:eip155:8880.unique2:700:1' }),
  owner: z
    .string()
    .openapi({ example: '0xa9f57799D9aF9DA0B8Cc1597111c974F38736815' }),
});

export const BurnResponseSchema = z.object({
  success: z.boolean().openapi({ example: true }),
});
