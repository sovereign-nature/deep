import { expect, describe, it } from 'vitest';
import app from '../index';
import { HH_ASSET, WHALE_ASSET } from '../../tests/responses';

//TODO: Mock responses

describe('Assets API', () => {
  it('should handle invalid DID', async () => {
    const res = await app.request('http://localhost/assets/invalidDID');
    expect(res.status).toEqual(404);
  });

  it('should handle invalid Asset', async () => {
    const res = await app.request(
      'http://localhost/assets/did:asset:deep:polkadot.asset-hub:13:1000000'
    );
    expect(res.status).toEqual(404);
  });

  it('should fetch Polkadot Web3 asset', async () => {
    const res = await app.request(
      'http://localhost/assets/did:asset:deep:polkadot.asset-hub:13:738'
    );
    expect(await res.json()).toEqual(WHALE_ASSET);
  });

  it('should fetch Web2 asset', async () => {
    const res = await app.request(
      'http://localhost/assets/did:asset:deep:hotel-hideaway.asset:upemba-national-park-curls'
    );
    expect(await res.json()).toEqual(HH_ASSET);
  });
});
