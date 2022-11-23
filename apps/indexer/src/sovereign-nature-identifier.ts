/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Address, log } from '@graphprotocol/graph-ts'
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
import { fillFromIPFS, findEntity } from './utils'

const CONTRACT_ADDRESS = Address.fromString(SNI_CONTRACT_ADDRESS)

//TODO: Decide if we need approval events. Marketplace integration is not planned.
export function handleApproval(event: Approval): void {
  log.info('Approval event {}', [event.address.toHexString()])
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  log.info('Approval for all event {}', [event.address.toHexString()])
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {
  log.info('Role admin changed event {}', [event.address.toHexString()])
}

export function handleRoleGranted(event: RoleGranted): void {
  log.info('Role granted event {}', [event.address.toHexString()])
}

export function handleRoleRevoked(event: RoleRevoked): void {
  log.info('Role revoked event {}', [event.address.toHexString()])
}

export function handleStatusSet(event: StatusSet): void {
  const tokenId = event.params.tokenId
  const status = event.params.status

  const entity = findEntity(tokenId, event.block.timestamp)
  entity.status = status

  entity.save()
}

export function handleTokenURISet(event: TokenURISet): void {
  const tokenId = event.params.tokenId
  const tokenURI = event.params.tokenURI

  const entity = findEntity(tokenId, event.block.timestamp)
  entity.tokenURI = tokenURI

  fillFromIPFS(entity, tokenURI)

  entity.save()
}

export function handleTransfer(event: Transfer): void {
  const contract = SovereignNatureIdentifier.bind(CONTRACT_ADDRESS)

  const tokenId = event.params.tokenId
  const owner = event.params.to
  const status = contract.statusOf(tokenId)
  const tokenURI = contract.tokenURI(tokenId)

  const entity = findEntity(tokenId, event.block.timestamp)
  entity.owner = owner
  entity.status = status
  entity.tokenURI = tokenURI

  fillFromIPFS(entity, tokenURI)

  entity.save()
}
