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
      description:
        "Beneath the depths of the Polkadot ecosystem, something extraordinary lurks - the enigmatic DOTphin. This mystical being embodies the essence of nature, continuously growing and transforming. The adventure commences with Orbo, a powerful symbol of life's boundless potential. Orbo serves as a blank canvas from which all aspects of existence emerge, a primal Orb pulsating with promise. It signifies the genesis of life's endless opportunities.",
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
