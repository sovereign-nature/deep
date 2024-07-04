import { expect, describe, it } from 'vitest';
// import { env, SELF } from 'cloudflare:test';
import app from '.';

describe('Assets API', () => {
  it('should handle invalid DID', async () => {
    const res = await app.request('http://localhost/invalidDID');
    expect(res.status).toEqual(400);
  });

  it('should handle missing Asset', async () => {
    const res = await app.request(
      'http://localhost/did:asset:deep:polkadot.asset-hub:13:1000000'
    );
    expect(res.status).toEqual(404);
  });

  it('should fetch Polkadot Web3 asset', async () => {
    const res = await app.request(
      'http://localhost/did:asset:deep:polkadot.asset-hub:13:738'
    );
    expect(res.status).toEqual(200);
  });

  it('should fetch Web2 asset', async () => {
    const res = await app.request(
      'http://localhost/did:asset:deep:hotel-hideaway.asset:upemba-national-park-curls'
    );
    expect(res.status).toEqual(200);
  });

  it('should fetch Opal asset', async () => {
    const res = await app.request(
      'http://localhost/did:asset:eip155:8882.unique2:3019:327'
    );

    expect(res.status).toEqual(200);
  });

  //TODO: Fix OpenSea and Optimism tests
  // it('should fetch OpenSea asset', async () => {
  //   const res = await app.request(
  //     'http://localhost/did:asset:eip155:42161.erc721:0x6cc7c9b2aa5fdcc044f9a51d9d083fd16aeb0a78:2'
  //   );
  //   expect(res.status).toEqual(200);
  // });

  // it('should fetch Optimism Testnet asset', async () => {
  //   const res = await app.request(
  //     'http://localhost/did:asset:eip155:11155420.erc721:0xAA7f515b01C04E632c7837f1a80f67eA3f3Fc58B:7'
  //   );
  //   expect(res.status).toEqual(200);
  // });
});
