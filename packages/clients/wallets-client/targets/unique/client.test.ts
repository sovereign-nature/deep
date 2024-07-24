import { it, describe, expect } from 'vitest';
import { getUniqueWalletAssets } from './client';

const expectedWalletAssets = [
  {
    address: 'did:asset:eip155:8882.unique2:3019:224',
    collection: {
      id: '3019',
      name: '',
    },
    description: 'The Dotphin POAP Collection is a series of unique badges.',
    id: '224',
    image: 'ipfs://QmXzECuBhrG2xy6ewRJCivZFiTYeuvoAosTjRADhuHaoUA',
    name: 'Dotphin POAP Test',
    tokenId: '224',
  },
  {
    address: 'did:asset:eip155:8882.unique2:3019:312',
    collection: {
      id: '3019',
      name: '',
    },
    description: 'The Dotphin POAP Collection is a series of unique badges.',
    id: '312',
    image: 'ipfs://QmXzECuBhrG2xy6ewRJCivZFiTYeuvoAosTjRADhuHaoUA',
    name: 'Dotphin POAP Test',
    tokenId: '312',
  },
];

describe('Unique wallets client', () => {
  it('list nfts in unique wallet', async () => {
    const assets = await getUniqueWalletAssets(
      'opal',
      '0xB8A976Ad1d87D070b5E5806B98A768B4BB4E4847',
      3019
    );

    expect(assets).toStrictEqual(expectedWalletAssets);
  });

  it('should through error when rate limited', async () => {
    expect(getUniqueWalletAssets('opal', 'limited', 3019)).rejects.toThrowError(
      'External API error: Too Many Requests'
    );
  });
});
