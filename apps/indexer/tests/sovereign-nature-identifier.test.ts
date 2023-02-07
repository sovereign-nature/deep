/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  assert,
  beforeAll,
  createMockedFunction,
  describe,
  mockIpfsFile,
  test,
} from 'matchstick-as/assembly/index';

import {
  Address,
  BigInt,
  Bytes,
  ethereum,
  store,
} from '@graphprotocol/graph-ts';

import {
  handleComputeURISet,
  handleDataURISet,
  handleStatusSet,
  handleTokenURISet,
  handleTransfer,
} from '../src/sovereign-nature-identifier';
import {
  createComputeURISetEvent,
  createDataURISetEvent,
  createStatusSetEvent,
  createTokenURISetEvent,
  createTransferEvent,
} from './sovereign-nature-identifier-utils';

import {
  METADATA_HASH_FUNCTION,
  SNI_CONTRACT_ADDRESS,
  SUBGRAPH_ENTITY_NAME,
} from '@sni/constants';

//TODO: Refactor constants to object
import {
  DERIVATIVE_METADATA_SCHEMA_DIGEST,
  INITIAL_COMPUTE_URI,
  INITIAL_DATA_URI,
  INITIAL_STATUS,
  INITIAL_TOKEN_ID,
  INITIAL_TOKEN_URI,
  MINTER_ADDRESS,
  OWNER_ADDRESS,
  SECOND_OWNER_ADDRESS,
  TEMP_TOKEN_ID,
  TOKEN_URI_SCHEMA,
  TOKEN_URI_SCHEMA_DIGEST,
  UPDATED_COMPUTE_URI,
  UPDATED_DATA_URI,
  UPDATED_STATUS,
  UPDATED_TOKEN_URI,
} from '@sni/constants/mocks/identifier';

const INITIAL_TOKEN_ID_INT = BigInt.fromI32(INITIAL_TOKEN_ID);

const MINTER = Address.fromString(MINTER_ADDRESS);
const OWNER = Address.fromString(OWNER_ADDRESS);

const CONTRACT = Address.fromString(SNI_CONTRACT_ADDRESS);

// eslint-disable-next-line @typescript-eslint/ban-types
function mockForToken(id: BigInt): void {
  const tokenIdParam = ethereum.Value.fromUnsignedBigInt(id);

  createMockedFunction(CONTRACT, 'statusOf', 'statusOf(uint256):(uint256)')
    .withArgs([tokenIdParam])
    .returns([
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(INITIAL_STATUS)),
    ]);

  createMockedFunction(CONTRACT, 'tokenURI', 'tokenURI(uint256):(string)')
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(INITIAL_TOKEN_URI)]);

  createMockedFunction(
    CONTRACT,
    'tokenURIIntegrity',
    'tokenURIIntegrity(uint256):(bytes,string)'
  )
    .withArgs([tokenIdParam])
    .returns([
      ethereum.Value.fromBytes(Bytes.fromHexString(TOKEN_URI_SCHEMA_DIGEST)),
      ethereum.Value.fromString(METADATA_HASH_FUNCTION),
    ]);

  createMockedFunction(
    CONTRACT,
    'tokenURISchema',
    'tokenURISchema():(string)'
  ).returns([ethereum.Value.fromString(TOKEN_URI_SCHEMA)]);

  createMockedFunction(
    CONTRACT,
    'tokenURISchemaIntegrity',
    'tokenURISchemaIntegrity():(bytes,string)'
  ).returns([
    ethereum.Value.fromBytes(Bytes.fromHexString(TOKEN_URI_SCHEMA_DIGEST)),
    ethereum.Value.fromString(METADATA_HASH_FUNCTION),
  ]);

  createMockedFunction(
    CONTRACT,
    'derivativeMetadataSchemaURI',
    'derivativeMetadataSchemaURI():(string)'
  ).returns([ethereum.Value.fromString(TOKEN_URI_SCHEMA)]);

  createMockedFunction(
    CONTRACT,
    'derivativeMetadataSchemaIntegrity',
    'derivativeMetadataSchemaIntegrity():(bytes,string)'
  ).returns([
    ethereum.Value.fromBytes(
      Bytes.fromHexString(DERIVATIVE_METADATA_SCHEMA_DIGEST)
    ),
    ethereum.Value.fromString(METADATA_HASH_FUNCTION),
  ]);

  createMockedFunction(CONTRACT, 'dataURI', 'dataURI(uint256):(string)')
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(INITIAL_DATA_URI)]);

  createMockedFunction(CONTRACT, 'computeURI', 'computeURI(uint256):(string)')
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

describe('SNI Indexer', () => {
  beforeAll(() => {
    mockForToken(INITIAL_TOKEN_ID_INT);

    const transferEvent = createTransferEvent(
      MINTER,
      OWNER,
      INITIAL_TOKEN_ID_INT
    );
    handleTransfer(transferEvent);
  });

  test('Sets createdAt on entity', () => {
    const tokenId = BigInt.fromI32(TEMP_TOKEN_ID);
    mockForToken(tokenId);

    const transferEvent = createTransferEvent(MINTER, OWNER, tokenId);
    handleTransfer(transferEvent);

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId.toHex(),
      'createdAt',
      transferEvent.block.timestamp.toString()
    );

    store.remove(SUBGRAPH_ENTITY_NAME, tokenId.toHex());
  });

  test('Sets updatedAt on entity', () => {
    const transferEvent = createTransferEvent(
      OWNER,
      Address.fromString(SECOND_OWNER_ADDRESS),
      INITIAL_TOKEN_ID_INT
    );
    handleTransfer(transferEvent);

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      INITIAL_TOKEN_ID_INT.toHex(),
      'updatedAt',
      transferEvent.block.timestamp.toString()
    );
  });

  test('Handles Transfer event', () => {
    const transferEvent = createTransferEvent(
      MINTER,
      OWNER,
      INITIAL_TOKEN_ID_INT
    );
    handleTransfer(transferEvent);

    const tokenId = INITIAL_TOKEN_ID_INT.toHex();

    // Base fields
    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenId, 'owner', OWNER.toHex());
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'tokenId',
      INITIAL_TOKEN_ID_INT.toString()
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'tokenURI',
      INITIAL_TOKEN_URI
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'dataURI',
      INITIAL_DATA_URI
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'computeURI',
      INITIAL_COMPUTE_URI
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'status',
      INITIAL_STATUS.toString()
    );

    // JSON metadata fields from initial.json
    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenId, 'name', 'Scarface');
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'description',
      'Test lion identifier'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'image',
      'ipfs://bafybeihs6qouvmo4pnjozlrdmgic3b4nav6rrswc3tobgclrrvtwsa47oe/blob'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'statusDescription',
      '{ "0": "Alive", "1": "Dead" }'
    );
    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenId, 'taxonId', 'itis:183803');
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'conservationStatus',
      'VU'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'geometry',
      'POINT(5.9559 47.8084)'
    );
  });

  test('Handles TokenURISet event', () => {
    const tokenURISetEvent = createTokenURISetEvent(
      INITIAL_TOKEN_ID_INT,
      UPDATED_TOKEN_URI
    );
    handleTokenURISet(tokenURISetEvent);

    const tokenId = INITIAL_TOKEN_ID_INT.toHex();

    // Base fields that were updated via setter.
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'tokenURI',
      UPDATED_TOKEN_URI
    );

    // JSON metadata fields from updated.json should be indexed as well.
    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenId, 'name', 'Scarface');
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'description',
      'Test lion identifier updated'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'image',
      'ipfs://bafybeihs6qouvmo4pnjozlrdmgic3b4nav6rrswc3tobgclrrvtwsa47oe/blob'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'statusDescription',
      '{ "0": "Alive", "1": "Dead" }'
    );
    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenId, 'taxonId', 'itis:183803');
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'conservationStatus',
      'VU'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'geometry',
      'POINT(6.0000 48.0000)'
    );
  });

  test('Handles DataURISet event', () => {
    const dataURISetEvent = createDataURISetEvent(
      INITIAL_TOKEN_ID_INT,
      UPDATED_DATA_URI
    );
    handleDataURISet(dataURISetEvent);

    const tokenId = INITIAL_TOKEN_ID_INT.toHex();

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'dataURI',
      UPDATED_DATA_URI
    );
  });

  test('Handles ComputeURISet event', () => {
    const computeURISetEvent = createComputeURISetEvent(
      INITIAL_TOKEN_ID_INT,
      UPDATED_COMPUTE_URI
    );
    handleComputeURISet(computeURISetEvent);

    const tokenId = INITIAL_TOKEN_ID_INT.toHex();

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'computeURI',
      UPDATED_COMPUTE_URI
    );
  });

  test('Handles StatusSet event', () => {
    const newStatus = BigInt.fromI32(UPDATED_STATUS);
    const statusSetEvent = createStatusSetEvent(
      INITIAL_TOKEN_ID_INT,
      newStatus
    );
    handleStatusSet(statusSetEvent);

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      INITIAL_TOKEN_ID_INT.toHex(),
      'status',
      newStatus.toString()
    );
  });
});
