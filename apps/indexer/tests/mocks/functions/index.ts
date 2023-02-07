import {
  createMockedFunction,
  mockIpfsFile,
} from 'matchstick-as/assembly/index';

import { Address, BigInt, Bytes, ethereum } from '@graphprotocol/graph-ts';

import { METADATA_HASH_FUNCTION, SNI_CONTRACT_ADDRESS } from '@sni/constants';
import {
  DERIVATIVE_METADATA_SCHEMA,
  DERIVATIVE_METADATA_SCHEMA_DIGEST,
  INITIAL_COMPUTE_URI,
  INITIAL_DATA_URI,
  INITIAL_STATUS,
  INITIAL_TOKEN_URI,
  INITIAL_TOKEN_URI_DIGEST,
  TOKEN_URI_SCHEMA,
  TOKEN_URI_SCHEMA_DIGEST,
  UPDATED_TOKEN_URI,
} from '@sni/constants/mocks/identifier';

// eslint-disable-next-line @typescript-eslint/ban-types
export function mockForToken(tokenId: BigInt): void {
  const contract = Address.fromString(SNI_CONTRACT_ADDRESS);
  const tokenIdParam = ethereum.Value.fromUnsignedBigInt(tokenId);

  createMockedFunction(contract, 'statusOf', 'statusOf(uint256):(uint256)')
    .withArgs([tokenIdParam])
    .returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(INITIAL_STATUS)),
    ]);

  createMockedFunction(contract, 'tokenURI', 'tokenURI(uint256):(string)')
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(INITIAL_TOKEN_URI)]);

  createMockedFunction(
    contract,
    'tokenURIIntegrity',
    'tokenURIIntegrity(uint256):(bytes,string)'
  )
    .withArgs([tokenIdParam])
    .returns([
      ethereum.Value.fromBytes(Bytes.fromHexString(INITIAL_TOKEN_URI_DIGEST)),
      ethereum.Value.fromString(METADATA_HASH_FUNCTION),
    ]);

  createMockedFunction(
    contract,
    'tokenURISchema',
    'tokenURISchema():(string)'
  ).returns([ethereum.Value.fromString(TOKEN_URI_SCHEMA)]);

  createMockedFunction(
    contract,
    'tokenURISchemaIntegrity',
    'tokenURISchemaIntegrity():(bytes,string)'
  ).returns([
    ethereum.Value.fromBytes(Bytes.fromHexString(TOKEN_URI_SCHEMA_DIGEST)),
    ethereum.Value.fromString(METADATA_HASH_FUNCTION),
  ]);

  createMockedFunction(
    contract,
    'derivativeMetadataSchemaURI',
    'derivativeMetadataSchemaURI():(string)'
  ).returns([ethereum.Value.fromString(DERIVATIVE_METADATA_SCHEMA)]);

  createMockedFunction(
    contract,
    'derivativeMetadataSchemaIntegrity',
    'derivativeMetadataSchemaIntegrity():(bytes,string)'
  ).returns([
    ethereum.Value.fromBytes(
      Bytes.fromHexString(DERIVATIVE_METADATA_SCHEMA_DIGEST)
    ),
    ethereum.Value.fromString(METADATA_HASH_FUNCTION),
  ]);

  createMockedFunction(contract, 'dataURI', 'dataURI(uint256):(string)')
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(INITIAL_DATA_URI)]);

  createMockedFunction(contract, 'computeURI', 'computeURI(uint256):(string)')
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(INITIAL_COMPUTE_URI)]);

  //Initial IPFS Metadata
  mockIpfsFile(
    INITIAL_TOKEN_URI.replace('ipfs://', ''),
    'tests/ipfs/initial.json'
  );

  //Updated IPFS Metadata
  mockIpfsFile(
    UPDATED_TOKEN_URI.replace('ipfs://', ''),
    'tests/ipfs/updated.json'
  );
}
