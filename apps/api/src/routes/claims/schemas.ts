import { z } from '@hono/zod-openapi';
import { addressIsValid } from './validators';

export const ClaimBody = z.object({
  token: z.string(),
  address: z.string().refine((address) => {
    return addressIsValid(address);
  }, 'Invalid address'),
  email: z.string().email().optional(),
});

export const JWTToken = z.object({
  header: z.object({ alg: z.string() }),
  payload: z.object({
    id: z.string(),
    collection: z.string(),
    seed: z.number(),
  }),
});
