/* eslint-disable @typescript-eslint/ban-ts-comment */
import { log } from '@graphprotocol/graph-ts';
import {
  Approval,
  ApprovalForAll,
  ComputeURISet,
  DataURISet,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SovereignNatureIdentifier,
  StatusSet,
  TokenMinted,
  TokenURISet,
  Transfer,
} from '../generated/SovereignNatureIdentifier/SovereignNatureIdentifier';
import { findEntity } from './utils';

//TODO: Decide if we need approval events. Marketplace integration is not planned.
export function handleApproval(event: Approval): void {
  log.info('Approval event {}', [event.address.toHexString()]);
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  log.info('Approval for all event {}', [event.address.toHexString()]);
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {
  log.info('Role admin changed event {}', [event.address.toHexString()]);
}

export function handleRoleGranted(event: RoleGranted): void {
  log.info('Role granted event {}', [event.address.toHexString()]);
}

export function handleRoleRevoked(event: RoleRevoked): void {
  log.info('Role revoked event {}', [event.address.toHexString()]);
}

export function handleTokenMinted(event: TokenMinted): void {
  log.info('Token minted event {}', [event.address.toHexString()]);
}

export function handleStatusSet(event: StatusSet): void {
  const tokenId = event.params.tokenId;
  const status = event.params.status;

  const entity = findEntity(tokenId, event.block.timestamp);
  entity.status = status;

  entity.save();
}

export function handleTokenURISet(event: TokenURISet): void {
  const tokenId = event.params.tokenId;
  const tokenURI = event.params.tokenURI;
  const tokenMetadataDigest = event.params.tokenURIDigest;

  const entity = findEntity(tokenId, event.block.timestamp);
  entity.tokenURI = tokenURI;
  entity.tokenMetadataDigest = tokenMetadataDigest;

  entity.save();
}

export function handleDataURISet(event: DataURISet): void {
  const tokenId = event.params.tokenId;
  const dataURI = event.params.dataURI;

  const entity = findEntity(tokenId, event.block.timestamp);
  entity.dataURI = dataURI;

  entity.save();
}

export function handleComputeURISet(event: ComputeURISet): void {
  const tokenId = event.params.tokenId;
  const computeURI = event.params.computeURI;

  const entity = findEntity(tokenId, event.block.timestamp);
  entity.computeURI = computeURI;

  entity.save();
}

export function handleTransfer(event: Transfer): void {
  const contract = SovereignNatureIdentifier.bind(event.address);

  const tokenId = event.params.tokenId;
  const owner = event.params.to;
  const status = contract.statusOf(tokenId);

  const tokenURI = contract.tokenURI(tokenId);
  const tokenMetadataSchemaURI = contract.tokenURISchema(); //TODO: Consider refactoring methods naming in contract
  const derivativeMetadataSchemaURI = contract.derivativeMetadataSchemaURI();

  const tokenURIIntegrity = contract.tokenURIIntegrity(tokenId);
  const tokenMetadataDigest = tokenURIIntegrity.value0;
  const tokenMetadataHashFunction = tokenURIIntegrity.value1;

  const tokenURISchemaIntegrity = contract.tokenURISchemaIntegrity();
  const tokenMetadataSchemaDigest = tokenURISchemaIntegrity.value0;
  const tokenMetadataSchemaHashFunction = tokenURISchemaIntegrity.value1;

  const derivativeMetadataSchemaIntegrity =
    contract.derivativeMetadataSchemaIntegrity();
  const derivativeMetadataSchemaDigest =
    derivativeMetadataSchemaIntegrity.value0;
  const derivativeMetadataSchemaHashFunction =
    derivativeMetadataSchemaIntegrity.value1;

  const dataURI = contract.dataURI(tokenId);
  const computeURI = contract.computeURI(tokenId);

  const entity = findEntity(tokenId, event.block.timestamp);
  entity.owner = owner;
  entity.status = status;

  entity.tokenURI = tokenURI;
  entity.tokenMetadataDigest = tokenMetadataDigest;
  entity.tokenMetadataHashFunction = tokenMetadataHashFunction;

  entity.tokenMetadataSchemaURI = tokenMetadataSchemaURI;
  entity.tokenMetadataSchemaDigest = tokenMetadataSchemaDigest;
  entity.tokenMetadataSchemaHashFunction = tokenMetadataSchemaHashFunction;

  entity.derivativeMetadataSchemaURI = derivativeMetadataSchemaURI;
  entity.derivativeMetadataSchemaDigest = derivativeMetadataSchemaDigest;
  entity.derivativeMetadataSchemaHashFunction =
    derivativeMetadataSchemaHashFunction;

  entity.dataURI = dataURI;
  entity.computeURI = computeURI;

  entity.save();
}
