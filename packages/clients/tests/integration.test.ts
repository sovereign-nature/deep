import { expect, test } from 'vitest';
import { getEntity, getSteward } from '../data';
import { getLinkByAddress, getLinkById } from '../link';
import { getNftData } from '../nft';
import { kusamaNftResponse, polkadotNftResponse } from './responses';

test('getLinkById', async () => {
  const response = await getLinkById(
    '100159747025278469334864584271547111665257165513221447159618761990373607040690'
  );

  expect(response.status).toBe(200);
});

test('getLinkByAddress', async () => {
  const response = await getLinkByAddress(
    'did:asset:deep:polkadot.asset-hub:13:10'
  );

  expect(response.status).toBe(200);
});

test('getEntity', async () => {
  const response = await getEntity('aimm_minke_whales', 'ba_alg_001');

  expect(response.status).toBe(200);
});

test('getSteward', async () => {
  const response = await getSteward('aimm');

  expect(response.status).toBe(200);
});

test('getNFTData from Polkadot', async () => {
  const response = (await getNftData('polkadot', 'u-8', 262)) as object;

  expect(response).toStrictEqual(polkadotNftResponse);
});

test('getNFTData from Kusama', async () => {
  const response = (await getNftData('kusama', '91', 10)) as object;

  expect(response).toStrictEqual(kusamaNftResponse);
});

// test('getWeb2Asset from Hotel Hideaway', async () => {
//   const data = await (
//     await getWeb2Asset('hotel-hideaway', 'congolese-elephant-headwrap')
//   ).json();

//   expect(data).toStrictEqual(hotelHideawayResponse);
// }); //TODO: Fix this test

// test('getOpenSeaTestNetNft', async () => {
//   const data = await getOpenSeaTestNetNft(
//     '0x38de3f11ba85d75f28778c6f44a97d29ea910cf2',
//     1
//   );

//   expect(data).toStrictEqual(openSeaTestNetResponse);
// }); TODO: Fix this test
