/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  assert,
  beforeAll,
  describe,
  test,
} from 'matchstick-as/assembly/index';

import { Address, BigInt, store } from '@graphprotocol/graph-ts';

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

import { SUBGRAPH_ENTITY_NAME } from '@sni/constants';

//TODO: Refactor constants to object
//TODO: Add URI postfix to mocked URIs
import {
  INITIAL_TOKEN_ID,
  MINTER_ADDRESS,
  OWNER_ADDRESS,
  SECOND_OWNER_ADDRESS,
  TEMP_TOKEN_ID,
  UPDATED_COMPUTE_URI,
  UPDATED_DATA_URI,
  UPDATED_STATUS,
  UPDATED_TOKEN_URI,
} from '@sni/constants/mocks/identifier';
import { mockForToken } from './mocks';

const INITIAL_TOKEN_ID_INT = BigInt.fromI32(INITIAL_TOKEN_ID);

const MINTER = Address.fromString(MINTER_ADDRESS);
const OWNER = Address.fromString(OWNER_ADDRESS);

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
