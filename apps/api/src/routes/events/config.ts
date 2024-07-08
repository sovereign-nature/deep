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
  decoded2024: {
    collectionId: 'dotphin-poap-testnet',
    realCollection: 'decoded2024',
    seed: () => random(0, 2, false),
  },
};
