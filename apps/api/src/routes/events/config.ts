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
    going: false,
  },
  edcon2024: {
    collectionId: 'edcon2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: false,
  },
  web3summit2024: {
    collectionId: 'web3summit2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: false,
  },
  'polkadot-tokyo-party-2024': {
    collectionId: 'polkadot-tokyo-party-2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: false,
  },
  'decoded-asia-2024': {
    collectionId: 'decoded-asia-2024',
    realCollection: 'dotphin-proofs',
    seed: () => getRandomInt(0, 2),
    going: false,
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
    going: false,
  },
};
