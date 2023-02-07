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
  handleTransfer,
} from '../src/sovereign-nature-identifier';
import {
  createComputeURISetEvent,
  createDataURISetEvent,
  createStatusSetEvent,
  createTransferEvent,
} from './events-mocks';

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
} from '@sni/constants/mocks/identifier';
import { mockForToken } from './mocks/functions';

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
