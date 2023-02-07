import { Address, BigInt } from '@graphprotocol/graph-ts';
import { MINTER_ADDRESS, OWNER_ADDRESS } from '@sni/constants/mocks/identifier';
import { handleTransfer } from '../../src/sovereign-nature-identifier';
import { mockForToken } from '../mocks';
import { createTransferEvent } from '../sovereign-nature-identifier-utils';

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
