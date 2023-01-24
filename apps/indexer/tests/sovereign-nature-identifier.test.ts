/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  assert,
  beforeAll,
  createMockedFunction,
  describe,
  mockIpfsFile,
  test,
} from 'matchstick-as/assembly/index';

import { Address, BigInt, ethereum, store } from '@graphprotocol/graph-ts';

import {
  handleStatusSet,
  handleTokenURISet,
  handleTransfer,
} from '../src/sovereign-nature-identifier';
import {
  createStatusSetEvent,
  createTokenURISetEvent,
  createTransferEvent,
} from './sovereign-nature-identifier-utils';

import { SNI_CONTRACT_ADDRESS, SUBGRAPH_ENTITY_NAME } from '@sni/constants';
import {
  INITIAL_COMPUTE_URI,
  INITIAL_DATA_URI,
  INITIAL_TOKEN_URI,
  UPDATED_TOKEN_URI,
} from '@sni/constants/mocks/identifier';

const TOKEN_ID = BigInt.fromI32(0);
const TEMP_TOKEN_ID = BigInt.fromI32(99);
const MINTER = Address.fromString('0x0000000000000000000000000000000000000000');
const OWNER = Address.fromString('0x0000000000000000000000000000000000000001');
const OWNER_2 = Address.fromString(
  '0x0000000000000000000000000000000000000002'
);
const CONTRACT = Address.fromString(SNI_CONTRACT_ADDRESS);
const INITIAL_STATUS = BigInt.fromI32(0);
const NEW_STATUS = BigInt.fromI32(1);

// eslint-disable-next-line @typescript-eslint/ban-types
function mockForToken(id: BigInt): void {
  const tokenIdParam = ethereum.Value.fromUnsignedBigInt(id);

  createMockedFunction(CONTRACT, 'statusOf', 'statusOf(uint256):(uint256)') //@ts-ignore
    .withArgs([tokenIdParam]) //@ts-ignore
    .returns([ethereum.Value.fromUnsignedBigInt(INITIAL_STATUS)]);

  createMockedFunction(CONTRACT, 'tokenURI', 'tokenURI(uint256):(string)') //@ts-ignore
    .withArgs([tokenIdParam]) //@ts-ignore
    .returns([ethereum.Value.fromString(INITIAL_TOKEN_URI)]);

  createMockedFunction(CONTRACT, 'dataURI', 'dataURI(uint256):(string)') //@ts-ignore
    .withArgs([tokenIdParam]) //@ts-ignore
    .returns([ethereum.Value.fromString(INITIAL_DATA_URI)]);

  createMockedFunction(CONTRACT, 'computeURI', 'computeURI(uint256):(string)') //@ts-ignore
    .withArgs([tokenIdParam]) //@ts-ignore
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
    mockForToken(TOKEN_ID);

    const transferEvent = createTransferEvent(MINTER, OWNER, TOKEN_ID);
    handleTransfer(transferEvent);
  });

  test('Sets createdAt on entity', () => {
    const tokenId = TEMP_TOKEN_ID;
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
    const transferEvent = createTransferEvent(OWNER, OWNER_2, TOKEN_ID);
    handleTransfer(transferEvent);

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      TOKEN_ID.toHex(),
      'updatedAt',
      transferEvent.block.timestamp.toString()
    );
  });

  test('Handles Transfer event', () => {
    const transferEvent = createTransferEvent(MINTER, OWNER, TOKEN_ID);
    handleTransfer(transferEvent);

    const tokenId = TOKEN_ID.toHex();

    // Base fields
    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenId, 'owner', OWNER.toHex());
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'tokenId',
      TOKEN_ID.toString()
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
      TOKEN_ID,
      UPDATED_TOKEN_URI
    );
    handleTokenURISet(tokenURISetEvent);

    const tokenId = TOKEN_ID.toHex();

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

  test('Handles StatusSet event', () => {
    const statusSetEvent = createStatusSetEvent(TOKEN_ID, NEW_STATUS);
    handleStatusSet(statusSetEvent);

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      TOKEN_ID.toHex(),
      'status',
      NEW_STATUS.toString()
    );
  });
});
