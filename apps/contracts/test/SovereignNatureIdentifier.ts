import { expect } from 'chai'
import { ethers } from 'hardhat'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

describe('Sovereign Nature Identifier', function() {
  async function deploySNIFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, oracle, otherAccount] = await ethers.getSigners()

    const SovereignNatureIdentifier = await ethers.getContractFactory(
      'SovereignNatureIdentifier'
    )
    const sni = await SovereignNatureIdentifier.deploy()

    const initialTokenId = 0

    const initialURI = 'ipfs://initial'
    const updatedURI = 'ipfs://updated'

    const updatedStatus = 2

    return {
      sni,
      initialTokenId,
      initialURI,
      updatedURI,
      updatedStatus,
      owner,
      oracle,
      otherAccount
    }
  }

  describe('Minting', function() {
    it('Should mint', async function() {
      const { sni, owner, initialURI } = await loadFixture(deploySNIFixture)

      expect(sni.safeMint(owner.address, initialURI)).not.to.be.reverted
    })

    it('Should has initial owner', async function() {
      const { sni, owner, initialTokenId, initialURI } = await loadFixture(
        deploySNIFixture
      )
      await sni.safeMint(owner.address, initialURI)

      const nftOwner = await sni.ownerOf(initialTokenId)

      expect(nftOwner).to.equal(owner.address)
    })

    it('Should has IPFS URI', async function() {
      const { sni, owner, initialTokenId, initialURI } = await loadFixture(
        deploySNIFixture
      )

      await sni.safeMint(owner.address, initialURI)

      expect(initialURI).to.equal(await sni.tokenURI(initialTokenId))
    })

    it('Should emit TokenMinted event', async function() {
      const { sni, owner, initialTokenId, initialURI } = await loadFixture(
        deploySNIFixture
      )

      await expect(sni.safeMint(owner.address, initialURI))
        .to.emit(sni, 'TokenMinted')
        .withArgs(initialTokenId, initialURI, owner.address)
    })
  })

  describe('tokenURI Update', function() {
    it('Should update tokenURI', async function() {
      const {
        sni,
        owner,
        initialTokenId,
        initialURI,
        updatedURI
      } = await loadFixture(deploySNIFixture)

      await sni.safeMint(owner.address, initialURI)

      expect(await sni.setTokenURI(initialTokenId, updatedURI)).not.to.be
        .reverted
    })

    it('Should emit TokenURISet event with correct arguments', async function() {
      const {
        sni,
        owner,
        initialTokenId,
        initialURI,
        updatedURI
      } = await loadFixture(deploySNIFixture)

      await sni.safeMint(owner.address, initialURI)

      await expect(sni.setTokenURI(initialTokenId, updatedURI))
        .to.emit(sni, 'TokenURISet')
        .withArgs(initialTokenId, updatedURI)
    })

    it('Should return updated tokenURI', async function() {
      const {
        sni,
        owner,
        initialTokenId,
        initialURI,
        updatedURI
      } = await loadFixture(deploySNIFixture)

      await sni.safeMint(owner.address, initialURI)
      await sni.setTokenURI(initialTokenId, updatedURI)

      expect(updatedURI).to.be.equal(await sni.tokenURI(initialTokenId))
    })

    it('Only initial owner should be able to update tokenURI', async function() {
      const {
        sni,
        owner,
        initialTokenId,
        initialURI,
        updatedURI,
        otherAccount
      } = await loadFixture(deploySNIFixture)

      await sni.safeMint(owner.address, initialURI)
      await sni.setTokenURI(initialTokenId, updatedURI)

      expect(sni.connect(otherAccount).setTokenURI(initialTokenId, 'test')).to
        .be.reverted
    })
  })

  describe('Status Update', function() {
    it('Should update status', async function() {
      const {
        sni,
        owner,
        initialURI,
        initialTokenId,
        updatedStatus
      } = await loadFixture(deploySNIFixture)

      await sni.safeMint(owner.address, initialURI)

      expect(sni.setStatus(initialTokenId, updatedStatus)).to.be.not.reverted
    })

    it('Should emit StatusSet event with correct arguments', async function() {
      const {
        sni,
        owner,
        initialTokenId,
        initialURI,
        updatedStatus
      } = await loadFixture(deploySNIFixture)

      await sni.safeMint(owner.address, initialURI)

      await expect(sni.setStatus(initialTokenId, updatedStatus))
        .to.emit(sni, 'StatusSet')
        .withArgs(initialTokenId, updatedStatus)
    })

    it('Should return updated status', async function() {
      const {
        sni,
        owner,
        initialTokenId,
        initialURI,
        updatedStatus
      } = await loadFixture(deploySNIFixture)

      await sni.safeMint(owner.address, initialURI)
      await sni.setStatus(initialTokenId, updatedStatus)

      expect(updatedStatus).to.be.equal(await sni.statusOf(initialTokenId))
    })

    it('Only initial oracle should be able to update status', async function() {
      const {
        sni,
        owner,
        initialTokenId,
        initialURI,
        updatedStatus,
        otherAccount
      } = await loadFixture(deploySNIFixture)

      await sni.safeMint(owner.address, initialURI)
      await sni.setStatus(initialTokenId, updatedStatus)

      expect(sni.connect(otherAccount).setStatus(initialTokenId, updatedStatus))
        .to.be.reverted
    })

    // TODO: Test if we can grant oracle
  })
})
