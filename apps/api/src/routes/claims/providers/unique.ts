import Sdk from '@unique-nft/sdk';
import { Sr25519Account } from '@unique-nft/utils/sr25519';
// import { Address } from '@unique-nft/utils';
import { CollectionConfig } from '../config';
import { Payload } from '../types';

export async function mintUniqueToken(
  address: string,
  payload: Payload,
  collectionConfig: CollectionConfig,
  mnemonic: string
) {
  const account = Sr25519Account.fromUri(mnemonic);

  const sdk = new Sdk({
    baseUrl: 'https://rest.unique.network/opal/v1',
    account,
    axiosConfig: { adapter: 'fetch' },
  });

  if (!collectionConfig.externalId) {
    throw new Error('Collection externalId is not set');
  }

  const collectionId = parseInt(collectionConfig.externalId);
  // const contractAddress = Address.collection.idToAddress(collectionId);

  const tokensMintingResult = await sdk.token.createMultipleV2({
    collectionId: parseInt(collectionConfig.externalId),
    tokens: [
      {
        owner: address,
        name: collectionConfig.metadata.name,
        image: collectionConfig.metadata.imagePrefix,
        description: collectionConfig.metadata.description,
        attributes: collectionConfig.metadata.attributes
          ? collectionConfig.metadata.attributes[0]
          : [],
      },
    ],
  });

  if (!tokensMintingResult.parsed) {
    throw tokensMintingResult.error;
  }

  const tokenIds = tokensMintingResult.parsed.map(({ tokenId }) => tokenId);

  console.log(
    `Tokens minted in collection ${collectionId}, ids ${tokenIds.join(', ')}`
  );

  for (const tokenId of tokenIds) {
    console.log(
      `${sdk.options.baseUrl}/tokens/v2?collectionId=${collectionId}&tokenId=${tokenId}`
    );
  }

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
    assetDID:
      'did:asset:eip155:11155420.erc721:0xAA7f515b01C04E632c7837f1a80f67eA3f3Fc58B:74', //TODO: replace with real DID
  };

  return response;
}
