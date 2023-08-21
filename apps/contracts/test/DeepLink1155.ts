import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { deployDeepLink1155Fixture } from './fixtures';

describe('DeepLink1155 Single Token Minting', function () {
  it('Should mint', async function () {
    const { mintInitial } = await loadFixture(deployDeepLink1155Fixture);

    expect(await mintInitial()).not.to.be.reverted;
  });

  it('Should has initial owner', async function () {
    const { deepLink, owner, mintInitial } = await loadFixture(
      deployDeepLink1155Fixture
    );

    await mintInitial();

    const nftOwner = await deepLink.owner();

    expect(nftOwner).to.equal(owner.address);
  });

  it('Should has element ID set', async function () {
    const { deepLink, initialTokenId, mintInitial, initialElementId } =
      await loadFixture(deployDeepLink1155Fixture);

    await mintInitial();

    const elementId = await deepLink.elementId(initialTokenId);

    expect(elementId).to.equal(initialElementId);
  });

  it('Should has conservation ID set', async function () {
    const { deepLink, initialTokenId, mintInitial, initialConservationId } =
      await loadFixture(deployDeepLink1155Fixture);

    await mintInitial();

    const conservationId = await deepLink.conservationId(initialTokenId);

    expect(conservationId).to.equal(initialConservationId);
  });
});

describe('DeepLink1155 Batch Token Minting', function () {
  it('Should mint', async function () {
    const { mintInitialBatch } = await loadFixture(deployDeepLink1155Fixture);

    expect(await mintInitialBatch()).not.to.be.reverted;
  });

  it('Should has initial owner', async function () {
    const { deepLink, owner, mintInitialBatch } = await loadFixture(
      deployDeepLink1155Fixture
    );

    await mintInitialBatch();

    const nftOwner = await deepLink.owner();

    expect(nftOwner).to.equal(owner.address);
  });

  it('Should has element ID set', async function () {
    const { deepLink, initialTokenId, mintInitialBatch, initialElementId } =
      await loadFixture(deployDeepLink1155Fixture);

    await mintInitialBatch();

    const elementId = await deepLink.elementId(initialTokenId);

    expect(elementId).to.equal(initialElementId);
  });

  it('Should has conservation ID set', async function () {
    const {
      deepLink,
      initialTokenId,
      mintInitialBatch,
      initialConservationId,
    } = await loadFixture(deployDeepLink1155Fixture);

    await mintInitialBatch();

    const conservationId = await deepLink.conservationId(initialTokenId);

    expect(conservationId).to.equal(initialConservationId);
  });
});
