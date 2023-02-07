import fs from 'fs';
import { ethers } from 'hardhat';
import { pinData } from './utils';

async function main() {
  const SovereignNatureIdentifier = await ethers.getContractFactory(
    'SovereignNatureIdentifier'
  );

  const schemaJson = fs.readFileSync(
    '../../../../packages/schemas/kwt-lion.json'
  );
  const schemaHash = ethers.utils.sha256(schemaJson.toString());

  const schemaURI = `ipfs://${
    (await pinData(schemaJson.toString())).data.value.cid
  }`;

  const sni = await SovereignNatureIdentifier.deploy(
    schemaURI,
    schemaHash,
    schemaURI,
    schemaHash
  );
  await sni.deployed();

  console.log(`SNI contract was deployed to ${sni.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
