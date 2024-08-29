import { AccountTokensResponseSchema } from '@sni/clients/wallets-client/targets/unique/schemas';
import { createAssetDID } from '@sni/address-utils';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import {
  ClaimBodySchema,
  ClaimsParamsSchema,
  ProfileParamsSchema,
  ProfileResponseSchema,
} from './schemas';
import { CrossmintResponse } from '$lib/shared/schemas';

const app = new OpenAPIHono();

async function getProofsStats(address: string) {
  const result = await fetch(
    `https://rest.unique.network/unique/v1/tokens/account-tokens?address=${address}&collectionId=665`
  );
  const data = AccountTokensResponseSchema.parse(await result.json());
  const total = data.tokens.length;

  return {
    total,
    used: total, //TODO: Get used from proofsCollection
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

    const proofs = await getProofsStats(address);

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
