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
  });
});
