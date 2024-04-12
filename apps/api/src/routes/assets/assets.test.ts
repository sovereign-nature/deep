import { expect, describe, it } from 'vitest';
import { ProvidedEnv, env } from 'cloudflare:test';
import app from '.';

interface TestEnv extends ProvidedEnv {
  OPEN_SEA_API_KEY: string;
  ALCHEMY_API_KEY: string;
}

const testEnv = env as TestEnv;

console.log(testEnv);

console.log(import.meta.env);
console.log(process.env);

describe('Assets API', () => {
  it('should handle invalid DID', async () => {
    const res = await app.request('http://localhost/invalidDID', {}, env);
    expect(res.status).toEqual(404);
  });

  it('should handle invalid Asset', async () => {
    const res = await app.request(
      'http://localhost/did:asset:deep:polkadot.asset-hub:13:1000000',
      {},
      env
    );
    expect(res.status).toEqual(404);
  });

  it('should fetch Polkadot Web3 asset', async () => {
    const res = await app.request(
      'http://localhost/did:asset:deep:polkadot.asset-hub:13:738',
      {},
      env
    );
    expect(res.status).toEqual(200);
  });

  it('should fetch Web2 asset', async () => {
    const res = await app.request(
      'http://localhost/did:asset:deep:hotel-hideaway.asset:upemba-national-park-curls',
      {},
      env
    );
    expect(res.status).toEqual(200);
  });

  it('should fetch OpenSea asset', async () => {
    const res = await app.request(
      'http://localhost/did:asset:eip155:42161.erc721:0x6cc7c9b2aa5fdcc044f9a51d9d083fd16aeb0a78:2',
      {},
      env
    );
    expect(res.status).toEqual(200);
  });

  it('should fetch Optimism Testnet asset', async () => {
    const res = await app.request(
      'http://localhost/did:asset:eip155:11155420.erc721:0xAA7f515b01C04E632c7837f1a80f67eA3f3Fc58B:7',
      {},
      env
    );
    expect(res.status).toEqual(200);
  });
});
