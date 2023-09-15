import { expect, test } from 'vitest';

import {
  getEVMAssetId,
  getOffChainAssetId,
  getPolkadotAssetId,
  stringToId,
} from '..';

test('stringToId', () => {
  expect(
    stringToId(
      'eip155:1.erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:634446'
    )
  ).toBe(
    '96851617604060392051808188240296481822672372098817637354959352848762349402403'
  );
});

test('getOffChainAssetId', () => {
  expect(getOffChainAssetId('hh', 'african-elephant-mask')).toBe(
    '103244973880582909146485882502116319904324003381101279674954319639856392112978'
  );
});

test('getEVMAssetId', () => {
  expect(
    getEVMAssetId(
      1,
      'erc721',
      '0x06012c8cf97bead5deae237070f9587f8e7a266d',
      634446
    )
  ).toBe(
    '96851617604060392051808188240296481822672372098817637354959352848762349402403'
  );
});

test('getPolkadotAssetId', () => {
  expect(getPolkadotAssetId('kusama', '91', 10)).toBe(
    '45439422387691332965231224344124482100617615633882363871003634570284840668319'
  );
});
