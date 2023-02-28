import { log } from '@graphprotocol/graph-ts';
import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Sample,
  Transfer as TransferEvent,
} from '../generated/Sample/Sample';
import { findEntity } from './utils';

export function handleApproval(event: ApprovalEvent): void {
  log.info('Approval event {}', [event.address.toHexString()]);
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  log.info('Approval for all event {}', [event.address.toHexString()]);
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  log.info('Ownership transferred event {}', [event.address.toHexString()]);
}

export function handleTransfer(event: TransferEvent): void {
  const sampleContract = Sample.bind(event.address);

  const tokenId = event.params.tokenId;
  const owner = event.params.to;

  const tokenURI = sampleContract.tokenURI(tokenId);
  const identifierAddress = sampleContract.identifierAddress(tokenId);

  const entity = findEntity(tokenId, event.block.timestamp);
  entity.owner = owner;
  entity.tokenURI = tokenURI;
  entity.collectionName = sampleContract.name();
  entity.symbol = sampleContract.symbol();
  entity.identifierAddress = identifierAddress;

  entity.save();
}
