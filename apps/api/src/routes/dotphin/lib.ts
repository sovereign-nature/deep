import { DeepAsset } from '@sni/types';

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
