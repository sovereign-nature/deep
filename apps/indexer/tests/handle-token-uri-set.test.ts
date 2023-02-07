import { assert, describe, test } from 'matchstick-as/assembly/index';

import { BigInt, Bytes } from '@graphprotocol/graph-ts';

import { handleTokenURISet } from '../src/sovereign-nature-identifier';
import { createTokenURISetEvent } from './events-mocks';

import { SUBGRAPH_ENTITY_NAME } from '@sni/constants';

import {
  INITIAL_TOKEN_ID,
  UPDATED_TOKEN_URI,
  UPDATED_TOKEN_URI_DIGEST,
} from '@sni/constants/mocks/identifier';
import { initializeMintedToken } from './fixtures';

describe('Handles TokenURISet event', () => {
  test('Correct state after event handling', () => {
    const initialTokenId = BigInt.fromI32(INITIAL_TOKEN_ID);

    initializeMintedToken(initialTokenId);

    const tokenURISetEvent = createTokenURISetEvent(
      initialTokenId,
      UPDATED_TOKEN_URI,
      Bytes.fromHexString(UPDATED_TOKEN_URI_DIGEST)
    );

    handleTokenURISet(tokenURISetEvent);

    const tokenIdHex = initialTokenId.toHex();

    // Base fields that were updated via setter.
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenIdHex,
      'tokenURI',
      UPDATED_TOKEN_URI
    );

    // Base fields that were updated via setter.
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenIdHex,
      'tokenMetadataDigest',
      UPDATED_TOKEN_URI_DIGEST
    );

    // JSON metadata fields from updated.json should be indexed as well.
    assert.fieldEquals(SUBGRAPH_ENTITY_NAME, tokenIdHex, 'name', 'Scarface');
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenIdHex,
      'description',
      'Test lion identifier updated'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenIdHex,
      'image',
      'ipfs://bafybeihs6qouvmo4pnjozlrdmgic3b4nav6rrswc3tobgclrrvtwsa47oe/blob'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenIdHex,
      'statusDescription',
      '{ "0": "Alive", "1": "Dead" }'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenIdHex,
      'taxonId',
      'itis:183803'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenIdHex,
      'conservationStatus',
      'VU'
    );
    assert.fieldEquals(
      SUBGRAPH_ENTITY_NAME,
      tokenIdHex,
      'geometry',
      'POINT(6.0000 48.0000)'
    );
  });
});
