import { AccountTokensResponseSchema } from '@sni/clients/wallets-client/targets/unique/schemas';
import { createAssetDID, parseAssetDID } from '@sni/address-utils';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { Context } from 'hono';
import { DeepAsset, ExternalApiError, UniqueNetwork } from '@sni/types';
import { env } from 'hono/adapter';
import walletsApp from '../wallets';
import assetsApp from '../assets';
import {
  BurnBodySchema,
  BurnResponseSchema,
  ClaimBodySchema,
  ClaimsParamsSchema,
  ProfileParamsSchema,
  ProfileResponseSchema,
} from './schemas';
import {
  countByAttribute,
  getAttributeValue,
  getSeed,
  updateOrAddAttribute,
} from './lib';
import { getDotphinCollectionConfig } from './config';
import { CrossmintResponse, ErrorSchema } from '$lib/shared/schemas';
import { logger } from '$lib/logger';
import { getRandomId } from '$lib/utils';
import { getUniqueAccount, getUniqueSdk } from '$lib/unique';
import { getDotphinClaim, setDotphinClaim } from '$lib/db';

const app = new OpenAPIHono();

function getDotphinEnvConfig(c: Context) {
  const {
    DOTPHIN_PROOFS_COLLECTION_ID,
    DOTPHIN_COLLECTION_ID,
    DOTPHIN_NETWORK,
  } = env<{
    DOTPHIN_PROOFS_COLLECTION_ID: string;
    DOTPHIN_COLLECTION_ID: number;
    DOTPHIN_NETWORK: UniqueNetwork;
  }>(c);

  const PROOFS_COLLECTION_DID = createAssetDID(
    DOTPHIN_NETWORK,
    'unique2',
    DOTPHIN_PROOFS_COLLECTION_ID
  );

  return {
    DOTPHIN_PROOFS_COLLECTION_ID,
    DOTPHIN_COLLECTION_ID,
    DOTPHIN_NETWORK,
    PROOFS_COLLECTION_DID,
  };
}

async function getProofsWithStats(address: string, c: Context) {
  const { PROOFS_COLLECTION_DID } = getDotphinEnvConfig(c);

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
    proofs: data,
    proofsStats: {
      total,
      used,
      available: {
        water: waterAvailable,
        air: airAvailable,
        earth: earthAvailable,
        total: available,
      },
    },
  };
}

async function getDotphinAddress(
  address: string,
  network: UniqueNetwork,
  dotphinCollectionId: number | string
) {
  const response = await fetch(
    `https://rest.unique.network/${network}/v1/tokens/account-tokens?address=${address}&collectionId=${dotphinCollectionId}`
  );

  if (!response.ok)
    throw new ExternalApiError(`External API error: ${response.statusText}`);

  const data = AccountTokensResponseSchema.parse(await response.json());

  const dotphin = data.tokens[0];

  if (!dotphin) {
    return null;
  }

  return createAssetDID(
    network,
    'unique2',
    dotphinCollectionId,
    dotphin.tokenId
  );
}

export async function updateTokenAttribute(
  mnemonic: string,
  network: UniqueNetwork,
  collectionId: number,
  tokenId: number,
  attribute: string,
  value: string
) {
  const sdk = getUniqueSdk(mnemonic, network);

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
}

//Profile
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
        description: 'Get proofs, proofs stats and dotphin DID for an address',
      },
    },
  }),
  async (c) => {
    const address = c.req.param('address');

    const { DOTPHIN_COLLECTION_ID, DOTPHIN_NETWORK } = getDotphinEnvConfig(c);

    const proofsWithStats = await getProofsWithStats(address, c);

    const dotphinDID = await getDotphinAddress(
      address,
      DOTPHIN_NETWORK,
      DOTPHIN_COLLECTION_ID
    );

    return c.json(
      {
        address,
        ...proofsWithStats,
        dotphinDID,
      },
      200
    );
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
    //TODO: Move to shared helper like getMintingEnvConfig
    const { MINTING_QUEUE } = env<{ MINTING_QUEUE: Queue<string> }>(c);
    const { MINTING_KV } = env<{ MINTING_KV: KVNamespace }>(c);

    const { SESSIONS_DB } = env<{ SESSIONS_DB: D1Database }>(c as Context);

    const { WALLET_MNEMONIC } = env<{ WALLET_MNEMONIC: string }>(c);

    const { DOTPHIN_COLLECTION_ID, DOTPHIN_NETWORK } = getDotphinEnvConfig(c);

    const { address, proofDID } = c.req.valid('json');

    const dotphinClaim = await getDotphinClaim(SESSIONS_DB, address);

    if (dotphinClaim.length > 0) {
      const claimId = dotphinClaim[0].id;

      const mintResponse = await MINTING_KV.get(claimId);

      if (mintResponse !== null) {
        const parsedMintResponse = CrossmintResponse.parse(
          JSON.parse(mintResponse)
        );

        return c.json(parsedMintResponse, 200);
      }
    }

    //TODO: Check if user logged in

    logger.info('Received claim request for ', address, proofDID);

    //Check if proofDID is valid
    const requestUrl = `/${proofDID}`;
    const assetResponse = await assetsApp.request(
      requestUrl,
      {},
      c.env,
      c.executionCtx
    );

    const proofAsset = (await assetResponse.json()) as DeepAsset;

    //TODO: Check if proof owner is the same as the user

    //Proof is not used
    const usedAttribute = Boolean(
      getAttributeValue(proofAsset.attributes!, 'used')
    );

    if (usedAttribute) {
      return c.json({ error: true, message: 'Proof is already used' }, 400);
    }

    //Check if user has DOTphin already
    const dotphinDID = await getDotphinAddress(
      address,
      DOTPHIN_NETWORK,
      DOTPHIN_COLLECTION_ID
    );

    if (dotphinDID) {
      return c.json({ error: true, message: 'User already has DOTphin' }, 400);
    }

    //Get the element from the proof and create a seed
    const element = getAttributeValue(proofAsset.attributes!, 'element');
    if (!element) {
      return c.json(
        { error: true, message: 'Something wrong with the proof' },
        400
      );
    }

    const seed = getSeed(element);

    const collectionConfig = getDotphinCollectionConfig(
      DOTPHIN_COLLECTION_ID.toString()
    );

    //Send minting request to the queue
    //TODO: Add workaround for dynamic collection config
    const mintId = getRandomId();
    logger.info(`Claiming DOTphin, sending minting ${mintId} to queue`);
    await MINTING_QUEUE.send(
      JSON.stringify({
        address,
        payload: {
          id: mintId,
          collection: 'UNNEEDED', //TODO: Remove collection from payload
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
        chain: DOTPHIN_NETWORK,
        contractAddress: DOTPHIN_COLLECTION_ID.toString(),
      },
      metadata: {
        image: collectionConfig.metadata.image[seed],
      },
      actionId: mintId,
    };

    await MINTING_KV.put(mintId, JSON.stringify(pendingResponse));
    await setDotphinClaim(SESSIONS_DB, mintId, address);

    const { contractAddress, tokenId } = parseAssetDID(proofDID);

    //Mark proof as used
    updateTokenAttribute(
      WALLET_MNEMONIC,
      DOTPHIN_NETWORK,
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

app.openapi(
  createRoute({
    method: 'post',
    path: '/burn',
    request: {
      body: { content: { 'application/json': { schema: BurnBodySchema } } },
    },
    responses: {
      200: {
        content: { 'application/json': { schema: BurnResponseSchema } },
        description: 'Returns burn status',
      },
      400: {
        content: { 'application/json': { schema: ErrorSchema } },
        description: 'Wrong DOTphin DID format',
      },
      500: {
        content: { 'application/json': { schema: ErrorSchema } },
        description: 'Wrong DOTphin DID format',
      },
    },
  }),
  async (c) => {
    const { dotphinDID, owner } = c.req.valid('json');
    const { contractAddress, tokenId, network } = parseAssetDID(dotphinDID);

    const { WALLET_MNEMONIC } = env<{ WALLET_MNEMONIC: string }>(c);

    logger.info(
      `Burning token ${tokenId} from collection ${Number(contractAddress)} on ${network}`
    );

    if (network !== 'opal')
      return c.json({ error: true, message: 'Wrong network' }, 400);

    const sdk = getUniqueSdk(WALLET_MNEMONIC, network);
    const account = getUniqueAccount(WALLET_MNEMONIC);

    const result = await sdk.token.burn(
      {
        collectionId: Number(contractAddress),
        tokenId,
        from: owner,
        address: account.address,
      },
      { signer: account.signer }
    );

    if (result.error) {
      logger.error(result.error);
      return c.json(
        { error: true, message: "Something went wrong, can't burn token" },
        500
      );
    }

    return c.json({ success: true }, 200);
  }
);

export default app;
