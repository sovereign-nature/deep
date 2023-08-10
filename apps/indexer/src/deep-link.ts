/* eslint-disable @typescript-eslint/ban-ts-comment */
import { log } from '@graphprotocol/graph-ts';
import {
  Approval,
  ApprovalForAll,
  DeepLink,
  Transfer,
} from '../generated/DeepLink/DeepLink';
import { findEntity } from './utils';

export function handleApproval(event: Approval): void {
  log.info('Approval event {}, not processed', [event.address.toHexString()]);
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  log.info('Approval for all event {}, not processed', [
    event.address.toHexString(),
  ]);
}

export function handleTransfer(event: Transfer): void {
  const contract = DeepLink.bind(event.address);

  const tokenId = event.params.tokenId;
  const owner = event.params.to;

  const tokenURI = contract.tokenURI(tokenId);
  const elementId = contract.elementId(tokenId);
  const conservationId = contract.conservationId(tokenId);

  const name = contract.name();
  const symbol = contract.symbol();

  const entity = findEntity(tokenId, event.block.timestamp);

  entity.owner = owner;
  entity.tokenURI = tokenURI;

  entity.elementId = elementId;
  entity.conservationId = conservationId;

  entity.name = name;
  entity.symbol = symbol;

  entity.save();
}
