export type EventConfig = {
  collectionId: string;
  realCollection: string;
  seed: () => number | string;
  going: boolean;
};

interface Events {
  [key: string]: EventConfig;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
};
