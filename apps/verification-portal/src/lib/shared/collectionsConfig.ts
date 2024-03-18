export type CollectionKeys = 'soundwaves' | 'wildsama' | 'sub0' | 'hh';
interface TabConfig {
  activeKey: CollectionKeys;
}
interface Collection {
  key: CollectionKeys; //used for tab query params and translations
  collectionAddress: string;
  web3?: {
    source: string;
    walletEnabled: boolean;
  };
  searchInput: {
    searchEnabled: boolean;
    inputMode?: string;
    customPlaceholder?: boolean;
  };
}

export const tabConfig: TabConfig = {
  activeKey: 'soundwaves',
};

export const collections: Collection[] = [
  {
    key: 'soundwaves',
    collectionAddress: '0x6cc7c9b2aa5fdcc044f9a51d9d083fd16aeb0a78',
    web3: { source: 'arbitrum', walletEnabled: true },
    searchInput: {
      searchEnabled: true,
      inputMode: 'numeric',
    },
  },
  {
    key: 'wildsama',
    collectionAddress: '0xdd0a0a15efc11930354b3e1eb1a62a87bf9abf30',
    web3: { source: 'moonsama', walletEnabled: false },
    searchInput: {
      searchEnabled: false,
      inputMode: 'numeric',
    },
  },
  {
    key: 'sub0',
    collectionAddress: 'sub0',
    web3: { source: 'polkadot', walletEnabled: false },
    searchInput: {
      searchEnabled: true,
      customPlaceholder: true,
    },
  },
  {
    key: 'hh',
    collectionAddress: 'hotel_hideaway',
    searchInput: {
      searchEnabled: true,
    },
  },
];
