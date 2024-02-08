import { expect, test } from 'vitest';
import app from '../src/index';
import { HH_ASSET, WHALE_ASSET } from './responses';

test("Should return 'DEEP API'", async () => {
  const res = await app.request('http://localhost/');
  expect(await res.text()).toBe('DEEP API');
});

test('Should handle invalid DID', async () => {
  const res = await app.request('http://localhost/assets/invalidDID');
  expect(await res.json()).toEqual({ error: 'Asset not found' });
});

test('Should handle invalid Asset', async () => {
  const res = await app.request(
    'http://localhost/assets/did:asset:deep:polkadot.asset-hub:13:1000000'
  );
  expect(await res.json()).toEqual({ error: 'Asset not found' });
});

test('Should fetch Polkadot Web3 asset', async () => {
  const res = await app.request(
    'http://localhost/assets/did:asset:deep:polkadot.asset-hub:13:738'
  );
  expect(await res.json()).toEqual(WHALE_ASSET);
});

test('Should fetch Web2 asset', async () => {
  const res = await app.request(
    'http://localhost/assets/did:asset:deep:hotel-hideaway.asset:upemba-national-park-curls'
  );
  expect(await res.json()).toEqual(HH_ASSET);
});
