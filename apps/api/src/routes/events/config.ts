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
    going: false,
  },
};
