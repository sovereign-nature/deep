import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { deploySNIFixture } from './fixtures';

describe('Token Minting', function () {
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

  it('Should has token metadata URI set', async function () {
    const { sni, initialTokenId, initialTokenURI, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();

    expect(initialTokenURI).to.equal(await sni.tokenURI(initialTokenId));
  });

  it('Should has token metadata integrity set', async function () {
    const {
      sni,
      initialTokenURIDigest,
      hashAlgorithm,
      mintInitial,
      initialTokenId,
    } = await loadFixture(deploySNIFixture);

    await mintInitial();

    expect([initialTokenURIDigest, hashAlgorithm]).to.be.deep.equal(
      await sni.tokenURIIntegrity(initialTokenId)
    );
  });

  it('Should has metadata schema URI set', async function () {
    const { sni, tokenURISchema, mintInitial } = await loadFixture(
      deploySNIFixture
    );

    await mintInitial();

    expect(tokenURISchema).to.equal(await sni.tokenURISchema());
  });

  it('Should has metadata schema integrity set', async function () {
    const { sni, tokenURISchemaDigest, hashAlgorithm, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();

    expect([tokenURISchemaDigest, hashAlgorithm]).to.be.deep.equal(
      await sni.tokenURISchemaIntegrity()
    );
  });

  it('Should has derivative metadata schema URI set', async function () {
    const { sni, derivativeMetadataSchemaURI, mintInitial } = await loadFixture(
      deploySNIFixture
    );

    await mintInitial();

    expect(derivativeMetadataSchemaURI).to.equal(
      await sni.derivativeMetadataSchemaURI()
    );
  });

  it('Should has derivative metadata schema integrity set', async function () {
    const { sni, derivativeMetadataSchemaDigest, hashAlgorithm, mintInitial } =
      await loadFixture(deploySNIFixture);

    await mintInitial();

    expect([derivativeMetadataSchemaDigest, hashAlgorithm]).to.be.deep.equal(
      await sni.derivativeMetadataSchemaIntegrity()
    );
  });

  it('Should emit TokenMinted event', async function () {
    const { sni, owner, initialTokenId, initialTokenURI, mintInitial } =
      await loadFixture(deploySNIFixture);

    await expect(mintInitial())
      .to.emit(sni, 'TokenMinted')
      .withArgs(initialTokenId, initialTokenURI, owner.address);
  });
});
