import { AccountTokensResponseSchema } from '@sni/clients/wallets-client/targets/unique/schemas';
import { createAssetDID, parseAssetDID } from '@sni/address-utils';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Context } from 'hono';
import { DeepAsset } from '@sni/types';
import { env } from 'hono/adapter';
import walletsApp from '../wallets';
import assetsApp from '../assets';
import {
  ClaimBodySchema,
  ClaimsParamsSchema,
  ProfileParamsSchema,
  ProfileResponseSchema,
} from './schemas';
import { collectionConfig } from './config';
import {
  countByAttribute,
  getAttributeValue,
  getSeed,
  updateOrAddAttribute,
} from './lib';
import { CrossmintResponse, ErrorSchema } from '$lib/shared/schemas';
import { logger } from '$lib/logger';
import { getRandomId } from '$lib/utils';
import { getUniqueSdk } from '$lib/unique';

const app = new OpenAPIHono();

//TODO: Move to wrangler config? Need to make it ENV dependent
const NETWORK: 'unique' | 'opal' = 'opal';
const PROOFS_COLLECTION_ID = 3551; //665;
const DOTPHIN_COLLECTION_ID = 664; //TODO: Proper collection ID from config

const PROOFS_COLLECTION_DID = createAssetDID(
  NETWORK,
  'unique2',
  PROOFS_COLLECTION_ID
);

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

  const result = await fetch(
    `https://rest.unique.network/${network}/v1/tokens/account-tokens?address=${address}&collectionId=${DOTPHIN_COLLECTION_ID}`
  );
  const data = AccountTokensResponseSchema.parse(await result.json());

  const dotphin = data.tokens[0];

  if (!dotphin) {
    return null;
  }

  return createAssetDID(
    network,
    'unique2',
    DOTPHIN_COLLECTION_ID,
    dotphin.tokenId
  );
}

export async function updateTokenAttribute(
  mnemonic: string,
  collectionId: number,
  tokenId: number,
  attribute: string,
  value: string
) {
  const sdk = getUniqueSdk(mnemonic, NETWORK);

  const token = await sdk.token.getV2({ collectionId, tokenId });

  const tokenDataProp = token.properties.find((p) => p.key === 'tokenData');
  if (!tokenDataProp) throw Error('Cannot find tokenData property');

  const tokenDataValue = JSON.parse(tokenDataProp.value);

  if (!tokenDataValue.attributes) throw Error('Cannot parse attributes');

  tokenDataValue.attributes = updateOrAddAttribute(
    tokenDataValue.attributes,
    attribute,
    value
  );

  //TODO: Move to queue?
  await sdk.token.setProperties({
    collectionId,
    tokenId,
    properties: [{ key: 'tokenData', value: JSON.stringify(tokenDataValue) }],
  });

  console.log(
    `Tokens updated in collection ${collectionId} with ID ${tokenId}}`
  );

  return tokenId;
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
        content: { 'application/json': { schema: CrossmintResponse } },
        description: 'Returns a claim token for the DOTphin',
      },
      400: {
        content: { 'application/json': { schema: ErrorSchema } },
        description: 'Proof is already used',
      },
    },
  }),
  async (c) => {
    const { MINTING_QUEUE } = env<{ MINTING_QUEUE: Queue<string> }>(c);
    const { MINTING_KV } = env<{ MINTING_KV: KVNamespace }>(c);

    const { WALLET_MNEMONIC } = env<{ WALLET_MNEMONIC: string }>(c);

    const { address, proofDID } = c.req.valid('json');

    console.log('Received claim request for ', address, proofDID);

    //TODO: Check if user logged in

    //Check if proofDID is valid
    const requestUrl = `/${proofDID}`;
    const assetResponse = await assetsApp.request(
      requestUrl,
      c.req.raw,
      c.env,
      c.executionCtx
    );

    const proofAsset = (await assetResponse.json()) as DeepAsset;
    const usedAttribute = Boolean(
      getAttributeValue(proofAsset.attributes!, 'used')
    );

    if (usedAttribute) {
      return c.json({ error: true, message: 'Proof is already used' }, 400);
    }

    //Check if user has DOTphin already
    const dotphinDID = await getDotphinAddress(address);
    if (dotphinDID) {
      return c.json({ error: true, message: 'User already has DOTphin' }, 400);
    }

    const mintId = getRandomId();

    logger.info(`Claiming DOTphin, sending minting ${mintId} to queue`);

    //Get the element from the proof and create a seed
    const element = getAttributeValue(proofAsset.attributes!, 'element');
    if (!element) {
      return c.json(
        { error: true, message: 'Something wrong with the proof' },
        400
      );
    }

    const seed = getSeed(element);

    //Send minting request to the queue
    await MINTING_QUEUE.send(
      JSON.stringify({
        address,
        payload: {
          id: mintId,
          collection: PROOFS_COLLECTION_ID,
          seed,
        },
        collectionConfig,
      }),
      { contentType: 'json' }
    );

    const pendingResponse = {
      id: mintId,
      onChain: {
        status: 'pending',
        chain: NETWORK,
        contractAddress: PROOFS_COLLECTION_ID.toString(),
      },
      metadata: {
        image: collectionConfig.metadata.image[seed],
      },
      actionId: mintId,
    };

    await MINTING_KV.put(mintId, JSON.stringify(pendingResponse));

    const { contractAddress, tokenId } = parseAssetDID(proofDID);

    //Mark proof as used
    updateTokenAttribute(
      WALLET_MNEMONIC,
      Number(contractAddress),
      tokenId,
      'used',
      'true'
    );

    return c.json(pendingResponse, 200);
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
