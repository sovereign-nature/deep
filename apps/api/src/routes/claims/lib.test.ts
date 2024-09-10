import { expect, describe, it } from 'vitest';
import { createClaimLink } from './lib';

describe('Claim link generator', () => {
  it('createClaimLink', async () => {
    const link = await createClaimLink(
      { collectionId: 'test', seed: 0 },
      'secret'
    );

    expect(link).toMatch('https://real.sovereignnature.com/?claim=');
  });

  it('createClaimLink with real collection', async () => {
    const link = await createClaimLink(
      { collectionId: 'test', seed: 0, realCollection: 'real' },
      'secret'
    );

    expect(link).toMatch('https://real.sovereignnature.com/?q=real&claim=');
  });
});
