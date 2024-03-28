import { test, expect } from 'vitest';
import { getCrossmintWalletAssets } from './client';
import { crossmintWalletDeepAssets } from './fixtures';

test('list nfts in crossmint wallet', async () => {
  const assets = await getCrossmintWalletAssets(
    'polygon',
    '0xB8A976Ad1d87D070b5E5806B98A768B4BB4E4847',
    '0x684808644b21126b72DE69D93f6dC4c68Eb00165',
    'apiKey'
  );

  expect(assets).toStrictEqual(crossmintWalletDeepAssets);
});
