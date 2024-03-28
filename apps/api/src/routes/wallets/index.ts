import { Hono } from 'hono';
const app = new Hono();
import { z } from 'zod';

import { DeepAsset } from '@sni/types';
import { getArbitrumWalletAssets } from '@sni/clients/wallets-client';
import { env } from 'hono/adapter';
import { zValidator } from '@hono/zod-validator';

app.get(
  '/:networkId/:address',
  zValidator('query', z.object({ contractAddress: z.string() })),
  async (c) => {
    const { NFTSCAN_API_KEY } = env<{ NFTSCAN_API_KEY: string }>(c);

    const networkId = c.req.param('networkId');
    const walletAddress = c.req.param('address');

    const contractAddress = c.req.query('contractAddress') || '';

    let assets: DeepAsset[] = [];

    switch (networkId) {
      case 'arbitrum':
        try {
          assets = await getArbitrumWalletAssets(
            walletAddress,
            contractAddress,
            NFTSCAN_API_KEY
          );
          return c.json(assets);
        } catch (e) {
          if (e instanceof Error) {
            return c.json({ error: true, message: e.message }, 500);
          }

          return c.json({ error: true, message: 'Internal server error' }, 500);
        }
      case 'polygon-sepolina':
        break;

      default:
        return c.json({ error: true, message: 'Invalid network' }, 400);
    }
  }
);

export default app;
