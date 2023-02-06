import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { deploySNIFixture } from './fixtures';

describe('Status Update', function () {
  it('Should update status', async function () {
    const { sni, initialTokenId, updatedStatus, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();

    expect(sni.setStatus(initialTokenId, updatedStatus)).to.be.not.reverted;
  });

  it('Should emit StatusSet event with correct arguments', async function () {
    const { sni, initialTokenId, updatedStatus, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();

    await expect(sni.setStatus(initialTokenId, updatedStatus))
      .to.emit(sni, 'StatusSet')
      .withArgs(initialTokenId, updatedStatus);
  });

  it('Should return updated status', async function () {
    const { sni, initialTokenId, updatedStatus, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();
    await sni.setStatus(initialTokenId, updatedStatus);

    expect(updatedStatus).to.be.equal(await sni.statusOf(initialTokenId));
  });

  it('Only initial oracle should be able to update status', async function () {
    const { sni, initialTokenId, updatedStatus, otherAccount, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();
    await sni.setStatus(initialTokenId, updatedStatus);

    expect(sni.connect(otherAccount).setStatus(initialTokenId, updatedStatus))
      .to.be.reverted;
  });

  // TODO: Test if we can grant oracle
});
