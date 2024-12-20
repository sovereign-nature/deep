import { UniqueNetwork } from '@sni/types';
import { CollectionConfig } from '../config';
import { Payload } from '../types';
import { logger } from '$lib/logger';
import { getUniqueSdk } from '$lib/unique';

export async function mintUniqueToken(
  network: UniqueNetwork,
  address: string, //TODO: Would be cool to validate this address like 0x${string}
  payload: Payload,
  collectionConfig: CollectionConfig,
  mnemonic: string
) {
  const sdk = getUniqueSdk(mnemonic, network);

  class MintingError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'MintingError';
    }
  }

  if (!collectionConfig.externalId) {
    throw new MintingError('Collection externalId is not set');
  }

  const collectionId = parseInt(collectionConfig.externalId);
  // const contractAddress = Address.collection.idToAddress(collectionId);

  const seed = payload.seed;
  const tokensMintingResult = await sdk.token.createMultipleV2({
    collectionId: parseInt(collectionConfig.externalId),
    tokens: [
      {
        owner: address,
        name: collectionConfig.metadata.name,
        image: collectionConfig.metadata.image[seed],
        description: collectionConfig.metadata.description,
        attributes: collectionConfig.metadata.attributes
          ? collectionConfig.metadata.attributes[seed]
          : [],
      },
    ],
  });

  if (!tokensMintingResult.parsed) {
    throw tokensMintingResult.error;
  }

  const tokenIds = tokensMintingResult.parsed.map(({ tokenId }) => tokenId);

  logger.info(
    `Tokens minted in collection ${collectionId}, ids ${tokenIds.join(', ')}, job ${payload.id}`
  );

  const tokenId = tokenIds[0];

  const tokenMetadata = await sdk.token.getV2({
    collectionId,
    tokenId,
  });

  const response = {
    id: payload.id,
    metadata: {
      name: tokenMetadata.name,
      description: tokenMetadata.description || '',
      image: tokenMetadata.image,
    },
    onChain: {
      status: 'success',
      chain: collectionConfig.network,
      contractAddress: collectionConfig.externalId,
      owner: tokenMetadata.owner,
      tokenId: tokenId.toString(),
    },
    actionId: payload.id,
  };

  return response;
}
