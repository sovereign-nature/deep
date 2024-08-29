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

export const ProfileResponseSchema = z.object({
  address: z.string().openapi({
    example: '0xcf12c02454a11c01857733d19d8a702b42780dd4',
  }),
  proofs: z.object({
    total: z.number().openapi({
      example: 3,
    }),
    used: z.number().openapi({
      example: 1,
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
