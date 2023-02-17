//TODO: Looks like There is a bug in AssemblyScript that prevents us from moving this file to mocks folder

//Linting fixes for AssemblyScript
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */

import { Address, BigInt, Bytes, ethereum } from '@graphprotocol/graph-ts';
import { SNI_CONTRACT_ADDRESS_STAGING } from '@sni/constants';
import { newMockEvent } from 'matchstick-as';
import {
  Approval,
  ApprovalForAll,
  ComputeURISet,
  DataURISet,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StatusSet,
  TokenURISet,
  Transfer,
} from '../generated/SovereignNatureIdentifier/SovereignNatureIdentifier';

function newMockEventAddress(): ethereum.Event {
  const event = newMockEvent();
  event.address = Address.fromString(SNI_CONTRACT_ADDRESS_STAGING);

  return event;
}

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  //@ts-ignore
  const approvalEvent = changetype<Approval>(newMockEventAddress());

  approvalEvent.parameters = [];

  approvalEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner))
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam('approved', ethereum.Value.fromAddress(approved))
  );
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );

  return approvalEvent;
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  //@ts-ignore
  const approvalForAllEvent = changetype<ApprovalForAll>(newMockEventAddress());

  approvalForAllEvent.parameters = [];

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('owner', ethereum.Value.fromAddress(owner))
  );
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('operator', ethereum.Value.fromAddress(operator))
  );
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam('approved', ethereum.Value.fromBoolean(approved))
  );

  return approvalForAllEvent;
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  //@ts-ignore
  const roleAdminChangedEvent = changetype<RoleAdminChanged>(
    newMockEventAddress()
  );

  roleAdminChangedEvent.parameters = [];

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam('role', ethereum.Value.fromFixedBytes(role))
  );
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      'previousAdminRole',
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  );
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      'newAdminRole',
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  );

  return roleAdminChangedEvent;
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  //@ts-ignore
  const roleGrantedEvent = changetype<RoleGranted>(newMockEventAddress());

  roleGrantedEvent.parameters = [];

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam('role', ethereum.Value.fromFixedBytes(role))
  );
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam('account', ethereum.Value.fromAddress(account))
  );
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam('sender', ethereum.Value.fromAddress(sender))
  );

  return roleGrantedEvent;
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  //@ts-ignore
  const roleRevokedEvent = changetype<RoleRevoked>(newMockEventAddress());

  roleRevokedEvent.parameters = [];

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam('role', ethereum.Value.fromFixedBytes(role))
  );
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam('account', ethereum.Value.fromAddress(account))
  );
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam('sender', ethereum.Value.fromAddress(sender))
  );

  return roleRevokedEvent;
}

export function createStatusSetEvent(
  tokenId: BigInt,
  status: BigInt
): StatusSet {
  //@ts-ignore
  const statusSetEvent = changetype<StatusSet>(newMockEventAddress());

  statusSetEvent.parameters = [];

  statusSetEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  statusSetEvent.parameters.push(
    new ethereum.EventParam('status', ethereum.Value.fromUnsignedBigInt(status))
  );

  return statusSetEvent;
}

export function createTokenURISetEvent(
  tokenId: BigInt,
  tokenURI: string,
  digest: Bytes
): TokenURISet {
  //@ts-ignore
  const tokenUriSetEvent = changetype<TokenURISet>(newMockEventAddress());

  tokenUriSetEvent.parameters = [];

  tokenUriSetEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  tokenUriSetEvent.parameters.push(
    new ethereum.EventParam('tokenURI', ethereum.Value.fromString(tokenURI))
  );

  tokenUriSetEvent.parameters.push(
    new ethereum.EventParam('digest', ethereum.Value.fromBytes(digest))
  );

  return tokenUriSetEvent;
}

export function createDataURISetEvent(
  tokenId: BigInt,
  dataURI: string
): DataURISet {
  //@ts-ignore
  const dataURISetEvent = changetype<DataURISet>(newMockEventAddress());

  dataURISetEvent.parameters = [];

  dataURISetEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  dataURISetEvent.parameters.push(
    new ethereum.EventParam('dataURI', ethereum.Value.fromString(dataURI))
  );

  return dataURISetEvent;
}

export function createComputeURISetEvent(
  tokenId: BigInt,
  computeURI: string
): ComputeURISet {
  //@ts-ignore
  const computeURISetEvent = changetype<ComputeURISet>(newMockEventAddress());

  computeURISetEvent.parameters = [];

  computeURISetEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  computeURISetEvent.parameters.push(
    new ethereum.EventParam('computeURI', ethereum.Value.fromString(computeURI))
  );

  return computeURISetEvent;
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  //@ts-ignore
  const transferEvent = changetype<Transfer>(newMockEventAddress());

  transferEvent.parameters = [];

  transferEvent.parameters.push(
    new ethereum.EventParam('from', ethereum.Value.fromAddress(from))
  );
  transferEvent.parameters.push(
    new ethereum.EventParam('to', ethereum.Value.fromAddress(to))
  );
  transferEvent.parameters.push(
    new ethereum.EventParam(
      'tokenId',
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  return transferEvent;
}
