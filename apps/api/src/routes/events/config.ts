import { random } from 'lodash';
export type EventConfig = {
  collectionId: string;
  realCollection: string;
  seed: () => number | string;
};

interface Events {
  [key: string]: EventConfig;
}

export const events: Events = {
  decoded: {
    collectionId: 'dotphin-poap-testnet',
    realCollection: 'dotphin-poap',
    seed: () => random(0, 3),
  },
};
