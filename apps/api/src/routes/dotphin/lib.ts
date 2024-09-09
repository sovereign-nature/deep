import { DeepAsset } from '@sni/types';

//TODO: Cover with tests
export function getAttributeValue(
  attributes: { trait_type: string; value: string }[],
  trait: string
) {
  const attribute = attributes.find((a) => a.trait_type === trait);

  return attribute?.value;
}

export function countByAttribute(
  assets: DeepAsset[],
  trait: string,
  value: string
) {
  return assets.filter((asset) => {
    const attribute = getAttributeValue(asset.attributes!, trait);

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
