import Sdk from '@unique-nft/sdk';
import { Sr25519Account } from '@unique-nft/utils/sr25519';
import { env } from 'hono/adapter';
import { Context } from 'hono';
import { Payload } from '../types';
import { CollectionConfig } from '../config';

export async function mintUniqueToken(
  address: string,
  payload: Payload,
  collectionConfig: CollectionConfig,
  c: Context
) {
  const { WALLET_MNEMONIC } = env<{ WALLET_MNEMONIC: string }>(c);

  const account = Sr25519Account.fromUri(WALLET_MNEMONIC);

  const sdk = new Sdk({
    baseUrl: 'https://rest.unique.network/opal/v1',
    account,
  });

  if (!collectionConfig.externalId) {
    throw new Error('Collection externalId is not set');
  }

  const collectionId = parseInt(collectionConfig.externalId);

  const tokensMintingResult = await sdk.token.createMultipleV2({
    collectionId: parseInt(payload.collection),
    tokens: [
      {
        owner: address,
        name: 'demo token',
        image: collectionConfig.metadata.imagePrefix,
        attributes: [{ trait_type: 'color', value: 'YElLLow' }],
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

  return c.json({ tokenIds });
}
