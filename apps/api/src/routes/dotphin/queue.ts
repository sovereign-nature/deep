import { UniqueNetwork } from '@sni/types';
import { DOTphinUpdate, EvolutionQueueMessage } from './types';
import { updateOrAddAttribute } from './lib/attributes';
import { logger } from '$lib/logger';
import { AppEnv } from '$lib/shared/types';
import { CrossmintResponseSchema } from '$lib/shared/schemas';
import { updateMint } from '$lib/db/mints';
import { getUniqueSdk } from '$lib/unique';

async function updateDOTphin(
  tokenId: number,
  dataUpdate: DOTphinUpdate,
  dotphinConfig: { collectionId: number; network: UniqueNetwork },
  mintId: string,
  mnemonic: string
) {
  const sdk = getUniqueSdk(mnemonic, dotphinConfig.network);

  const { collectionId } = dotphinConfig;

  const token = await sdk.token.getV2({
    collectionId,
    tokenId,
  });

  const tokenDataProp = token.properties.find((p) => p.key === 'tokenData');
  if (!tokenDataProp) throw Error('Cannot find tokenData property');

  const tokenDataValue = JSON.parse(tokenDataProp.value);

  tokenDataValue['image'] = dataUpdate.image;

  tokenDataValue.attributes = updateOrAddAttribute(
    tokenDataValue.attributes,
    'proofs',
    dataUpdate.proofs
  );

  tokenDataValue.attributes = updateOrAddAttribute(
    tokenDataValue.attributes,
    'proofsElements',
    dataUpdate.proofsElements
  );

  tokenDataValue.attributes = updateOrAddAttribute(
    tokenDataValue.attributes,
    'level',
    dataUpdate.level
  );

  const tokenUpdateResult = await sdk.token.setProperties({
    collectionId,
    tokenId,
    properties: [{ key: 'tokenData', value: JSON.stringify(tokenDataValue) }],
  });

  if (!tokenUpdateResult.parsed) {
    throw tokenUpdateResult.error;
  }

  const tokenMetadata = await sdk.token.getV2({
    collectionId,
    tokenId,
  });

  const response = {
    id: mintId,
    metadata: {
      name: tokenMetadata.name,
      description: tokenMetadata.description || '',
      image: tokenMetadata.image,
    },
    onChain: {
      status: 'success',
      chain: dotphinConfig.network,
      contractAddress: dotphinConfig.collectionId.toString(),
      owner: tokenMetadata.owner,
      tokenId: tokenId.toString(),
    },
    actionId: mintId,
  };

  logger.info(
    `Tokens attribute updated in collection ${dotphinConfig.collectionId} with ID ${tokenId}}`
  );

  return response;
}

export async function consumeEvolutionMessages(
  batch: MessageBatch<string>,
  env: AppEnv
) {
  const {
    DOTPHIN_COLLECTION_ID,
    DOTPHIN_NETWORK,
    WALLET_MNEMONIC,
    SESSIONS_DB,
  } = env;

  for (const message of batch.messages) {
    const { dataUpdate, tokenId, mintId } = JSON.parse(
      message.body
    ) as EvolutionQueueMessage;

    logger.info(
      `Queue job is started to update token ${tokenId} in collection ${DOTPHIN_COLLECTION_ID} on ${DOTPHIN_NETWORK} network`
    );

    const successResponse = await updateDOTphin(
      tokenId,
      dataUpdate,
      { collectionId: DOTPHIN_COLLECTION_ID, network: DOTPHIN_NETWORK },
      mintId,
      WALLET_MNEMONIC
    );

    const parsedResponse = CrossmintResponseSchema.parse(successResponse);

    await updateMint(SESSIONS_DB, mintId, parsedResponse);

    logger.info(
      `Queue job is finished to update token ${tokenId} in collection ${DOTPHIN_COLLECTION_ID} on ${DOTPHIN_NETWORK} network`
    );
  }
}
