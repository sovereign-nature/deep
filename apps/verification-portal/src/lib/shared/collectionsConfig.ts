export type CollectionKeys = 'soundwaves' | 'wildsama' | 'sub0' | 'hh';
interface TabConfig {
  activeKey: CollectionKeys;
}
interface Collection {
  key: CollectionKeys; //used for tab query params and translations
  collectionAddress: string;
  directusCollectionId?: string;
  web3?: {
    source: string;
    web3Enabled: boolean;
  };
  web2?: {
    directusCollectionId: string;
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
    collectionAddress:
      'did:asset:eip155:42161.erc721:0x6cc7c9b2aa5fdcc044f9a51d9d083fd16aeb0a78',
    web3: { source: 'arbitrum', web3Enabled: true },
    searchInput: {
      searchEnabled: true,
      inputMode: 'numeric',
    },
  },
  {
    key: 'wildsama',
    collectionAddress:
      'did:asset:eip155:2199.erc721:0xdd0a0a15efc11930354b3e1eb1a62a87bf9abf30',
    web3: { source: 'moonsama', web3Enabled: false },
    searchInput: {
      searchEnabled: false,
      inputMode: 'text',
    },
  },
  {
    key: 'sub0',
    collectionAddress: 'did:asset:deep:polkadot.asset-hub:13',
    web3: { source: 'polkadot', web3Enabled: false },
    searchInput: {
      searchEnabled: true,
      customPlaceholder: true,
    },
  },
  {
    key: 'hh',
    collectionAddress: 'did:asset:deep:hotel-hideaway.asset',
    web2: { directusCollectionId: 'hotel_hideaway' },
    searchInput: {
      searchEnabled: true,
    },
  },
];