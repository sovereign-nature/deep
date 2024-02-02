import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { CONSERVATION_IDS, ELEMENT_IDS } from '@sni/constants/mocks/deep-link';
import { expect } from 'chai';
import {
  deployDeepLink1155BatchFixture,
  deployDeepLink1155SingleFixture,
} from './fixtures';

const tests = [
  { mintingType: 'single', fixture: deployDeepLink1155SingleFixture },
  { mintingType: 'batch', fixture: deployDeepLink1155BatchFixture },
];

describe('DeepLink1155 Token Minting', function () {
  tests.forEach(({ mintingType, fixture }) => {
    it(`Should mint ${mintingType}`, async function () {
      const { mintInitial } = await loadFixture(fixture);

      expect(await mintInitial()).not.to.be.reverted;
    });

    it(`Should has initial owner when minting ${mintingType}`, async function () {
      const { deepLink, owner, mintInitial } = await loadFixture(fixture);

      await mintInitial();

      const nftOwner = await deepLink.owner();

      expect(nftOwner).to.equal(owner.address);
    });

    it(`Should has element ID set when minting ${mintingType}`, async function () {
      const { deepLink, initialTokenId, mintInitial, initialElementId } =
        await loadFixture(fixture);

      await mintInitial();

      const elementId = await deepLink.elementId(initialTokenId);

      expect(elementId).to.equal(initialElementId);
    });

    it(`Should has conservation ID set when minting ${mintingType}`, async function () {
      const { deepLink, initialTokenId, mintInitial, initialConservationId } =
        await loadFixture(fixture);

      await mintInitial();

      const conservationId = await deepLink.conservationId(initialTokenId);

      expect(conservationId).to.equal(initialConservationId);
    });
  });
});

describe('DeepLink1155 Batch Data Verification', function () {
  it(`Should has all element IDs set when minting batch`, async function () {
    const { deepLink, mintInitial } = await loadFixture(
      deployDeepLink1155BatchFixture
    );

    await mintInitial();

    for (let i = 0; i < ELEMENT_IDS.length; i++) {
      const elementId = await deepLink.elementId(i);

      expect(elementId).to.equal(ELEMENT_IDS[i]);
    }
  });

  it(`Should has all conservation IDs set when minting batch`, async function () {
    const { deepLink, mintInitial } = await loadFixture(
      deployDeepLink1155BatchFixture
    );

    await mintInitial();

    for (let i = 0; i < CONSERVATION_IDS.length; i++) {
      const conservationId = await deepLink.conservationId(i);

      expect(conservationId).to.equal(CONSERVATION_IDS[i]);
    }
  });
});
