import { newMockEvent } from 'matchstick-as'
import { ethereum, Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import {
  Approval,
  ApprovalForAll,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StatusSet,
  TokenURISet,
  Transfer
} from '../generated/SovereignNatureIdentifier/SovereignNatureIdentifier'

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: bigint
): Approval {
  const approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = []

  approvalEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam('approved', ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  const approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = []

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('operator', ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('approved', ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  const roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = []

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam('role', ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      'previousAdminRole',
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      'newAdminRole',
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  const roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = []

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam('role', ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam('account', ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam('sender', ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  const roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = []

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam('role', ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam('account', ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam('sender', ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createStatusSetEvent(
  tokenId: bigint,
  status: bigint
): StatusSet {
  const statusSetEvent = changetype<StatusSet>(newMockEvent())

  statusSetEvent.parameters = []

  statusSetEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  statusSetEvent.parameters.push(
    new ethereum.EventParam('status', ethereum.Value.fromUnsignedBigInt(status))
  )

  return statusSetEvent
}

export function createTokenURISetEvent(
  tokenId: bigint,
  tokenURI: string
): TokenURISet {
  const tokenUriSetEvent = changetype<TokenURISet>(newMockEvent())

  tokenUriSetEvent.parameters = []

  tokenUriSetEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  tokenUriSetEvent.parameters.push(
    new ethereum.EventParam('tokenURI', ethereum.Value.fromString(tokenURI))
  )

  return tokenUriSetEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: bigint
): Transfer {
  const transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = []

  transferEvent.parameters.push(
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam('to', ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
