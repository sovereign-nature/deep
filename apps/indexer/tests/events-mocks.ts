//TODO: Looks like There is a bug in AssemblyScript that prevents us from moving this file to mocks folder

//Linting fixes for AssemblyScript
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */

import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { newMockEvent } from 'matchstick-as';
import { SNI_CONTRACT_ADDRESS_STAGING } from '../../../packages/constants';
import {
  Approval,
  ApprovalForAll,
  Transfer,
} from '../generated/DeepLink/DeepLink';

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
