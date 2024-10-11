import { z } from 'zod';
import { DeepAsset } from '@sni/types';
import {
  getArbitrumWalletAssets,
  getCrossmintWalletAssets,
  getUniqueWalletAssets,
} from '@sni/clients/wallets-client';
import { zValidator } from '@hono/zod-validator';
import { parseAssetDID } from '@sni/address-utils';
import { OpenAPIHono } from '@hono/zod-openapi';
import { contextStorage } from 'hono/context-storage';
import { errorResponse } from '$lib/shared/responses';
import { AppContext } from '$lib/shared/types';

const app = new OpenAPIHono<AppContext>();
app.use(contextStorage());

app.get(
  '/:walletAddress',
  zValidator('query', z.object({ assetDID: z.string() })),
  async (c) => {
    const { NFTSCAN_API_KEY, CROSSMINT_API_KEY } = c.env;

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
          return errorResponse(e);
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
          return errorResponse(e);
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
          return errorResponse(e);
        }
      case 'unique':
      case 'opal':
        try {
          assets = await getUniqueWalletAssets(
            network,
            walletAddress,
            Number.parseInt(contractAddress)
          );
          return c.json(assets);
        } catch (e) {
          return errorResponse(e);
        }
      default:
        return c.json({ error: true, message: 'Invalid network' }, 400);
    }
  }
);

export default app;
