import { SAMPLE_COLLECTION_ADDRESS, SNI_OWNER_ADDRESS } from '@sni/constants';
import { ethers } from 'hardhat';

async function main() {
  const SampleContract = await ethers.getContractFactory('Sample');
  const contract = SampleContract.attach(SAMPLE_COLLECTION_ADDRESS);

  for (let i = 0; i < 2; i++) {
    await contract.safeMint(SNI_OWNER_ADDRESS);
    console.log('Minted sample');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
