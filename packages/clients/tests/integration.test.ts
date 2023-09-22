import { expect, test } from 'vitest';
import { getEntity, getSteward } from '../data';
import { getLinkByAddress, getLinkById } from '../link';
import { getNftData } from '../nft';
import {
  entityResponse,
  linkResponse,
  polkadotNftResponse,
  stewardResponse,
} from './responses';

test('getLinkById', () => {
  getLinkById(
    '31537534386950388023491254677150515860389712061535283602024150019331823461691'
  ).then((response) => {
    expect(response).toBe(linkResponse);
  });
});

test('getLinkByAddress', () => {
  getLinkByAddress('did:asset:deep:polkadot.asset-hub:u-8:262').then(
    (response) => {
      expect(response).toBe(linkResponse);
    }
  );
});

test('getEntity', () => {
  getEntity('aimm_minke_whales', 'ba_alg_001').then((response) => {
    expect(response).toBe(entityResponse);
  });
});

test('getSteward', () => {
  getSteward('aimm').then((response) => {
    expect(response).toBe(stewardResponse);
  });
});

test('getNFTData from Polkadot', () => {
  getNftData('polkadot', 'u-8', '262')?.then((response) => {
    expect(response).toBe(polkadotNftResponse);
  });
});

test('getNFTData from Kusama', () => {
  getNftData('polkadot', '91', '10')?.then((response) => {
    expect(response).toMatchObject(polkadotNftResponse);
  });
});
