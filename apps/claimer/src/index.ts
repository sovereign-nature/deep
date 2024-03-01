import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { verifyMessage } from 'viem';

const app = new Hono();

type ClaimBody = {
  message: { email: string; address: '0x{string}' };
  signature: '0x{string}';
};

app.post(
  '/claim',
  zValidator(
    'json',
    z.object({
      message: z.object({ email: z.string(), address: z.string() }),
      signature: z.string(),
    })
  ),

  async (c) => {
    const body: ClaimBody = await c.req.json();
    console.log('Claiming', body);

    const isSignatureValid = await verifyMessage({
      address: body.message.address,
      message: JSON.stringify(body.message),
      signature: body.signature,
    });

    return c.json({ signatureValidated: isSignatureValid });
  }
);

export default app;
