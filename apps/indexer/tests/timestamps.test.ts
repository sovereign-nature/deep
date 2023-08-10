/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  assert,
  beforeAll,
  describe,
  test,
} from 'matchstick-as/assembly/index';

import { Address, BigInt, store } from '@graphprotocol/graph-ts';

import { handleTransfer } from '../src/deep-link';
import { createTransferEvent } from './events-mocks';

import { SUBGRAPH_ENTITY_NAME } from '../../../packages/constants';

//TODO: Refactor constants to object
import {
  INITIAL_TOKEN_ID,
  MINTER_ADDRESS,
  OWNER_ADDRESS,
  SECOND_OWNER_ADDRESS,
  TEMP_TOKEN_ID,
} from '../../../packages/constants/mocks/deep-link';
import { mockForToken } from './mocks/functions';

const INITIAL_TOKEN_ID_INT = BigInt.fromI32(INITIAL_TOKEN_ID);

const MINTER = Address.fromString(MINTER_ADDRESS);
const OWNER = Address.fromString(OWNER_ADDRESS);

describe('Handles timestamps properly', () => {
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

  //TODO: updatedAt is equal to createdAt on first transfer
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
});
