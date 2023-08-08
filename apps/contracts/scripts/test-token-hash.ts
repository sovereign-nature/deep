import { ethers } from 'hardhat';

//Asset DID spec https://github.com/KILTprotocol/spec-asset-did
const assetAddress =
  'eip155:1.erc721:0x06012c8cf97bead5deae237070f9587f8e7a266d:634446';
// const normalized = ethers.utils.nameprep(input);
// const hashed = ethers.utils.namehash(normalized);
const labelHash = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes(assetAddress)
);
const tokenId = ethers.BigNumber.from(labelHash).toString();

console.log(`Input: ${assetAddress}`);
console.log(`Label Hash: ${labelHash}`);
console.log(`Token ID: ${tokenId}`);
