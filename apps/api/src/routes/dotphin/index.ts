import { AccountTokensResponseSchema } from '@sni/clients/wallets-client/targets/unique/schemas';
import { createAssetDID, parseAssetDID } from '@sni/address-utils';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { contextStorage, getContext } from 'hono/context-storage';
import { DeepAsset, ExternalApiError, UniqueNetwork } from '@sni/types';
import { setCookie } from 'hono/cookie';
import walletsApp from '../wallets';
import assetsApp from '../assets';
import {
  BurnBodySchema,
  BurnResponseSchema,
  ClaimBodySchema,
  ClaimsParamsSchema,
  EvolveBodySchema,
  ProfileParamsSchema,
  ProfileResponseSchema,
} from './schemas';
import {
  countByAttribute,
  countUnusedByAttribute,
  getAttributeValue,
  getDotphinEnvConfig,
  getSeed,
  updateOrAddAttribute,
} from './lib';
import { getDotphinCollectionConfig } from './config';
import { CrossmintResponseSchema, ErrorSchema } from '$lib/shared/schemas';
import { logger } from '$lib/logger';
import { getRandomId } from '$lib/utils';
import { getUniqueAccount, getUniqueSdk } from '$lib/unique';
import {
  deleteDotphinClaim,
  getDotphinClaim,
  setDotphinClaim,
} from '$lib/db/dotphin-claims';
import { addProofAsUsed, getProof, resetProofsForUser } from '$lib/db/proofs';
import { session } from '$middleware/session';
import { AppContext } from '$lib/shared/types';
import { addMint, getMint } from '$lib/db/mints';

const app = new OpenAPIHono<AppContext>();
app.use(contextStorage());

//TODO: Add CSRF protection?
//Protecting claim with session middleware
app.use('/claim', session);

async function getProofsWithStats(address: string) {
  const c = getContext<AppContext>();

  const { PROOFS_COLLECTION_DID } = getDotphinEnvConfig();

  const requestUrl = `/${address}?assetDID=${PROOFS_COLLECTION_DID}`;

  const result = await walletsApp.request(
    requestUrl,
    c.req.raw,
    c.env,
    c.executionCtx
  );

  const assets = (await result.json()) as DeepAsset[];

  //TODO: Remove when on-chain used state is implemented
  for (const asset of assets) {
    const proof = await getProof(c.env.SESSIONS_DB, asset.address);

    if (proof === null) {
      updateOrAddAttribute(asset.attributes!, 'used', 'false');
    } else {
      const { used } = proof;
      updateOrAddAttribute(asset.attributes!, 'used', used.toString());
    }
  }

  const total = assets.length;
  const used = countByAttribute(assets, 'used', 'true');

  const available = total - used;

  const waterAvailable = countUnusedByAttribute(assets, 'element', 'water');
  const airAvailable = countUnusedByAttribute(assets, 'element', 'air');
  const earthAvailable = countUnusedByAttribute(assets, 'element', 'earth');

  return {
    proofs: assets,
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
  const result = await sdk.token.setProperties({
    collectionId,
    tokenId,
    properties: [{ key: 'tokenData', value: JSON.stringify(tokenDataValue) }],
  });

  console.log(result);

  logger.info(
    `Tokens attribute updated in collection ${collectionId} with ID ${tokenId}}`
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

    const { DOTPHIN_COLLECTION_ID, DOTPHIN_NETWORK } = getDotphinEnvConfig();

    const proofsWithStats = await getProofsWithStats(address);

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
        content: { 'application/json': { schema: CrossmintResponseSchema } },
        description: 'Returns a claim token for the DOTphin',
      },
      400: {
        content: { 'application/json': { schema: ErrorSchema } },
        description:
          'Proof is already used, wrong address or user already has DOTphin',
      },
      401: {
        content: { 'application/json': { schema: ErrorSchema } },
        description: 'User is not logged in',
      },
    },
  }),
  async (c) => {
    const {
      DOTPHIN_COLLECTION_ID,
      DOTPHIN_NETWORK,
      DOTPHIN_PROOFS_COLLECTION_ID,
    } = getDotphinEnvConfig();

    const { SESSIONS_DB, MINTING_QUEUE } = c.env;

    const { address, proofDID } = c.req.valid('json');

    logger.info('Received claim request for ', address, proofDID);

    const dotphinClaim = await getDotphinClaim(SESSIONS_DB, address);

    if (dotphinClaim.length > 0) {
      const claimId = dotphinClaim[0].id;

      const mintResponse = await getMint(SESSIONS_DB, claimId);

      if (mintResponse) {
        const parsedMintResponse = CrossmintResponseSchema.parse(
          mintResponse.tokenData
        );

        return c.json(parsedMintResponse, 200);
      }
    }

    const user = c.get('user');

    //Check if user logged in and have the rights to claim
    if (!user) {
      logger.error('User is not logged in');

      return c.json({ error: true, message: 'User is not logged in' }, 401);
    }

    if (user.id.toLowerCase() !== address.toLowerCase()) {
      logger.error(
        `User address and claim address does not match.  UserID: ${user.id.toLowerCase()} Claim Address: ${address.toLowerCase()}`
      );

      //Cookies cleanup hack, so users are not connecting with broken or wrong session
      const session = c.get('session');

      const lucia = c.get('lucia');

      //Invalidate the session
      if (session) {
        logger.info(`Removing the session ${session.id}`);

        await lucia.invalidateSession(session.id);
        logger.info('Session invalidated', { session });
      }

      //Invalidate all user sessions (just in case)
      await lucia.invalidateUserSessions(user.id);

      //Remove the cookie
      const blankCookie = lucia.createBlankSessionCookie();
      setCookie(c, blankCookie.name, blankCookie.value, blankCookie.attributes);

      return c.json(
        {
          error: true,
          message: 'User address and claim address does not match',
        },
        400
      );
    }

    //Proof validation
    //Check if proofDID is valid
    const requestUrl = `/${proofDID}`;
    const assetResponse = await assetsApp.request(
      requestUrl,
      {},
      c.env,
      c.executionCtx
    );

    const proofAsset = (await assetResponse.json()) as DeepAsset;

    //Check if proof is from the DOTphin collection
    if (proofAsset.collection.id !== DOTPHIN_PROOFS_COLLECTION_ID.toString()) {
      logger.error('Proof is not from the DOTphin collection');

      return c.json(
        {
          error: true,
          message: 'Proof is not from the DOTphin collection',
        },
        400
      );
    }

    //Checking if proof owner is the same as the user
    if (proofAsset.owner.toLowerCase() !== address.toLowerCase()) {
      logger.error('Proof owner and claim address does not match');

      return c.json(
        {
          error: true,
          message: 'Proof owner and claim address does not match',
        },
        400
      );
    }

    //Check if proof is not used
    const proofCache = await getProof(SESSIONS_DB, proofDID);

    if (proofCache !== null) {
      const { used } = proofCache;

      if (used) {
        logger.error('Proof is already used');

        return c.json({ error: true, message: 'Proof is already used' }, 400);
      }
    }

    //Check if user has DOTphin already
    const dotphinDID = await getDotphinAddress(
      address,
      DOTPHIN_NETWORK,
      DOTPHIN_COLLECTION_ID
    );

    if (dotphinDID) {
      logger.error('User already has DOTphin');

      return c.json({ error: true, message: 'User already has DOTphin' }, 400);
    }

    //Get the element from the proof and create a seed
    const element = getAttributeValue(proofAsset.attributes!, 'element');
    if (!element) {
      logger.error("Something wrong with the proof, can't get element");

      return c.json(
        { error: true, message: 'Something wrong with the proof' },
        400
      );
    }

    const seed = getSeed(element);

    const collectionConfig = getDotphinCollectionConfig(
      DOTPHIN_COLLECTION_ID.toString(),
      DOTPHIN_NETWORK
    );

    collectionConfig.metadata.attributes![seed].push({
      trait_type: 'proofs',
      value: proofDID,
    });

    //Send minting request to the queue
    const mintId = getRandomId();
    logger.info(`Claiming DOTphin, sending minting ${mintId} to queue`);
    await MINTING_QUEUE.send(
      JSON.stringify({
        address,
        payload: {
          id: mintId,
          collection: 'DOTphin', //TODO: Remove collection from payload
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

    await addMint(SESSIONS_DB, mintId, pendingResponse);

    await setDotphinClaim(SESSIONS_DB, mintId, address);

    //Mark proof as used
    //TODO: Update token on chain with used attribute (updateTokenAttribute method)
    await addProofAsUsed(SESSIONS_DB, proofDID, address);

    return c.json(pendingResponse, 200);
  }
);

//TODO: Universal API for status check?
app.openapi(
  createRoute({
    method: 'get',
    path: '/claims/:id',
    request: {
      params: ClaimsParamsSchema,
    },
    responses: {
      200: {
        content: { 'application/json': { schema: CrossmintResponseSchema } },
        description: 'Returns claim status',
      },
      404: {
        content: { 'application/json': { schema: ErrorSchema } },
        description: 'Claim not found',
      },
    },
  }),
  async (c) => {
    const { SESSIONS_DB } = c.env;
    const mintId = c.req.valid('param').id;
    const mintResponse = await getMint(SESSIONS_DB, mintId);

    if (mintResponse) {
      return c.json(mintResponse.tokenData, 200);
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

    const { WALLET_MNEMONIC, SESSIONS_DB } = c.env;

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

    await resetProofsForUser(SESSIONS_DB, owner);
    await deleteDotphinClaim(SESSIONS_DB, owner);

    return c.json({ success: true }, 200);
  }
);

app.openapi(
  createRoute({
    method: 'post',
    path: '/evolve',
    request: {
      body: { content: { 'application/json': { schema: EvolveBodySchema } } },
    },
    responses: {
      200: {
        content: { 'application/json': { schema: CrossmintResponseSchema } },
        description: 'Returns evolving token',
      },
      400: {
        content: { 'application/json': { schema: ErrorSchema } },
        description:
          "Proof is already used, wrong address, user don't have DOTphin or wrong proofDID",
      },
      401: {
        content: { 'application/json': { schema: ErrorSchema } },
        description: 'User is not logged in',
      },
    },
  }),
  async (c) => {
    console.log(c);
    throw new Error('Not implemented');
  }
);

export default app;
