import { Hono } from 'hono';
const app = new Hono();
import { z } from 'zod';

import { DeepAsset } from '@sni/types';
import {
  getArbitrumWalletAssets,
  getCrossmintWalletAssets,
} from '@sni/clients/wallets-client';

import { env } from 'hono/adapter';
import { zValidator } from '@hono/zod-validator';
import { reportUnknownNetwork as errorResponse } from '../../shared';

app.get(
  '/:networkId/:address',
  zValidator('query', z.object({ contractAddress: z.string() })),
  async (c) => {
    const { NFTSCAN_API_KEY } = env<{ NFTSCAN_API_KEY: string }>(c);
    const { CROSSMINT_API_KEY } = env<{ CROSSMINT_API_KEY: string }>(c); //TODO: Add both staging and production keys

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
          return errorResponse(e, c);
        }
      case 'polygon-sepolina':
      case 'optimism-sepolia':
        try {
          assets = await getCrossmintWalletAssets(
            networkId,
            walletAddress,
            contractAddress,
            CROSSMINT_API_KEY,
            true
          );
          return c.json(assets);
        } catch (e) {
          return errorResponse(e, c);
        }
      default:
        return c.json({ error: true, message: 'Invalid network' }, 400);
    }
  }
);

export default app;
