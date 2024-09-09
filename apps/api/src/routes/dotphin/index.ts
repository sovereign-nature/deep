import { AccountTokensResponseSchema } from '@sni/clients/wallets-client/targets/unique/schemas';
import { createAssetDID } from '@sni/address-utils';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Context } from 'hono';
import { DeepAsset } from '@sni/types';
import { env } from 'hono/adapter';
import walletsApp from '../wallets';
import {
  ClaimBodySchema,
  ClaimsParamsSchema,
  ProfileParamsSchema,
  ProfileResponseSchema,
} from './schemas';
import { collectionConfig } from './config';
import { countByAttribute } from './lib';
import { CrossmintResponse, ErrorSchema } from '$lib/shared/schemas';
import { logger } from '$lib/logger';
import { getRandomId } from '$lib/utils';

const app = new OpenAPIHono();

//TODO: Move to wrangler config? Need to make it ENV dependent
const NETWORK: 'unique' | 'opal' = 'unique';
const COLLECTION_ID = 665;

const PROOFS_COLLECTION_DID = createAssetDID(NETWORK, 'unique2', COLLECTION_ID);

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
  const used = countByAttribute(data, 'used', 'true');

  const available = total - used;

  const waterAvailable = countByAttribute(data, 'element', 'water');
  const airAvailable = countByAttribute(data, 'element', 'air');
  const earthAvailable = countByAttribute(data, 'element', 'earth');

  return {
    total,
    used,
    available: {
      water: waterAvailable,
      air: airAvailable,
      earth: earthAvailable,
      total: available,
    },
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
    const { MINTING_QUEUE } = env<{ MINTING_QUEUE: Queue<string> }>(c);
    const { MINTING_KV } = env<{ MINTING_KV: KVNamespace }>(c);

    const { address, proofDID } = c.req.valid('json');

    console.log('Received claim request for ', address, proofDID);

    //TODO: Check if user logged in

    //TODO: Check if proofDID is valid
    //TODO: Check if proofDID is not used
    //TODO: Check if user has DOTphin already

    const mintId = getRandomId();

    logger.info(`Claiming DOTphin, sending minting ${mintId} to queue`);

    const seed = 0;

    const pendingResponse = {
      id: mintId,
      onChain: {
        status: 'pending',
        chain: NETWORK,
        contractAddress: COLLECTION_ID.toString(),
      },
      metadata: {
        image: collectionConfig.metadata.image[seed],
      },
      actionId: mintId,
    };

    await MINTING_QUEUE.send(
      JSON.stringify({
        address,
        payload: {
          id: mintId,
          collection: COLLECTION_ID,
          seed,
        },
        collectionConfig,
      }),
      { contentType: 'json' }
    );

    await MINTING_KV.put(mintId, JSON.stringify(pendingResponse));

    return c.json(pendingResponse);
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
      404: {
        content: { 'application/json': { schema: ErrorSchema } },
        description: 'Claim not found',
      },
    },
  }),
  async (c) => {
    const { MINTING_KV } = env<{ MINTING_KV: KVNamespace }>(c);

    const mintId = c.req.valid('param').id;
    const mintResponse = await MINTING_KV.get(mintId);

    if (mintResponse !== null) {
      return c.json(JSON.parse(mintResponse));
    } else {
      return c.json({ error: true, message: 'Minting ID was not found' }, 404);
    }
  }
);

export default app;
