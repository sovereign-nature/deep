import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { deployDeepLinkFixture } from './fixtures';

describe('DeepLink Token Minting', function () {
  it('Should mint', async function () {
    const { mintInitial } = await loadFixture(deployDeepLinkFixture);

    expect(mintInitial()).not.to.be.reverted;
  });

  it('Should has initial owner', async function () {
    const { deepLink, owner, initialTokenId, mintInitial } = await loadFixture(
      deployDeepLinkFixture
    );

    await mintInitial();

    const nftOwner = await deepLink.ownerOf(initialTokenId);

    expect(nftOwner).to.equal(owner.address);
  });

  it('Should has element ID set', async function () {
    const { deepLink, initialTokenId, mintInitial, initialElementId } =
      await loadFixture(deployDeepLinkFixture);

    await mintInitial();

    const elementId = await deepLink.elementId(initialTokenId);

    expect(elementId).to.equal(initialElementId);
  });

  it('Should has conservation ID set', async function () {
    const { deepLink, initialTokenId, mintInitial, initialConservationId } =
      await loadFixture(deployDeepLinkFixture);

    await mintInitial();

    const conservationId = await deepLink.conservationId(initialTokenId);

    expect(conservationId).to.equal(initialConservationId);
  });
});
