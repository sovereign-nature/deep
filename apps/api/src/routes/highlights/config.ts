export const collections: {
  [key: string]: {
    id: string;
    collectionAddress: string;
    highlightIds: number[] | string[];
  };
} = {
  sub0: {
    id: 'sub0',
    collectionAddress: 'did:asset:deep:polkadot.asset-hub:13',
    highlightIds: [1, 2, 3, 4, 734, 735, 736, 737],
  },
  soundwaves: {
    id: 'soundwaves',
    collectionAddress:
      'did:asset:eip155:42161.erc721:0x6cc7c9b2aa5fdcc044f9a51d9d083fd16aeb0a78',
    highlightIds: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  hh: {
    id: 'hh',
    collectionAddress: 'did:asset:deep:hotel-hideaway.asset',
    highlightIds: [
      'buffalo-horns',
      'hippopotamus-beanie',
      'zebra-onesie-hood',
      'upemba-mud-turtle-shell',
      'park-ranger-uniform',
      'zebra-mohawk',
      'upemba-mud-turtle-mask',
    ],
  },
  wildsama: {
    id: 'wildsama',
    collectionAddress:
      'did:asset:eip155:2199.erc721:0xdd0a0a15efc11930354b3e1eb1a62a87bf9abf30',
    highlightIds: [13, 277, 3],
  },
  engie: {
    id: 'engie',
    collectionAddress:
      'did:asset:eip155:10.erc721:0xf2D96c9CE9c10a0981857887eF1E0355A4fDB4C9',
    highlightIds: [1, 2, 3, 4, 5, 6],
  },
  'dotphin-proofs': {
    id: 'dotphin-proofs',
    collectionAddress: 'did:asset:eip155:8880.unique2:665',
    highlightIds: [1, 14, 12],
  },
};
