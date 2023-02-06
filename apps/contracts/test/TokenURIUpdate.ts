import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { deploySNIFixture } from './fixtures';

describe('Token URI updates', function () {
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

  it('Should return updated tokenURIDigest', async function () {
    const {
      sni,
      initialTokenId,
      updatedTokenURI,
      updatedTokenURIDigest,
      mintInitial,
      hashAlgorithm,
    } = await loadFixture(deploySNIFixture);

    await mintInitial();
    await sni.setTokenURI(
      initialTokenId,
      updatedTokenURI,
      updatedTokenURIDigest
    );

    expect([updatedTokenURIDigest, hashAlgorithm]).to.be.deep.equal(
      await sni.tokenURIIntegrity(initialTokenId)
    );
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
