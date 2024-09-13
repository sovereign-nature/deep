import { createAssetDID } from '@sni/address-utils';
import { DeepAsset, UniqueNetwork } from '@sni/types';
import { Context } from 'hono';
import { env } from 'hono/adapter';

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
    const isUsed = Boolean(getAttributeValue(asset.attributes!, 'used'));

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

export function getDotphinEnvConfig(c: Context) {
  const {
    DOTPHIN_PROOFS_COLLECTION_ID,
    DOTPHIN_COLLECTION_ID,
    DOTPHIN_NETWORK,
  } = env<{
    DOTPHIN_PROOFS_COLLECTION_ID: string;
    DOTPHIN_COLLECTION_ID: number;
    DOTPHIN_NETWORK: UniqueNetwork;
  }>(c);

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
