export type CollectionConfig = {
  name: string;
  metadata: {
    description: string;
    imagePrefix: string;
    name: string;
  };
  network: string;
};

interface Collections {
  [key: string]: CollectionConfig;
}

export const collections: Collections = {
  '5f773e35-d5f2-41dc-ae80-c94e0e8e4821': {
    name: 'engie',
    metadata: {
      description:
        'To celebrate ENGIE\'s commitment to Corporate Social and Environmental Responsibility, the Sovereign Nature Initiative proudly introduces the "Dakhla Bay Collection 1.0" eco-badges, developed in collaboration with ENGIE. These eco-badges present digital art inspired by the marine life of Dakhla Bay. Each badge merges abstract patterns with empirical data from Aquasearch, incorporating acoustic recordings and observational data that algorithmically shape the artwork\'s color, geometry, and dynamics. Discover the unique story of the dolphin linked to your eco-badge and share its tale with your community!',
      imagePrefix:
        'ipfs://QmPz44sT22UUtJSrTnzC8mA7znF1vWd5U4ZmzzBnpvdHYE/dakhla_collection_final_',
      name: 'ENGIE Bioacoustics Eco-Badge',
    },
    network: 'optimism',
  },
  'dotphin-poap-testnet': {
    name: 'dotphin-poap-testnet',
    metadata: {
      description: 'The Dotphin POAP Collection is a series of unique badges.',
      imagePrefix: 'ipfs://QmXzECuBhrG2xy6ewRJCivZFiTYeuvoAosTjRADhuHaoUA',
      name: 'Dotphin POAP Test',
    },
    network: 'opal',
  },
};
