import { ethers } from 'hardhat';

async function main() {
  const SovereignNatureIdentifier = await ethers.getContractFactory(
    'SovereignNatureIdentifier'
  );

  const sni = await SovereignNatureIdentifier.deploy();
  await sni.deployed();

  console.log(`SNI contract was deployed to ${sni.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
