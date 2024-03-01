import { expect, describe, it } from 'vitest';
import app from '.';

describe('Claim API', () => {
  it('should claim with valid signature', async () => {
    const body = {
      message: {
        email: '1@23.com',
        address: '0xFE3ae310a016eDF00B9504E25AE1A22C64Cb8e94',
      },
      signature:
        '0x0f31a586324caa064d42ca78a8f176b7ea65978a8ebf73c42c2de4bd7cc989c00882d0254cb5be0af445b9bd5c547daba15910b1330995597effe8d1fc62ffbd1c',
    };

    const req = new Request('http://localhost/claim', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await app.request(req);

    expect(await res.json()).toEqual({ signatureValidated: true });
  });

  it('should fail to claim with invalid signature', async () => {
    const body = {
      message: {
        email: '1@23.com',
        address: '0xFE3ae310a016eDF00B9504E25AE1A22C64Cb8e94',
      },
      signature:
        '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
    };

    const req = new Request('http://localhost/claim', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await app.request(req);

    expect(await res.json()).toEqual({ signatureValidated: false });
  });

  it('should fail to claim with invalid address', async () => {
    const body = {
      message: {
        email: '1@23.com',
        address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
      },
      signature:
        '0x0f31a586324caa064d42ca78a8f176b7ea65978a8ebf73c42c2de4bd7cc989c00882d0254cb5be0af445b9bd5c547daba15910b1330995597effe8d1fc62ffbd1c',
    };

    const req = new Request('http://localhost/claim', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await app.request(req);

    expect(await res.json()).toEqual({ signatureValidated: false });
  });

  it('should fail to claim with invalid email', async () => {
    const body = {
      message: {
        email: 'wrong@wrong.com',
        address: '0xFE3ae310a016eDF00B9504E25AE1A22C64Cb8e94',
      },
      signature:
        '0x0f31a586324caa064d42ca78a8f176b7ea65978a8ebf73c42c2de4bd7cc989c00882d0254cb5be0af445b9bd5c547daba15910b1330995597effe8d1fc62ffbd1c',
    };

    const req = new Request('http://localhost/claim', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await app.request(req);

    expect(await res.json()).toEqual({ signatureValidated: false });
  });

  it('should fail to claim with malformed body', async () => {
    const body = {
      address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
      signature:
        '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
    };

    const req = new Request('http://localhost/claim', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res = await app.request(req);

    expect(res.status).toEqual(400);
  });
});
