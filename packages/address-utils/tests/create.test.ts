import { describe, expect, it } from 'vitest';
import { createAssetDID } from '..';

describe('AssetDID creation', () => {
  it('creates assetDID address without tokenId', () => {
    const assetDID = createAssetDID('unique', 'unique2', '665');

    expect(assetDID).toBe('did:asset:eip155:8880.unique2:665');
  });

  it('creates assetDID address with tokenId', () => {
    const assetDID = createAssetDID('unique', 'unique2', '665', '1');

    expect(assetDID).toBe('did:asset:eip155:8880.unique2:665:1');
  });
});
