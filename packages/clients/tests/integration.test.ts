import { expect, test } from 'vitest';
import { getEntity, getSteward } from '../data';
import { getLinkByAddress, getLinkById } from '../link';
import { getNftData } from '../nft';
import { getWeb2Asset } from '../web2';
import {
  entityResponse,
  hotelHideawayResponse,
  kusamaNftResponse,
  linkResponse,
  polkadotNftResponse,
  stewardResponse,
} from './responses';

test('getLinkById', async () => {
  const response = await getLinkById(
    '31537534386950388023491254677150515860389712061535283602024150019331823461691'
  );

  expect(response.data).toStrictEqual(linkResponse);
});

test('getLinkByAddress', async () => {
  const response = await getLinkByAddress(
    'did:asset:deep:polkadot.asset-hub:u-8:262'
  );

  expect(response.data).toStrictEqual(linkResponse);
});

test('getEntity', async () => {
  const response = await getEntity('aimm_minke_whales', 'ba_alg_001');

  expect(response.data).toStrictEqual(entityResponse);
});

test('getSteward', async () => {
  const response = await getSteward('aimm');

  expect(response.data).toStrictEqual(stewardResponse);
});

test('getNFTData from Polkadot', async () => {
  const response = await getNftData('polkadot', 'u-8', 262);

  expect(response).toStrictEqual(polkadotNftResponse);
});

test('getNFTData from Kusama', async () => {
  const response = await getNftData('kusama', '91', 10);

  expect(response).toStrictEqual(kusamaNftResponse);
});

test('getWeb2Asset from Hotel Hideaway', async () => {
  const response = await getWeb2Asset(
    'hotel-hideaway',
    'congolese-elephant-headwrap'
  );

  expect(response.data).toStrictEqual(hotelHideawayResponse);
});
