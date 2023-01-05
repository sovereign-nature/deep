import { SNI_CONTRACT_ADDRESS } from '@sni/constants';
import { ethers } from 'hardhat';

async function main() {
  const SovereignNatureIdentifier = await ethers.getContractFactory(
    'SovereignNatureIdentifier'
  );

  const sni = SovereignNatureIdentifier.attach(SNI_CONTRACT_ADDRESS);

  const tokenID = 2;
  const status = await sni.statusOf(tokenID);

  console.log(`Status of token with ID ${tokenID} is ${status}`);

  const tokenURI = await sni.tokenURI(tokenID);

  console.log(tokenURI);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
