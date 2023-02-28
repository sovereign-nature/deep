/* eslint-disable @typescript-eslint/ban-types */

import { BigInt } from '@graphprotocol/graph-ts';
import { Derivative } from '../generated/schema';

// Find entity in database or create a new one if it's not found.
export function findEntity(
  tokenId: BigInt,
  blockTimestamp: BigInt
): Derivative {
  const id = tokenId.toHex();
  let entity = Derivative.load(id);

  if (!entity) {
    entity = new Derivative(id);
    entity.tokenId = tokenId;
    entity.createdAt = blockTimestamp;
  } else {
    entity.updatedAt = blockTimestamp;
  }

  return entity;
}
