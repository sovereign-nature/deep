import { ethers } from 'hardhat'

async function main() {
  const SovereignNatureIdentifier = await ethers.getContractFactory(
    'SovereignNatureIdentifier'
  )

  const sni = SovereignNatureIdentifier.attach(
    process.env.LATEST_ADDRESS as string
  )

  const result = await sni.safeMint(
    process.env.OWNER_ADDRESS as string,
    'testURI'
  )

  console.log(`Successfully minted with transaction hash ${result.hash}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
