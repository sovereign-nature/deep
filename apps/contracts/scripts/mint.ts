import { ethers } from 'hardhat'
import { NFTStorage } from 'nft.storage'
import fetch from '@web-std/fetch'
import { SNI_CONTRACT_ADDRESS, SNI_OWNER_ADDRESS } from '@sni/constants'

async function getTestImage() {
  const imageOriginUrl =
    'https://upload.wikimedia.org/wikipedia/commons/5/54/A_Lion%27s_Head.jpg'
  const r = await fetch(imageOriginUrl)

  if (!r.ok) {
    throw new Error(`error fetching image`)
  }
  return r.blob()
}

async function main() {
  const SovereignNatureIdentifier = await ethers.getContractFactory(
    'SovereignNatureIdentifier'
  )

  const sni = SovereignNatureIdentifier.attach(SNI_CONTRACT_ADDRESS)

  const storageClient = new NFTStorage({
    token:
      process.env.NFT_STORAGE_API_KEY !== undefined
        ? process.env.NFT_STORAGE_API_KEY
        : ''
  })

  const image = await getTestImage()

  const nft = {
    image,
    name: 'Sovereign Nature Identifier #N',
    description: 'Test lion identifier',
    properties: {
      statusDescription: {
        0: 'Normal',
        1: 'Aggressive'
      },
      taxonId: 'itis:183803',
      conservationStatus: 'VU',
      geometry: 'POINT(5.9559 47.8084)'
    }
  }

  const metadata = await storageClient.store(nft)

  const result = await sni.safeMint(SNI_OWNER_ADDRESS, metadata.url)

  console.log(`Successfully minted with transaction hash ${result.hash}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
