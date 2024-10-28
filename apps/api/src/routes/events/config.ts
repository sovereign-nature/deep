import { getRandomInt } from '../../lib/utils';

export type EventConfig = {
  collectionId: string;
  realCollection: string;
  seed: () => number | string;
  going: boolean;
};

interface Events {
  [key: string]: EventConfig;
}

export const events: Events = {
  decoded2024: {
    collectionId: 'polkadot-decoded2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: true,
  },
  edcon2024: {
    collectionId: 'edcon2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: true,
  },
  web3summit2024: {
    collectionId: 'web3summit2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: true,
  },
  'polkadot-tokyo-party-2024': {
    collectionId: 'polkadot-tokyo-party-2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: true,
  },
  'decoded-asia-2024': {
    collectionId: 'decoded-asia-2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: true,
  },
  'token2049-singapore-2024': {
    collectionId: 'token2049-singapore-2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: true,
  },
  'european-blockchain-convention-2024': {
    collectionId: 'european-blockchain-convention-2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: true,
  },
  'newsletter-october-2024': {
    collectionId: 'newsletter-october-2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: true,
  },
  'merge-madrid-2024': {
    collectionId: 'merge-madrid-2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: true,
  },
  vds2024: {
    collectionId: 'vds2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: true,
  },
  'sub0-reset-2024': {
    collectionId: 'sub0-reset-2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: false,
  },
};
