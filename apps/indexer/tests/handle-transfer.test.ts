import { assert, describe, test } from 'matchstick-as/assembly/index';

import { Address, BigInt } from '@graphprotocol/graph-ts';

import { handleTransfer } from '../src/deep-link';

import { SUBGRAPH_ENTITY_NAME } from '../../../packages/constants';

import {
  CONSERVATION_ID,
  ELEMENT_ID,
  INITIAL_TOKEN_ID,
  MINTER_ADDRESS,
  NAME,
  OWNER_ADDRESS,
  SYMBOL,
  TOKEN_URI,
} from '../../../packages/constants/mocks/deep-link';
import { createTransferEvent } from './events-mocks';
import { mockForToken } from './mocks/functions';

//MOCKED CONSTANTS
const INITIAL_TOKEN_ID_INT = BigInt.fromI32(INITIAL_TOKEN_ID);
const MINTER = Address.fromString(MINTER_ADDRESS);
const OWNER = Address.fromString(OWNER_ADDRESS);

describe('Handles Transfer event', () => {
  test('Correct state after event handling', () => {
    mockForToken(INITIAL_TOKEN_ID_INT);

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

    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenId, 'name', NAME);
    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenId, 'symbol', SYMBOL);

    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenId, 'elementId', ELEMENT_ID);
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'conservationId',
      CONSERVATION_ID
    );

    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenId, 'tokenURI', TOKEN_URI);
  });
});
