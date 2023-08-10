/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BigInt } from '@graphprotocol/graph-ts';
import { DeepLink } from '../generated/schema';

// Find entity in database or create a new one if it's not found.
// eslint-disable-next-line @typescript-eslint/ban-types
export function findEntity(tokenId: BigInt, blockTimestamp: BigInt): DeepLink {
  const id = tokenId.toHex();
  let entity = DeepLink.load(id);

  if (!entity) {
    entity = new DeepLink(id);
    entity.tokenId = tokenId;
    entity.createdAt = blockTimestamp;
  } else {
    entity.updatedAt = blockTimestamp;
  }

  return entity;
}
