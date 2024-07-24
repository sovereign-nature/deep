export const crossmintWalletNFTs = {
  url: 'https://crossmint.com/api/2022-06-09/wallets/polygon:0xB8A976Ad1d87D070b5E5806B98A768B4BB4E4847/nfts',
  payload: [
    {
      chain: 'polygon',
      contractAddress: '0x684808644b21126b72DE69D93f6dC4c68Eb00165',
      tokenId: '7',
      metadata: {
        attributes: [],
        collection: {},
        description: 'My NFT created via the mint API!',
        image:
          'https://lh3.googleusercontent.com/b22CIYJIw0efSHsrXFX7AfUgyVeFF2sINDwoQZi3ek-pmwqiE217__CZ0ZI16KbUqYMnSeajdLL2LScHPLuhFD0oWF82pY-_vdVG=s1000',
        animation_url: null,
        name: 'Crossmint Example NFT',
      },
      locator: 'poly:0x684808644b21126b72DE69D93f6dC4c68Eb00165:7',
      tokenStandard: 'erc-721',
    },
    {
      chain: 'polygon',
      contractAddress: '0x684808644b21126b72DE69D93f6dC4c68Eb00165',
      tokenId: '6',
      metadata: {
        attributes: [],
        collection: {},
        description: 'My NFT created via the mint API!',
        image:
          'https://lh3.googleusercontent.com/b22CIYJIw0efSHsrXFX7AfUgyVeFF2sINDwoQZi3ek-pmwqiE217__CZ0ZI16KbUqYMnSeajdLL2LScHPLuhFD0oWF82pY-_vdVG=s1000',
        animation_url: null,
        name: 'Crossmint Example NFT',
      },
      locator: 'poly:0x684808644b21126b72DE69D93f6dC4c68Eb00165:6',
      tokenStandard: 'erc-721',
    },
  ],
};

export const crossmintWalletDeepAssets = [
  {
    id: '7',
    tokenId: '7',
    name: 'Crossmint Example NFT',
    description: 'My NFT created via the mint API!',
    image:
      'https://lh3.googleusercontent.com/b22CIYJIw0efSHsrXFX7AfUgyVeFF2sINDwoQZi3ek-pmwqiE217__CZ0ZI16KbUqYMnSeajdLL2LScHPLuhFD0oWF82pY-_vdVG=s1000',
    animationUrl: undefined,
    collection: {
      id: '0x684808644b21126b72DE69D93f6dC4c68Eb00165',
      name: 'Crossmint Example NFT',
      description: 'My NFT created via the mint API!',
    },
    address:
      'did:asset:eip155:137.erc721:0x684808644b21126b72DE69D93f6dC4c68Eb00165:7',
  },
  {
    id: '6',
    tokenId: '6',
    name: 'Crossmint Example NFT',
    description: 'My NFT created via the mint API!',
    image:
      'https://lh3.googleusercontent.com/b22CIYJIw0efSHsrXFX7AfUgyVeFF2sINDwoQZi3ek-pmwqiE217__CZ0ZI16KbUqYMnSeajdLL2LScHPLuhFD0oWF82pY-_vdVG=s1000',
    animationUrl: undefined,
    collection: {
      id: '0x684808644b21126b72DE69D93f6dC4c68Eb00165',
      name: 'Crossmint Example NFT',
      description: 'My NFT created via the mint API!',
    },
    address:
      'did:asset:eip155:137.erc721:0x684808644b21126b72DE69D93f6dC4c68Eb00165:6',
  },
];
