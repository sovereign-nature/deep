import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import {
  DERIVATIVE_METADATA_SCHEMA,
  DERIVATIVE_METADATA_SCHEMA_DIGEST,
  INITIAL_TOKEN_URI_DIGEST,
  TOKEN_URI_SCHEMA,
  TOKEN_URI_SCHEMA_DIGEST,
  UPDATED_TOKEN_URI_DIGEST,
} from '@sni/constants/mocks/identifier';
import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Sovereign Nature Identifier', function () {
  async function deploySNIFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, oracle, otherAccount] = await ethers.getSigners();

    const SovereignNatureIdentifier = await ethers.getContractFactory(
      'SovereignNatureIdentifier'
    );
    const sni = await SovereignNatureIdentifier.deploy(
      TOKEN_URI_SCHEMA,
      TOKEN_URI_SCHEMA_DIGEST,
      DERIVATIVE_METADATA_SCHEMA,
      DERIVATIVE_METADATA_SCHEMA_DIGEST
    );

    const initialTokenId = 0;

    const initialTokenURI = 'ipfs://tokenURI-initial';
    const updatedTokenURI = 'ipfs://tokenURI-updated';

    const initialComputeURI = 'ipfs://computeURI-initial';
    const updatedComputeURI = 'ipfs://computeURI-updated';

    const initialDataURI = 'ipfs://dataURI-initial';
    const updatedDataURI = 'ipfs://dataURI-updated';

    const initialStatus = 0;
    const updatedStatus = 1;

    const mintInitial = () => {
      return sni.safeMint(
        owner.address,
        initialTokenURI,
        INITIAL_TOKEN_URI_DIGEST,
        initialDataURI,
        initialComputeURI,
        initialStatus
      );
    };

    return {
      sni,
      initialTokenId,
      initialTokenURI,
      updatedTokenURI,
      initialComputeURI,
      updatedComputeURI,
      initialDataURI,
      updatedDataURI,
      initialStatus,
      updatedStatus,
      owner,
      oracle,
      otherAccount,
      mintInitial,
      updatedTokenURIDigest: UPDATED_TOKEN_URI_DIGEST,
    };
  }

  describe('Minting', function () {
    it('Should mint', async function () {
      const { mintInitial } = await loadFixture(deploySNIFixture);

      expect(mintInitial()).not.to.be.reverted;
    });

    it('Should has initial owner', async function () {
      const { sni, owner, initialTokenId, mintInitial } = await loadFixture(
        deploySNIFixture
      );

      await mintInitial();

      const nftOwner = await sni.ownerOf(initialTokenId);

      expect(nftOwner).to.equal(owner.address);
    });

    it('Should has IPFS URI', async function () {
      const { sni, initialTokenId, initialTokenURI, mintInitial } =
        await loadFixture(deploySNIFixture);

      await mintInitial();

      expect(initialTokenURI).to.equal(await sni.tokenURI(initialTokenId));
    });

    it('Should emit TokenMinted event', async function () {
      const { sni, owner, initialTokenId, initialTokenURI, mintInitial } =
        await loadFixture(deploySNIFixture);

      await expect(mintInitial())
        .to.emit(sni, 'TokenMinted')
        .withArgs(initialTokenId, initialTokenURI, owner.address);
    });
  });

  describe('tokenURI Update', function () {
    it('Should update tokenURI', async function () {
      const {
        sni,
        initialTokenId,
        updatedTokenURI,
        updatedTokenURIDigest,
        mintInitial,
      } = await loadFixture(deploySNIFixture);

      await mintInitial();

      expect(
        await sni.setTokenURI(
          initialTokenId,
          updatedTokenURI,
          updatedTokenURIDigest
        )
      ).not.to.be.reverted;
    });

    it('Should emit TokenURISet event with correct arguments', async function () {
      const {
        sni,
        initialTokenId,
        updatedTokenURI,
        updatedTokenURIDigest,
        mintInitial,
      } = await loadFixture(deploySNIFixture);

      await mintInitial();

      await expect(
        sni.setTokenURI(initialTokenId, updatedTokenURI, updatedTokenURIDigest)
      )
        .to.emit(sni, 'TokenURISet')
        .withArgs(initialTokenId, updatedTokenURI);
    });

    it('Should return updated tokenURI', async function () {
      const {
        sni,
        initialTokenId,
        updatedTokenURI,
        updatedTokenURIDigest,
        mintInitial,
      } = await loadFixture(deploySNIFixture);

      await mintInitial();
      await sni.setTokenURI(
        initialTokenId,
        updatedTokenURI,
        updatedTokenURIDigest
      );

      expect(updatedTokenURI).to.be.equal(await sni.tokenURI(initialTokenId));
    });

    it('Only initial owner should be able to update tokenURI', async function () {
      const {
        sni,
        initialTokenId,
        updatedTokenURI,
        updatedTokenURIDigest,
        otherAccount,
        mintInitial,
      } = await loadFixture(deploySNIFixture);

      await mintInitial();
      await sni.setTokenURI(
        initialTokenId,
        updatedTokenURI,
        updatedTokenURIDigest
      );

      expect(
        sni.connect(otherAccount).setTokenURI(initialTokenId, 'test', '0x1234')
      ).to.be.reverted;
    });
  });

  describe('dataURI Update', function () {
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

  describe('coputeURI Update', function () {
    it('Should update computeURI', async function () {
      const { sni, initialTokenId, updatedComputeURI, mintInitial } =
        await loadFixture(deploySNIFixture);

      await mintInitial();

      expect(await sni.setComputeURI(initialTokenId, updatedComputeURI)).not.to
        .be.reverted;
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
});
