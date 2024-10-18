import { updateDOTphin } from './lib';
import { logger } from '$lib/logger';
import { AppEnv } from '$lib/shared/types';
import { CrossmintResponseSchema } from '$lib/shared/schemas';
import { updateMint } from '$lib/db/mints';

type EvolutionQueueMessage = {
  tokenId: number;
  mintId: string;
  dataUpdate: {
    image: string;
    proofs: string;
    proofsElements: string;
  };
};

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
