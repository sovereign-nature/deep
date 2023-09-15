import { expect, test } from 'vitest';
import { parseAddress } from '..';

test('Parse EVM address', () => {
  expect(
    parseAddress(
      'did:asset:eip155:1.erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:634446'
    )
  ).toEqual({
    scheme: 'did',
    didMethod: 'asset',
    chain: {
      namespace: 'eip155',
      reference: '1',
    },
    asset: {
      namespace: 'erc721',
      reference: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
      identifier: 634446,
    },
  });
});

test('Parse Off-chain Address', () => {
  expect(parseAddress('did:asset:deep:hh.asset:african-elephant-mask')).toEqual(
    {
      scheme: 'did',
      didMethod: 'asset',
      chain: {
        namespace: 'deep',
        reference: 'hh',
      },
      asset: {
        namespace: 'asset',
        reference: 'african-elephant-mask',
        identifier: NaN,
      },
    }
  );
});

test('Parse Polkadot Asset Hub Address', () => {
  expect(parseAddress('did:asset:deep:kusama.asset-hub:91:10')).toEqual({
    scheme: 'did',
    didMethod: 'asset',
    chain: {
      namespace: 'deep',
      reference: 'kusama',
    },
    asset: {
      namespace: 'asset-hub',
      reference: '91',
      identifier: 10,
    },
  });
});
