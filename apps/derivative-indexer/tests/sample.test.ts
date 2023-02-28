import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  INITIAL_TOKEN_ID,
  MINTER_ADDRESS,
  OWNER_ADDRESS,
} from '@sni/constants/mocks/identifier';
import {
  BASE_URI,
  IDENTIFIER_ADDRESS,
} from '@sni/constants/mocks/sampleCollection';
import {
  afterAll,
  assert,
  beforeAll,
  clearStore,
  describe,
  test,
} from 'matchstick-as/assembly/index';
import { handleTransfer } from '../src/sample';
import { mockForToken } from './mocks/functions';
import { createTransferEvent } from './sample-utils';

const INITIAL_TOKEN_ID_INT = BigInt.fromI32(INITIAL_TOKEN_ID);
const MINTER = Address.fromString(MINTER_ADDRESS);
const OWNER = Address.fromString(OWNER_ADDRESS);

describe('Describe entity assertions', () => {
  beforeAll(() => {
    mockForToken(INITIAL_TOKEN_ID_INT);

    const newTransferEvent = createTransferEvent(
      MINTER,
      OWNER,
      INITIAL_TOKEN_ID_INT
    );
    handleTransfer(newTransferEvent);
  });

  afterAll(() => {
    clearStore();
  });

  test('Transfer event handled', () => {
    const entityName = 'Derivative';
    const entityId = INITIAL_TOKEN_ID_INT.toHex();

    assert.entityCount(entityName, 1);

    assert.fieldEquals(entityName, entityId, 'owner', OWNER.toHex());

    assert.fieldEquals(
      entityName,
      entityId,
      'tokenId',
      INITIAL_TOKEN_ID_INT.toString()
    );

    assert.fieldEquals(
      entityName,
      entityId,
      'tokenURI',
      `${BASE_URI}${INITIAL_TOKEN_ID}`
    );

    assert.fieldEquals(
      entityName,
      entityId,
      'identifierAddress',
      IDENTIFIER_ADDRESS
    );
  });
});
