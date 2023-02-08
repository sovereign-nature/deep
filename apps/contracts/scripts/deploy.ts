import fs from 'fs';
import { ethers } from 'hardhat';
import { makeIpfsUrl, pinData } from './utils';

async function main() {
  const SovereignNatureIdentifier = await ethers.getContractFactory(
    'SovereignNatureIdentifier'
  );

  const schemaJson = fs.readFileSync(
    '../../packages/json-schemas/schemas/kwt-lion.json'
  );

  const schemaHash = ethers.utils.id(schemaJson.toString());

  const schemaURI = makeIpfsUrl(
    (await pinData(schemaJson.toString())).data.value.cid
  );

  console.log(`Schema URI: ${schemaURI}`);

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
