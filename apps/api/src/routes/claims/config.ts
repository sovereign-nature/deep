export type CollectionConfig = {
  name: string;
  externalId: string;
  metadata: {
    description: string;
    imagePrefix: string;
    name: string;
    attributes?: [{ trait_type: string; value: string }[]];
  };
  network: string;
};

interface Collections {
  [key: string]: CollectionConfig;
}

export const collections: Collections = {
  '5f773e35-d5f2-41dc-ae80-c94e0e8e4821': {
    name: 'engie',
    externalId: '5f773e35-d5f2-41dc-ae80-c94e0e8e4821',
    metadata: {
      description:
        'To celebrate ENGIE\'s commitment to Corporate Social and Environmental Responsibility, the Sovereign Nature Initiative proudly introduces the "Dakhla Bay Collection 1.0" eco-badges, developed in collaboration with ENGIE. These eco-badges present digital art inspired by the marine life of Dakhla Bay. Each badge merges abstract patterns with empirical data from Aquasearch, incorporating acoustic recordings and observational data that algorithmically shape the artwork\'s color, geometry, and dynamics. Discover the unique story of the dolphin linked to your eco-badge and share its tale with your community!',
      imagePrefix:
        'ipfs://QmPz44sT22UUtJSrTnzC8mA7znF1vWd5U4ZmzzBnpvdHYE/dakhla_collection_final_',
      name: 'ENGIE Bioacoustics Eco-Badge',
    },
    network: 'optimism',
  },
  'f5f7d73e-38b5-479d-a814-22c6d2199fcd': {
    name: 'test-collection',
    externalId: 'f5f7d73e-38b5-479d-a814-22c6d2199fcd',
    metadata: {
      description: 'Test collection',
      imagePrefix:
        'ipfs://QmPz44sT22UUtJSrTnzC8mA7znF1vWd5U4ZmzzBnpvdHYE/dakhla_collection_final_',
      name: 'ENGIE Bioacoustics Eco-Badge',
    },
    network: 'optimism',
  },
  'dotphin-poap-testnet': {
    name: 'dotphin-poap-testnet',
    externalId: '3019',
    metadata: {
      description: 'The Dotphin POAP Collection is a series of unique badges.',
      imagePrefix: 'ipfs://QmXzECuBhrG2xy6ewRJCivZFiTYeuvoAosTjRADhuHaoUA',
      name: 'Dotphin POAP Test',
      attributes: [
        [
          { trait_type: 'element', value: 'air' },
          { trait_type: 'event', value: 'polkadot-decoded-2024' },
        ],
      ],
    },
    network: 'opal',
  },
};
