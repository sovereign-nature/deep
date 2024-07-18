import { expect, it, describe } from 'vitest';
import { parseAssetDID } from '..';

describe('AssetDID address parsing', () => {
  it('parses EVM DID address', () => {
    expect(
      parseAssetDID(
        'did:asset:eip155:1.erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:634446'
      )
    ).toEqual({
      network: 'mainnet',
      contractAddress: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
      tokenId: 634446,
    });
  });

  it('parses off-chain address', () => {
    expect(
      parseAssetDID('did:asset:deep:hh.asset:african-elephant-mask')
    ).toEqual({
      network: 'hh',
      contractAddress: 'african-elephant-mask',
      tokenId: -1,
    });
  });

  it('parses Polkadot Asset Hub Address', () => {
    expect(parseAssetDID('did:asset:deep:kusama.asset-hub:91:10')).toEqual({
      network: 'kusama',
      contractAddress: '91',
      tokenId: 10,
    });
  });

  it('fails on wrong token id', () => {
    expect(() =>
      parseAssetDID(
        'did:asset:eip155:8880.unique2:665:15FwPN7A5pWPDQsHYbaddhkn1h93rGpByLrvEfM27JSVTDbk'
      )
    ).toThrowError('Invalid token id');
  });
});
