import { mintUniqueToken } from './providers/unique';
import { Payload } from './types';
import { CollectionConfig } from './config';
import { updateMint } from '$lib/db/mints';
import { logger } from '$lib/logger';
import { CrossmintResponseSchema } from '$lib/shared/schemas';
import { AppEnv } from '$lib/shared/types';

type MintingQueueMessage = {
  address: string;
  payload: Payload;
  collectionConfig: CollectionConfig;
};

export async function consumeMintingMessages(
  batch: MessageBatch<string>,
  env: AppEnv
) {
  for (const message of batch.messages) {
    const mintRequest = JSON.parse(message.body) as MintingQueueMessage;

    const network = mintRequest.collectionConfig.network;

    switch (network) {
      case 'opal':
      case 'unique':
        {
          const mintId = mintRequest.payload.id;
          logger.info(
            `Queue job is started to mint ${mintId} on ${network} network in collection ${mintRequest.collectionConfig.externalId}`
          );

          const successResponse = await mintUniqueToken(
            network,
            mintRequest.address,
            mintRequest.payload, //TODO: Retype payload, should't require collectionId
            mintRequest.collectionConfig,
            env.WALLET_MNEMONIC
          );

          const parsedResponse = CrossmintResponseSchema.parse(successResponse);

          await updateMint(env.SESSIONS_DB, mintId, parsedResponse);

          logger.info(
            `Queue job is finished to mint ${mintId} on ${network} network`
          );
        }
        break;
      default:
        break;
    }
  }
}
