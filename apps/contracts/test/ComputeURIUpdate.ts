import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { deploySNIFixture } from './fixtures';

describe('Compute URI Update', function () {
  it('Should update computeURI', async function () {
    const { sni, initialTokenId, updatedComputeURI, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();

    expect(await sni.setComputeURI(initialTokenId, updatedComputeURI)).not.to.be
      .reverted;
  });

  it('Should emit ComputeURISet event with correct arguments', async function () {
    const { sni, initialTokenId, updatedComputeURI, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();

    await expect(sni.setComputeURI(initialTokenId, updatedComputeURI))
      .to.emit(sni, 'ComputeURISet')
      .withArgs(initialTokenId, updatedComputeURI);
  });

  it('Should return updated computeURI', async function () {
    const { sni, initialTokenId, updatedComputeURI, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();
    await sni.setDataURI(initialTokenId, updatedComputeURI);

    expect(updatedComputeURI).to.be.equal(await sni.dataURI(initialTokenId));
  });

  // TODO: Test permissions for computeURI
});
