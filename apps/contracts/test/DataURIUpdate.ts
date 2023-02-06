import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { deploySNIFixture } from './fixtures';

describe('Data URI update', function () {
  it('Should update dataURI', async function () {
    const { sni, initialTokenId, updatedDataURI, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();

    expect(await sni.setDataURI(initialTokenId, updatedDataURI)).not.to.be
      .reverted;
  });

  it('Should emit DataURISet event with correct arguments', async function () {
    const { sni, initialTokenId, updatedDataURI, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();

    await expect(sni.setDataURI(initialTokenId, updatedDataURI))
      .to.emit(sni, 'DataURISet')
      .withArgs(initialTokenId, updatedDataURI);
  });

  it('Should return updated dataURI', async function () {
    const { sni, initialTokenId, updatedDataURI, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();
    await sni.setDataURI(initialTokenId, updatedDataURI);

    expect(updatedDataURI).to.be.equal(await sni.dataURI(initialTokenId));
  });

  // TODO: Test permissions for dataURI
});
