import { ethers } from 'hardhat'

async function main() {
  const SovereignNatureIdentifier = await ethers.getContractFactory(
    'SovereignNatureIdentifier'
  )

  const sni = SovereignNatureIdentifier.attach(
    process.env.LATEST_ADDRESS as string
  )

  const tokenID = 0
  const status = await sni.statusOf(0)

  console.log(`Status of token with ID ${tokenID} is ${status}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
