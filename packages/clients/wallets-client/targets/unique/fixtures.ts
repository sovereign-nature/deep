//'https://rest.unique.network/opal/v1/tokens/account-tokens?address=0xB8A976Ad1d87D070b5E5806B98A768B4BB4E4847&collectionId=3019'
export const uniqueWalletNFTs = {
  url: 'https://rest.unique.network/opal/v1/tokens/account-tokens',
  payload: {
    tokens: [
      {
        collectionId: 3019,
        tokenId: 224,
      },
      {
        collectionId: 3019,
        tokenId: 312,
      },
    ],
  },
};

export const rateLimitedUniqueWallet = {
  url: 'https://rest.unique.network/opal/v1/tokens/account-tokens?address=LIMITED&collectionId=3019',
  payload: {},
};

//Network: opal, collectionId: 3019, tokenId: 224
export const uniqueNFT224 = {
  url: 'https://rest.unique.network/opal/v1/tokens/v2?collectionId=3019&tokenId=224',
  payload: {
    schemaName: 'unique',
    schemaVersion: '2.0.0',
    name: 'Dotphin POAP Test',
    description: 'The Dotphin POAP Collection is a series of unique badges.',
    image: 'ipfs://QmXzECuBhrG2xy6ewRJCivZFiTYeuvoAosTjRADhuHaoUA',
    attributes: [
      {
        trait_type: 'element',
        value: 'air',
      },
      {
        trait_type: 'event',
        value: 'polkadot-decoded-2024',
      },
    ],
    parsingError: null,
    collectionId: 3019,
    tokenId: 224,
    owner: '0xb8a976ad1d87d070b5e5806b98a768b4bb4e4847',
    properties: [
      {
        key: 'schemaName',
        value: 'unique',
        valueHex: '0x756e69717565',
      },
      {
        key: 'schemaVersion',
        value: '2.0.0',
        valueHex: '0x322e302e30',
      },
      {
        key: 'tokenData',
        value:
          '{"schemaName":"unique","schemaVersion":"2.0.0","name":"Dotphin POAP Test","description":"The Dotphin POAP Collection is a series of unique badges.","image":"ipfs://QmXzECuBhrG2xy6ewRJCivZFiTYeuvoAosTjRADhuHaoUA","attributes":[{"trait_type":"element","value":"air"},{"trait_type":"event","value":"polkadot-decoded-2024"}]}',
        valueHex:
          '0x7b22736368656d614e616d65223a22756e69717565222c22736368656d6156657273696f6e223a22322e302e30222c226e616d65223a22446f747068696e20504f41502054657374222c226465736372697074696f6e223a2254686520446f747068696e20504f415020436f6c6c656374696f6e206973206120736572696573206f6620756e69717565206261646765732e222c22696d616765223a22697066733a2f2f516d587a45437542687247327879366577524a4369765a466954596575766f416f73546a524144687548616f5541222c2261747472696275746573223a5b7b2274726169745f74797065223a22656c656d656e74222c2276616c7565223a22616972227d2c7b2274726169745f74797065223a226576656e74222c2276616c7565223a22706f6c6b61646f742d6465636f6465642d32303234227d5d7d',
      },
    ],
  },
};

//Network: opal, collectionId: 3019, tokenId: 312
export const uniqueNFT312 = {
  url: 'https://rest.unique.network/opal/v1/tokens/v2?collectionId=3019&tokenId=312',
  payload: {
    schemaName: 'unique',
    schemaVersion: '2.0.0',
    name: 'Dotphin POAP Test',
    description: 'The Dotphin POAP Collection is a series of unique badges.',
    image: 'ipfs://QmXzECuBhrG2xy6ewRJCivZFiTYeuvoAosTjRADhuHaoUA',
    attributes: [
      {
        trait_type: 'element',
        value: 'air',
      },
      {
        trait_type: 'event',
        value: 'polkadot-decoded-2024',
      },
    ],
    parsingError: null,
    collectionId: 3019,
    tokenId: 312,
    owner: '0xb8a976ad1d87d070b5e5806b98a768b4bb4e4847',
    properties: [
      {
        key: 'schemaName',
        value: 'unique',
        valueHex: '0x756e69717565',
      },
      {
        key: 'schemaVersion',
        value: '2.0.0',
        valueHex: '0x322e302e30',
      },
      {
        key: 'tokenData',
        value:
          '{"schemaName":"unique","schemaVersion":"2.0.0","name":"Dotphin POAP Test","description":"The Dotphin POAP Collection is a series of unique badges.","image":"ipfs://QmXzECuBhrG2xy6ewRJCivZFiTYeuvoAosTjRADhuHaoUA","attributes":[{"trait_type":"element","value":"air"},{"trait_type":"event","value":"polkadot-decoded-2024"}]}',
        valueHex:
          '0x7b22736368656d614e616d65223a22756e69717565222c22736368656d6156657273696f6e223a22322e302e30222c226e616d65223a22446f747068696e20504f41502054657374222c226465736372697074696f6e223a2254686520446f747068696e20504f415020436f6c6c656374696f6e206973206120736572696573206f6620756e69717565206261646765732e222c22696d616765223a22697066733a2f2f516d587a45437542687247327879366577524a4369765a466954596575766f416f73546a524144687548616f5541222c2261747472696275746573223a5b7b2274726169745f74797065223a22656c656d656e74222c2276616c7565223a22616972227d2c7b2274726169745f74797065223a226576656e74222c2276616c7565223a22706f6c6b61646f742d6465636f6465642d32303234227d5d7d',
      },
    ],
  },
};
