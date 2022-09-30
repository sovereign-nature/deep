/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BigInt, Address } from '@graphprotocol/graph-ts'
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

const CONTRACT = Address.fromString(
  '0xB72a77d425aad2faAE3F695846b337E7d65D098e'
)

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
  console.log(event.address.toString())
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  console.log(event.address.toString())
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {
  console.log(event.address.toString())
}

export function handleRoleGranted(event: RoleGranted): void {
  console.log(event.address.toString())
}

export function handleRoleRevoked(event: RoleRevoked): void {
  console.log(event.address.toString())
}

export function handleStatusSet(event: StatusSet): void {
  console.log(event.address.toString())
}

export function handleTokenURISet(event: TokenURISet): void {
  const tokenId = event.params.tokenId
  const tokenURI = event.params.tokenURI

  const entity = findEntity(tokenId.toHex(), event.block.timestamp)
  entity.tokenURI = tokenURI

  entity.save()
}

export function handleTransfer(event: Transfer): void {
  const contract = SovereignNatureIdentifier.bind(CONTRACT)

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

  entity.save()
}
