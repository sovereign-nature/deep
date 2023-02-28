import { ethers } from 'hardhat';

async function main() {
  const SampleContract = await ethers.getContractFactory('Sample');
  const sample = await SampleContract.deploy();

  await sample.deployed();

  console.log('Deployed Sample collection to: ', sample.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
