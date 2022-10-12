/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BigInt, Address, log, ipfs, json } from '@graphprotocol/graph-ts'
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
import { SNI } from '../generated/schema'
import { SNI_CONTRACT_ADDRESS } from '@sni/constants'

const CONTRACT_ADDRESS = Address.fromString(SNI_CONTRACT_ADDRESS)

// eslint-disable-next-line @typescript-eslint/ban-types
function findEntity(id: string, blockTimestamp: BigInt): SNI {
  let entity = SNI.load(id)

  if (!entity) {
    entity = new SNI(id)
    entity.createdAt = blockTimestamp

    entity.count = BigInt.fromI32(0)
  }

  entity.updatedAt = blockTimestamp

  // BigInt and BigDecimal math are supported
  // @ts-ignore
  // entity.count = entity.count + BigInt.fromI32(1)

  return entity
}

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

  const timestamp = event.block.timestamp

  const entity = findEntity(tokenId.toHex(), event.block.timestamp)
  entity.owner = owner
  entity.status = status
  entity.tokenURI = tokenURI
  entity.updatedAt = timestamp

  const data = ipfs.cat(tokenURI.replace('ipfs://', ''))

  if (data !== null) {
    const metadata = json.fromBytes(data).toObject()

    entity.name = metadata.mustGet('name').toString()
    entity.description = metadata.mustGet('description').toString()
    entity.image = metadata.mustGet('image').toString()

    const properties = metadata.mustGet('properties').toObject()

    entity.statusDescription = properties
      .mustGet('statusDescription')
      .toString()

    entity.taxonId = properties.mustGet('taxonId').toString()
    entity.conservationStatus = properties
      .mustGet('conservationStatus')
      .toString()
    entity.geometry = properties.mustGet('geometry').toString()
  }

  entity.save()
}
