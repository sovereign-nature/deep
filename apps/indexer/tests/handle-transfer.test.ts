import { assert, describe, test } from 'matchstick-as/assembly/index';

import { Address, BigInt } from '@graphprotocol/graph-ts';

import { handleTransfer } from '../src/sovereign-nature-identifier';
import { createTransferEvent } from './sovereign-nature-identifier-utils';

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
import { mockForToken } from './mocks';

//MOCKED CONSTANTS
const INITIAL_TOKEN_ID_INT = BigInt.fromI32(INITIAL_TOKEN_ID);
const MINTER = Address.fromString(MINTER_ADDRESS);
const OWNER = Address.fromString(OWNER_ADDRESS);

describe('Handle transferTo', () => {
  test('Handles Transfer event', () => {
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
});
