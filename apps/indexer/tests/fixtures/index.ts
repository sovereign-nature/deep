import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  MINTER_ADDRESS,
  OWNER_ADDRESS,
} from '../../../../packages/constants/mocks/deep-link';
import { handleTransfer } from '../../src/deep-link';
import { createTransferEvent } from '../events-mocks';
import { mockForToken } from '../mocks/functions';

// eslint-disable-next-line @typescript-eslint/ban-types
export function initializeMintedToken(tokenId: BigInt): void {
  mockForToken(tokenId);

  const transferEvent = createTransferEvent(
    Address.fromString(MINTER_ADDRESS),
    Address.fromString(OWNER_ADDRESS),
    tokenId
  );
  handleTransfer(transferEvent);
}
