//Based on:
//https://docs.ens.domains/contract-api-reference/name-processing#namehash

import { ethers } from 'hardhat';

//Asset DID spec https://github.com/KILTprotocol/spec-asset-did
const assetAddress = 'did:asset:deep:polkadot.asset-hub:u-8:262';
// const normalized = ethers.utils.nameprep(input);
// const hashed = ethers.utils.namehash(normalized);

const labelHash = ethers.keccak256(ethers.toUtf8Bytes(assetAddress));
const tokenId = BigInt(labelHash).toString();

console.log(`Input: ${assetAddress}`);
console.log(`Label Hash: ${labelHash}`);
console.log(`Token ID: ${tokenId}`);
