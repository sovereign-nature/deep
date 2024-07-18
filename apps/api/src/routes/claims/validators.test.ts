import { expect, describe, it } from 'vitest';
import { addressIsValid } from './validators';

describe('Wallet Address Valudator', () => {
  it('should validate Substrate address', async () => {
    const address = '5H1cgPibH23nPWca786aPVm97CeQKTN5mui2c7RM2kVdUaPp';

    expect(addressIsValid(address)).toEqual(true);
  });

  it('should validate Ethereum address', async () => {
    const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

    expect(addressIsValid(address)).toEqual(true);
  });

  it('should mark invalid address', async () => {
    const address = 'invalid address';

    expect(addressIsValid(address)).toEqual(false);
  });
});
