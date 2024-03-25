export type CollectionConfig = {
  name: string;
  metadata: {
    description: string;
    image: string;
    name: string;
  };
  network: string;
};

interface Collections {
  [key: string]: CollectionConfig;
}

export const collections: Collections = {
  //Engie test collections
  'f5f7d73e-38b5-479d-a814-22c6d2199fcd': {
    name: 'engie-test',
    metadata: {
      description: 'My NFT created via the mint API!',
      image: 'https://www.crossmint.com/assets/crossmint/logo.png',
      name: 'Crossmint Example NFT',
    },
    network: 'optimism',
  },
};
