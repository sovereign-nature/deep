export type CollectionKeys =
  | 'soundwaves'
  | 'wildsama'
  | 'sub0'
  | 'hh'
  | 'engie'
  | 'dotphin-decoded';
interface TabConfig {
  activeKey: CollectionKeys;
}
export interface Collection {
  test?: boolean;
  key: CollectionKeys; //used for tab query params and translations
  collectionAddress: string;
  avatar: string;
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
  activeKey: 'engie',
};

export const collections: Collection[] = [
  {
    key: 'dotphin-decoded',
    collectionAddress: 'did:asset:eip155:8882.unique2:3019',
    avatar:
      'https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/0ca097dd-d487-4f7f-f2e7-86db8f2aa300/square300px',
    web3: { source: 'opal', web3Enabled: true },
    searchInput: {
      searchEnabled: true,
      inputMode: 'numeric',
    },
    test: true,
  },
  {
    key: 'engie',
    collectionAddress:
      'did:asset:eip155:10.erc721:0xf2D96c9CE9c10a0981857887eF1E0355A4fDB4C9',
    avatar:
      'https://imagedelivery.net/TbEOGfUBcfmfflqdtuuZVA/0ca097dd-d487-4f7f-f2e7-86db8f2aa300/square300px',
    web3: { source: 'optimism', web3Enabled: true },
    searchInput: {
      searchEnabled: true,
      inputMode: 'numeric',
    },
  },
  {
    key: 'soundwaves',
    collectionAddress:
      'did:asset:eip155:42161.erc721:0x6cc7c9b2aa5fdcc044f9a51d9d083fd16aeb0a78',
    avatar: '/collections/avatar_soudwaves.jpg',
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
    avatar: '/collections/avatar_wildsama.jpg',
    web3: { source: 'moonsama', web3Enabled: false },
    searchInput: {
      searchEnabled: true,
      inputMode: 'numeric',
    },
  },
  {
    key: 'sub0',
    collectionAddress: 'did:asset:deep:polkadot.asset-hub:13',
    avatar: '/collections/avatar_sub0.jpg',
    web3: { source: 'polkadot', web3Enabled: false },
    searchInput: {
      searchEnabled: true,
      customPlaceholder: true,
    },
  },
  {
    key: 'hh',
    collectionAddress: 'did:asset:deep:hotel-hideaway.asset',
    avatar: '/collections/avatar_hh.jpg',
    web2: { directusCollectionId: 'hotel_hideaway' },
    searchInput: {
      searchEnabled: true,
    },
  },
];
