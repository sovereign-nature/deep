import { AccountTokensResponseSchema } from '@sni/clients/wallets-client/targets/unique/schemas';
import { createAssetDID } from '@sni/address-utils';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Context } from 'hono';
import { DeepAsset } from '@sni/types';
import walletsApp from '../wallets';
import {
  ClaimBodySchema,
  ClaimsParamsSchema,
  ProfileParamsSchema,
  ProfileResponseSchema,
} from './schemas';
import { CrossmintResponse } from '$lib/shared/schemas';

const app = new OpenAPIHono();

//TODO: Move to wrangler config?
const NETWORK: 'unique' | 'opal' = 'unique';
const COLLECTION_ID = 665;

const PROOFS_COLLECTION_DID = createAssetDID(NETWORK, 'unique2', COLLECTION_ID);

function getAttributeValue(
  attributes: { trait_type: string; value: string }[],
  trait: string
) {
  const attribute = attributes.find((a) => a.trait_type === trait);

  return attribute?.value;
}

async function getProofsStats(address: string, c: Context) {
  const requestUrl = `/${address}?assetDID=${PROOFS_COLLECTION_DID}`;

  const result = await walletsApp.request(
    requestUrl,
    c.req.raw,
    c.env,
    c.executionCtx
  );

  const data = (await result.json()) as DeepAsset[];

  const total = data.length;
  const used = data.filter((asset: DeepAsset) =>
    Boolean(getAttributeValue(asset.attributes!, 'used'))
  ).length;

  return {
    total,
    used,
  };
}

async function getDotphinAddress(address: string) {
  const network = 'unique';
  const collectionId = 664;

  const result = await fetch(
    `https://rest.unique.network/${network}/v1/tokens/account-tokens?address=${address}&collectionId=${collectionId}`
  );
  const data = AccountTokensResponseSchema.parse(await result.json());

  const dotphin = data.tokens[0];

  if (!dotphin) {
    return null;
  }

  return createAssetDID(network, 'unique2', collectionId, dotphin.tokenId);
}

app.openapi(
  createRoute({
    method: 'get',
    path: '/:address',
    request: {
      params: ProfileParamsSchema,
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: ProfileResponseSchema,
          },
        },
        description: 'Get proofs stats and dotphin DID for an address',
      },
    },
  }),
  async (c) => {
    const address = c.req.param('address');

    const proofs = await getProofsStats(address, c);

    const dotphinDID = await getDotphinAddress(address);

    return c.json({ address, proofs, dotphinDID });
  }
);

app.openapi(
  createRoute({
    method: 'post',
    path: '/claim',
    request: {
      body: { content: { 'application/json': { schema: ClaimBodySchema } } },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: CrossmintResponse,
          },
        },
        description: 'Returns a claim token for the DOTphin',
      },
    },
  }),
  async (c) => {
    return c.json({
      id: '123',
      metadata: { image: 'image' },
      onChain: {
        status: 'pending',
        chain: 'chain',
        contractAddress: 'contractAddress',
      },
      actionId: '123',
    });
  }
);

app.openapi(
  createRoute({
    method: 'get',
    path: '/claims/:id',
    request: {
      params: ClaimsParamsSchema,
    },
    responses: {
      200: {
        content: { 'application/json': { schema: CrossmintResponse } },
        description: 'Returns claim status',
      },
    },
  }),
  async (c) => {
    return c.json({
      id: '123',
      metadata: { image: 'image' },
      onChain: {
        status: 'completed',
        chain: 'chain',
        contractAddress: 'contractAddress',
      },
      actionId: '123',
    });
  }
);

export default app;
