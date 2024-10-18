import { parseAssetDID } from '@sni/address-utils';
import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { contextStorage, getContext } from 'hono/context-storage';
import { DeepAsset } from '@sni/types';
import { Context } from 'hono';
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
  getDotphinAddress,
  getDotphinEnvConfig,
  getProofsWithStats,
  getSeed,
} from './lib';
import { getDotphinCollectionConfig } from './config';
import { validateProof, validateUser } from './validators';
import { EvolutionQueueMessage } from './types';
import { generateEvolutionImage } from './lib/image';
import { getAttributeValue } from './lib/attributes';
import { CrossmintResponseSchema, ErrorSchema } from '$lib/shared/schemas';
import { logger } from '$lib/logger';
import { getRandomId, submitQueueMessage } from '$lib/utils';
import { getUniqueAccount, getUniqueSdk } from '$lib/unique';
import {
  deleteDotphinClaim,
  getDotphinClaim,
  setDotphinClaim,
} from '$lib/db/dotphin-claims';
import { addProofAsUsed, resetProofsForUser } from '$lib/db/proofs';
import { session } from '$middleware/session';
import { AppContext, DOTphinElement } from '$lib/shared/types';
import { addMint, getMint } from '$lib/db/mints';

const app = new OpenAPIHono<AppContext>();
app.use(contextStorage());

//TODO: Add CSRF protection?
//Protecting claim with session middleware
app.use('/claim', session);

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

function getProofElement(proof: DeepAsset): DOTphinElement {
  return getAttributeValue(proof.attributes!, 'element') as DOTphinElement;
}

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
    const { DOTPHIN_COLLECTION_ID, DOTPHIN_NETWORK } = getDotphinEnvConfig();

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

    //User validation
    if (c.env.ENVIRONMENT !== 'dev') {
      await validateUser(address, c);
    }

    //Proof validation
    const requestUrl = `/${proofDID}`;
    const assetResponse = await assetsApp.request(
      requestUrl,
      {},
      c.env,
      c.executionCtx
    );

    const proofAsset = (await assetResponse.json()) as DeepAsset;

    await validateProof(proofAsset, address, c);

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
    const element = getProofElement(proofAsset);
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

async function getAsset(
  did: string,
  c: Context<AppContext>
): Promise<DeepAsset> {
  const assetResponse = await assetsApp.request(
    `/${did}`,
    {},
    c.env,
    c.executionCtx
  );

  return (await assetResponse.json()) as DeepAsset;
}

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
    const { CF_IMAGES_TOKEN, DOTPHIN_NETWORK, DOTPHIN_COLLECTION_ID } = c.env;

    const { address, proofDID, dotphinDID } = c.req.valid('json');

    logger.info(
      'Received evolution request for ',
      address,
      proofDID,
      dotphinDID
    );

    //User validation
    if (c.env.ENVIRONMENT !== 'dev') {
      await validateUser(address, c);
    }

    //Proof validation

    const proofAsset = await getAsset(proofDID, c);
    await validateProof(proofAsset, address, c);

    //Check if user has DOTphin already
    const ownedDotphinDID = await getDotphinAddress(
      address,
      DOTPHIN_NETWORK,
      DOTPHIN_COLLECTION_ID
    );

    if (!ownedDotphinDID || ownedDotphinDID !== dotphinDID) {
      logger.error("User don't have DOTphin or wrong DOTphin DID");

      return c.json(
        {
          error: true,
          message: "User don't have DOTphin or wrong DOTphin DID",
        },
        400
      );
    }

    const dotphinAsset = await getAsset(dotphinDID, c);

    console.log('DOTphin asset', dotphinAsset);

    const proofElement = getProofElement(proofAsset);
    const dotphinElement = 'air'; //TODO: Get element from the DOTphin
    const dotphinLevel = 2; //TODO: Get level from the DOTphin

    const dotphinImage = await generateEvolutionImage(
      dotphinLevel,
      dotphinElement,
      [proofElement],
      CF_IMAGES_TOKEN
    );

    const mintId = getRandomId();

    await submitEvolutionMessage({
      mintId,
      tokenId: 0,
      dataUpdate: {
        image: dotphinImage,
        proofs: '123', //TODO: Get proofs from the DOTphin
        proofsElements: 'air-air-air', //TODO: Get proofs elements from the DOTphin,
        level: 2, //TODO: Get level from the DOTphin
      },
    });

    const pendingResponse = {
      id: mintId,
      onChain: {
        status: 'pending',
        chain: DOTPHIN_NETWORK,
        contractAddress: DOTPHIN_COLLECTION_ID.toString(),
      },
      metadata: {
        image: dotphinImage,
      },
      actionId: mintId,
    };

    return c.json(pendingResponse, 200);
  }
);

async function submitEvolutionMessage(message: EvolutionQueueMessage) {
  const c = getContext<AppContext>();

  const { EVOLUTION_QUEUE } = c.env;

  await submitQueueMessage(message, EVOLUTION_QUEUE);
}

export default app;
