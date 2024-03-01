import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { verifyMessage } from 'viem';
import { expect, describe, it } from 'vitest';

describe('viem signature flow', async () => {
  const account = privateKeyToAccount(generatePrivateKey());
  const address = account.address;

  console.log('Address:', address);

  const message = JSON.stringify({ email: '1@23.com', address });

  console.log('Message:', message);

  const signature = await account.signMessage({ message });

  console.log('Signature:', signature);

  it('should verify signature', async () => {
    const isSignatureValid = await verifyMessage({
      address,
      message,
      signature,
    });

    expect(isSignatureValid).toEqual(true);
  });

  it('should fail to verify signature with wrong message', async () => {
    const isSignatureValid = await verifyMessage({
      address,
      message: 'invalid',
      signature,
    });

    expect(isSignatureValid).toEqual(false);
  });

  it('should fail to verify signature with wrong address', async () => {
    const isSignatureValid = await verifyMessage({
      address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
      message,
      signature,
    });

    expect(isSignatureValid).toEqual(false);
  });

  it('should fail to verify signature with wrong signature', async () => {
    const isSignatureValid = await verifyMessage({
      address,
      message,
      signature:
        '0x66edc32e2ab001213321ab7d959a2207fcef5190cc9abb6da5b0d2a8a9af2d4d2b0700e2c317c4106f337fd934fbbb0bf62efc8811a78603b33a8265d3b8f8cb1c',
    });

    expect(isSignatureValid).toEqual(false);
  });
});
