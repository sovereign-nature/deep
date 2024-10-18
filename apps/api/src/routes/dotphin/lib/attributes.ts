import { DeepAsset, UniqueNetwork } from '@sni/types';
import { logger } from '$lib/logger';
import { getUniqueSdk } from '$lib/unique';
import { DOTphinElement } from '$lib/shared/types';

type Attribute = { trait_type: string; value: string };

export function getAttributeValue(attributes: Attribute[], trait: string) {
  const attribute = attributes.find((a) => a.trait_type === trait);

  return attribute?.value;
}

//TODO: Cover with tests
export function getProofElement(proof: DeepAsset): DOTphinElement {
  return getAttributeValue(proof.attributes!, 'element') as DOTphinElement;
}

//TODO: Cover with tests
export function getDotphinElement(dotphin: DeepAsset): DOTphinElement {
  return getAttributeValue(
    dotphin.attributes!,
    'mainElement'
  ) as DOTphinElement;
}

//TODO: Cover with tests
export function appendProof(dotphin: DeepAsset, proofDID: string) {
  const proofs = getAttributeValue(dotphin.attributes!, 'proofs') || '';

  return `${proofs}-${proofDID}`;
}

//TODO: Cover with tests
export function appendProofElement(
  dotphin: DeepAsset,
  element: DOTphinElement
) {
  const elements =
    getAttributeValue(dotphin.attributes!, 'proofsElements') || '';

  return `${elements}-${element}`;
}

//TODO: Cover with tests
export function getDotphinLevel(dotphin: DeepAsset): number {
  return Number(getAttributeValue(dotphin.attributes!, 'level'));
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
