/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SNI } from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'

// eslint-disable-next-line @typescript-eslint/ban-types
export function findEntity(id: string, blockTimestamp: BigInt): SNI {
  let entity = SNI.load(id)

  if (!entity) {
    entity = new SNI(id)
    entity.createdAt = blockTimestamp

    entity.count = BigInt.fromI32(0)
  } else {
    entity.updatedAt = blockTimestamp
    // @ts-ignore
    entity.count = entity.count + BigInt.fromI32(1)
  }

  return entity
}
