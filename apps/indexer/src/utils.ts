/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SNI } from '../generated/schema'
import { BigInt, JSONValueKind, ipfs, json } from '@graphprotocol/graph-ts'

// Find entity in database or create a new one if it's not found.
// eslint-disable-next-line @typescript-eslint/ban-types
export function findEntity(tokenId: BigInt, blockTimestamp: BigInt): SNI {
  const id = tokenId.toHex()
  let entity = SNI.load(id)

  if (!entity) {
    entity = new SNI(id)
    entity.tokenId = tokenId
    entity.createdAt = blockTimestamp
  } else {
    entity.updatedAt = blockTimestamp
  }

  return entity
}

// Fill entity data from IPFS metadata file.
export function fillFromIPFS(entity: SNI, tokenURI: string): SNI {
  const data = ipfs.cat(tokenURI.replace('ipfs://', ''))

  if (data !== null) {
    const metadata = json.fromBytes(data).toObject()

    const name = metadata.get('name')
    if (name !== null && name.kind == JSONValueKind.STRING) {
      entity.name = name.toString()
    }

    const description = metadata.get('description')
    if (description !== null && description.kind == JSONValueKind.STRING) {
      entity.description = description.toString()
    }

    const image = metadata.get('image')
    if (image !== null && image.kind == JSONValueKind.STRING) {
      entity.image = image.toString()
    }

    const properties = metadata.get('properties')
    if (properties !== null && properties.kind == JSONValueKind.OBJECT) {
      const propsObject = properties.toObject()

      const statusDescription = propsObject.get('statusDescription')
      if (
        statusDescription !== null &&
        statusDescription.kind == JSONValueKind.STRING
      ) {
        entity.statusDescription = statusDescription.toString()
      }

      const taxonId = propsObject.get('taxonId')
      if (taxonId !== null && taxonId.kind == JSONValueKind.STRING) {
        entity.taxonId = taxonId.toString()
      }

      const conservationStatus = propsObject.get('conservationStatus')
      if (
        conservationStatus !== null &&
        conservationStatus.kind == JSONValueKind.STRING
      ) {
        entity.conservationStatus = conservationStatus.toString()
      }

      const geometry = propsObject.get('geometry')
      if (geometry !== null && geometry.kind == JSONValueKind.STRING) {
        entity.geometry = geometry.toString()
      }
    }
  }

  return entity
}
