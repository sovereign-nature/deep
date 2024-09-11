import { CollectionConfig } from '../claims/config'; //TODO: Move to shared

const baseAttributes = [
  { trait_type: 'level', value: '1' },
  { trait_type: 'experience', value: '0' },
  { trait_type: 'type', value: 'orbo' },
];

export function getDotphinCollectionConfig(
  collectionId: string
): CollectionConfig {
  return {
    name: 'DOTphin',
    externalId: collectionId,
    network: 'opal',
    metadata: {
      name: 'DOTphin',
      description: 'DOTphin is a collection of unique NFTs.',
      image: [
        'https://real.myfilebase.com/ipfs/QmSd8qhWTqYvPYGEnXcB9cRhFGwA8XVR1wfN5GGv4x4vJj/orbo-air.png',
        'https://real.myfilebase.com/ipfs/QmSd8qhWTqYvPYGEnXcB9cRhFGwA8XVR1wfN5GGv4x4vJj/orbo-earth.png',
        'https://real.myfilebase.com/ipfs/QmSd8qhWTqYvPYGEnXcB9cRhFGwA8XVR1wfN5GGv4x4vJj/orbo-water.png',
      ],
      attributes: [
        [{ trait_type: 'mainElement', value: 'air' }, ...baseAttributes],
        [{ trait_type: 'mainElement', value: 'earth' }, ...baseAttributes],
        [{ trait_type: 'mainElement', value: 'water' }, ...baseAttributes],
      ],
    },
    tokenStandard: 'unique2',
  };
}
