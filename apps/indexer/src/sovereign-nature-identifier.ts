/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Address,
  log,
  ipfs,
  json,
  JSONValueKind
} from '@graphprotocol/graph-ts'
import {
  SovereignNatureIdentifier,
  Approval,
  ApprovalForAll,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StatusSet,
  TokenURISet,
  Transfer
} from '../generated/SovereignNatureIdentifier/SovereignNatureIdentifier'
import { SNI_CONTRACT_ADDRESS } from '@sni/constants'
import { findEntity } from './utils'

const CONTRACT_ADDRESS = Address.fromString(SNI_CONTRACT_ADDRESS)

//TODO: Decide if we need approval events. Marketplace integration is not planned.
export function handleApproval(event: Approval): void {
  log.info('Approval event {}', [event.address.toString()])
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  log.info('Approval for all event {}', [event.address.toString()])
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {
  log.info('Role admin changed event {}', [event.address.toString()])
}

export function handleRoleGranted(event: RoleGranted): void {
  log.info('Role granted event {}', [event.address.toString()])
}

export function handleRoleRevoked(event: RoleRevoked): void {
  log.info('Role revoked event {}', [event.address.toString()])
}

export function handleStatusSet(event: StatusSet): void {
  const tokenId = event.params.tokenId
  const status = event.params.status

  const entity = findEntity(tokenId.toHex(), event.block.timestamp)
  entity.status = status

  entity.save()
}

export function handleTokenURISet(event: TokenURISet): void {
  const tokenId = event.params.tokenId
  const tokenURI = event.params.tokenURI

  const entity = findEntity(tokenId.toHex(), event.block.timestamp)
  entity.tokenURI = tokenURI

  entity.save()
}

export function handleTransfer(event: Transfer): void {
  const contract = SovereignNatureIdentifier.bind(CONTRACT_ADDRESS)

  const tokenId = event.params.tokenId
  const owner = event.params.to
  const status = contract.statusOf(tokenId)
  const tokenURI = contract.tokenURI(tokenId)

  const entity = findEntity(tokenId.toHex(), event.block.timestamp)
  entity.owner = owner
  entity.status = status
  entity.tokenURI = tokenURI

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

  entity.save()
}
