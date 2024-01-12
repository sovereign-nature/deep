import { expect, test } from 'vitest';
import { getEntity, getSteward } from '../data';
import { getLinkByAddress, getLinkById } from '../link';
import { getNftAsset, getOpenSeaNft } from '../nft';
import { getWeb2Asset } from '../web2';
import {
  hotelHideawayResponse,
  kusamaNftResponse,
  openSeaArbitrumResponse,
  openSeaTestNetResponse,
  polkadotNftResponse,
} from './responses';

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
  const response = (await getNftAsset('polkadot', 'u-8', 262)) as object;

  expect(response).toStrictEqual(polkadotNftResponse);
});

test('getNFTData from Kusama', async () => {
  const response = (await getNftAsset('kusama', '91', 10)) as object;

  expect(response).toStrictEqual(kusamaNftResponse);
});

test('getWeb2Asset from Hotel Hideaway', async () => {
  const data = await await getWeb2Asset(
    'hotel-hideaway',
    'upemba-national-park-curls'
  );

  expect(data).toStrictEqual(hotelHideawayResponse);
});

test('getOpenSeaTestNetNft', async () => {
  const data = await getOpenSeaNft(
    '0x38de3f11ba85d75f28778c6f44a97d29ea910cf2',
    1,
    'sepolia'
  );

  expect(data).toStrictEqual(openSeaTestNetResponse);
});

test('getOpenSeaArbitrumNft', async () => {
  const data = await getOpenSeaNft(
    '0x10d2baeb37a4079fc62cc716b08e2452936424b1',
    422,
    'arbitrum'
  );

  expect(data).toStrictEqual(openSeaArbitrumResponse);
});
