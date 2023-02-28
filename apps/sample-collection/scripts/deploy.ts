import { ethers } from 'hardhat';

async function main() {
  const SampleContract = await ethers.getContractFactory('Sample');
  const sample = await SampleContract.deploy();

  await sample.deployed();

  console.log('Deployed Sample collection to: ', sample.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
