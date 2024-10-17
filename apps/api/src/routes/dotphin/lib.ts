import { createAssetDID } from '@sni/address-utils';
import { DeepAsset, ExternalApiError, UniqueNetwork } from '@sni/types';
import { getContext } from 'hono/context-storage';
import { AccountTokensResponseSchema } from '@sni/clients/wallets-client/targets/unique/schemas';
import walletsApp from '../wallets';
import { AppContext } from '$lib/shared/types';
import { logger } from '$lib/logger';
import { getUniqueSdk } from '$lib/unique';
import { getProof } from '$lib/db/proofs';

type Attribute = { trait_type: string; value: string };

export function getAttributeValue(attributes: Attribute[], trait: string) {
  const attribute = attributes.find((a) => a.trait_type === trait);

  return attribute?.value;
}

export function countByAttribute(
  assets: DeepAsset[],
  traitType: string,
  value: string
) {
  return assets.filter((asset) => {
    const attribute = getAttributeValue(asset.attributes!, traitType);

    return attribute === value;
  }).length;
}

export function countUnusedByAttribute(
  assets: DeepAsset[],
  traitType: string,
  value: string
) {
  return assets.filter((asset) => {
    const targetAttribute = getAttributeValue(asset.attributes!, traitType);
    const isUsed = getAttributeValue(asset.attributes!, 'used') === 'true';

    return targetAttribute === value && !isUsed;
  }).length;
}

/**
 * Get the seed (index) of the proof element
 * @param element id of the element
 * @returns seed (index) of the element (0, 1, 2)
 */
export function getSeed(element: string) {
  const elements = ['air', 'earth', 'water'];

  return elements.indexOf(element);
}

export function getAttributeIndex(attributes: Attribute[], traitType: string) {
  return attributes.findIndex((a) => a.trait_type === traitType);
}

export function updateOrAddAttribute(
  attributes: Attribute[],
  traitType: string,
  value: string
) {
  const index = getAttributeIndex(attributes, traitType);

  if (index === -1) {
    attributes.push({ trait_type: traitType, value });
  } else {
    attributes[index].value = value;
  }

  return attributes;
}

export function getDotphinEnvConfig() {
  const c = getContext<AppContext>();
  const {
    DOTPHIN_PROOFS_COLLECTION_ID,
    DOTPHIN_COLLECTION_ID,
    DOTPHIN_NETWORK,
  } = c.env;

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

export async function getDotphinAddress(
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

export async function updateDOTphin(
  tokenId: number,
  image: string,
  proofs: string,
  proofsElements: string
) {
  const c = getContext<AppContext>();

  const { DOTPHIN_COLLECTION_ID, DOTPHIN_NETWORK, WALLET_MNEMONIC } = c.env;

  const sdk = getUniqueSdk(WALLET_MNEMONIC, DOTPHIN_NETWORK);

  const token = await sdk.token.getV2({
    collectionId: DOTPHIN_COLLECTION_ID,
    tokenId,
  });

  const tokenDataProp = token.properties.find((p) => p.key === 'tokenData');
  if (!tokenDataProp) throw Error('Cannot find tokenData property');

  const tokenDataValue = JSON.parse(tokenDataProp.value);

  tokenDataValue['image'] = image;

  tokenDataValue.attributes = updateOrAddAttribute(
    tokenDataValue.attributes,
    'proofs',
    proofs
  );

  tokenDataValue.attributes = updateOrAddAttribute(
    tokenDataValue.attributes,
    'proofsElements',
    proofsElements
  );

  const result = await sdk.token.setProperties({
    collectionId: DOTPHIN_COLLECTION_ID,
    tokenId,
    properties: [{ key: 'tokenData', value: JSON.stringify(tokenDataValue) }],
  });

  console.log(result);

  logger.info(
    `Tokens attribute updated in collection ${DOTPHIN_COLLECTION_ID} with ID ${tokenId}}`
  );
}

export async function getProofsWithStats(address: string) {
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
