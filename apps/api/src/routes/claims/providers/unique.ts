import Sdk from '@unique-nft/sdk';
import { Sr25519Account } from '@unique-nft/utils/sr25519';
// import { Address } from '@unique-nft/utils';
import { CollectionConfig } from '../config';
import { Payload } from '../types';
import { logger } from '../../../utils/logger';

export async function mintUniqueToken(
  network: 'opal' | 'unique',
  address: string, //TODO: Would be cool to validate this address like 0x${string}
  payload: Payload,
  collectionConfig: CollectionConfig,
  mnemonic: string
) {
  const account = Sr25519Account.fromUri(mnemonic);

  const sdk = new Sdk({
    baseUrl: `https://rest.unique.network/${network}/v1`,
    account,
    axiosConfig: { adapter: 'fetch' },
  });

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

  // for (const tokenId of tokenIds) {
  //   console.log(
  //     `${sdk.options.baseUrl}/tokens/v2?collectionId=${collectionId}&tokenId=${tokenId}`
  //   );
  // }

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
