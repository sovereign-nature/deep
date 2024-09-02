import { CollectionConfig } from '../claims/config'; //TODO: Move to shared

export const collectionConfig: CollectionConfig = {
  name: 'dotphin',
  externalId: '777',
  network: 'unique',
  metadata: {
    name: 'DOTphin',
    description: 'DOTphin is a collection of unique NFTs.',
    image: [
      'https://example.com/dotphin.png',
      'https://example.com/dotphin.png',
      'https://example.com/dotphin.png',
    ],
    attributes: [],
  },
  tokenStandard: 'unique2',
};
