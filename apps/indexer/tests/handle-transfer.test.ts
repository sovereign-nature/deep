import { assert, describe, test } from 'matchstick-as/assembly/index';

import { Address, BigInt } from '@graphprotocol/graph-ts';

import { handleTransfer } from '../src/sovereign-nature-identifier';
import { createTransferEvent } from './events-mocks';

import { METADATA_HASH_FUNCTION, SUBGRAPH_ENTITY_NAME } from '@sni/constants';

import {
  DERIVATIVE_METADATA_SCHEMA,
  DERIVATIVE_METADATA_SCHEMA_DIGEST,
  INITIAL_COMPUTE_URI,
  INITIAL_DATA_URI,
  INITIAL_STATUS,
  INITIAL_TOKEN_ID,
  INITIAL_TOKEN_URI,
  INITIAL_TOKEN_URI_DIGEST,
  MINTER_ADDRESS,
  OWNER_ADDRESS,
  TOKEN_URI_SCHEMA,
  TOKEN_URI_SCHEMA_DIGEST,
} from '@sni/constants/mocks/identifier';
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

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'tokenURI',
      INITIAL_TOKEN_URI
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'tokenMetadataDigest',
      INITIAL_TOKEN_URI_DIGEST
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'tokenMetadataSchemaHashFunction',
      METADATA_HASH_FUNCTION
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'tokenMetadataSchemaURI',
      TOKEN_URI_SCHEMA
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'tokenMetadataSchemaDigest',
      TOKEN_URI_SCHEMA_DIGEST
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'tokenMetadataSchemaHashFunction',
      METADATA_HASH_FUNCTION
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

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'derivativeMetadataSchemaURI',
      DERIVATIVE_METADATA_SCHEMA
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'derivativeMetadataSchemaDigest',
      DERIVATIVE_METADATA_SCHEMA_DIGEST
    );

    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenId,
      'derivativeMetadataSchemaHashFunction',
      METADATA_HASH_FUNCTION
    );
  });
});
