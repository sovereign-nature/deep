import { Hono } from 'hono';
const app = new Hono();
import { z } from 'zod';
import { getChainId } from '@sni/address-utils';
import { DeepAsset } from '@sni/clients/assets-client/types';
import { env } from 'hono/adapter';
import { zValidator } from '@hono/zod-validator';

//TODO: @sni/clients
async function listArbitrumWallet(
  walletAddress: string,
  contractAddress: string,
  apiKey: string
): Promise<DeepAsset[]> {
  const responseSchema = z.object({
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

  const response = await fetch(
    `https://arbitrumapi.nftscan.com/api/v2/account/own/${walletAddress}?&contract_address=${contractAddress}&limit=50`,
    {
      method: 'GET',
      headers: { 'X-API-KEY': apiKey, Accept: 'application/json' },
    }
  );

  const responseJson = await response.json();

  if (response.ok && response.status === 200) {
    const data = responseSchema.parse(responseJson).data;

    const assets: DeepAsset[] = data.content.map((asset) => ({
      id: asset.token_id,
      tokenId: asset.token_id,
      name: asset.name || '',
      description: asset.description || '',
      image: asset.image_uri || '',
      collection: {
        id: asset.contract_address,
        name: asset.contract_name || '',
        description: '',
      },
      address: `did:asset:eip155:${getChainId('arbitrum')}.${asset.erc_type}:${
        asset.contract_address
      }:${asset.token_id}`,
    }));

    return assets;
  } else {
    throw new Error(
      JSON.stringify(responseJson) || 'Failed to fetch data from NFT Scan'
    );
  }
}

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
          assets = await listArbitrumWallet(
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
