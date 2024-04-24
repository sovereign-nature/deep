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
import { parseAssetDID } from '@sni/address-utils';
import { reportUnknownNetwork as errorResponse } from '../../shared';

app.get(
  '/:walletAddress',
  zValidator('query', z.object({ assetDID: z.string() })),
  async (c) => {
    const { NFTSCAN_API_KEY } = env<{ NFTSCAN_API_KEY: string }>(c);
    const { CROSSMINT_API_KEY } = env<{ CROSSMINT_API_KEY: string }>(c); //TODO: Add both staging and production keys

    const assetDID = c.req.query('assetDID') || '';
    const walletAddress = c.req.param('walletAddress');

    const { network, contractAddress } = parseAssetDID(assetDID);
    let assets: DeepAsset[] = [];

    //TODO: Refactor to getWalletAssetsByDid from clients lib
    switch (network) {
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
      //TODO: Not working because of the production config
      case 'polygon-sepolia':
      case 'optimism-sepolia':
        try {
          assets = await getCrossmintWalletAssets(
            network,
            walletAddress,
            contractAddress,
            CROSSMINT_API_KEY,
            true
          );
          return c.json(assets);
        } catch (e) {
          return errorResponse(e, c);
        }
      case 'polygon':
      case 'optimism':
        try {
          assets = await getCrossmintWalletAssets(
            network,
            walletAddress,
            contractAddress,
            CROSSMINT_API_KEY,
            false
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
