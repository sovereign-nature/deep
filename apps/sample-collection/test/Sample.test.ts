import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Sample', function () {
  async function deploySampleFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const SampleContract = await ethers.getContractFactory('Sample');

    const sampleContract = await SampleContract.deploy();

    return { sampleContract, owner, otherAccount };
  }

  it('Should mint', async function () {
    const { owner, sampleContract } = await loadFixture(deploySampleFixture);

    expect(sampleContract.safeMint(owner.address)).not.to.be.reverted;
  });

  it('Should return identifierAddress', async function () {
    const { owner, sampleContract } = await loadFixture(deploySampleFixture);
    sampleContract.safeMint(owner.address);

    expect(await sampleContract.identifierAddress(0)).to.be.equal(
      '1287:0xfd3434f66093f8007B30Bc44D3c467E660589059:0'
    );
  });
});
