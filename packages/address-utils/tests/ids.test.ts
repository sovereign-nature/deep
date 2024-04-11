import { expect, test } from 'vitest';

import { stringToId } from '..';

test('stringToId', () => {
  expect(
    stringToId(
      'did:asset:eip155:1.erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:634446'
    )
  ).toBe(
    '16252305920246887558139061128485879464410281133733409925973376638120369186641'
  );
});

//TODO: Remove
// test('getOffChainAssetId', () => {
//   expect(getOffChainAssetId('hh', 'african-elephant-mask')).toBe(
//     '38692554058794151312282208265925091515650039697725279587239497281140835702513'
//   );
// });

// test('getEVMAssetId', () => {
//   expect(
//     getEVMAssetId(
//       1,
//       'erc721',
//       '0x06012c8cf97bead5deae237070f9587f8e7a266d',
//       634446
//     )
//   ).toBe(
//     '16252305920246887558139061128485879464410281133733409925973376638120369186641'
//   );
// });

// test('getPolkadotAssetId for Kusama', () => {
//   expect(getPolkadotAssetId('kusama', '91', 10)).toBe(
//     '43209174295197749513960091776100732278123235334951780423259023611734831486488'
//   );
// });

// test('getPolkadotAssetId', () => {
//   expect(getPolkadotAssetId('polkadot', 'u-8', 262)).toBe(
//     '31537534386950388023491254677150515860389712061535283602024150019331823461691'
//   );
// });

test('Caps locks in address should be lowered', () => {
  expect(
    stringToId(
      'did:asset:eip155:11155111.ERC1155:0x38de3f11ba85d75f28778c6f44a97d29ea910cf2:1'
    )
  ).toBe(
    '115653591972449575259630083692804065443300095371969174452562981510420451547319'
  );
});
