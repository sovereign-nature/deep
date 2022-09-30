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

function findEntity(id: string): SNI {
  let entity = SNI.load(id)

  if (!entity) {
    entity = new SNI(id)

    // entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  // @ts-ignore
  // entity.count = entity.count + BigInt.fromI32(1)

  return entity
}

function test(a: number): number {
  return a + 1
}

export function handleApproval(event: Approval): void {
  console.log(event.address.toString())
  // const id = event.transaction.from.toHex()
  // const entity = findEntity(id)
  // // Entity fields can be set based on event parameters
  // entity.owner = event.params.owner
  // entity.approved = event.params.approved
  // // Entities can be written to the store with `.save()`
  // entity.save()
  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.
  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.MINTER_ROLE(...)
  // - contract.ORACLE_ROLE(...)
  // - contract.balanceOf(...)
  // - contract.getApproved(...)
  // - contract.getRoleAdmin(...)
  // - contract.hasRole(...)
  // - contract.isApprovedForAll(...)
  // - contract.name(...)
  // - contract.ownerOf(...)
  // - contract.statusOf(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenURI(...)
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

  const entity = findEntity(tokenId.toHex())
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

  const entity = new SNI(tokenId.toHex())
  entity.owner = owner
  entity.status = status
  entity.tokenURI = tokenURI
  entity.updatedAt = timestamp

  entity.save()
}
