import { createMockedFunction } from 'matchstick-as/assembly/index';

import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';

import { SNI_CONTRACT_ADDRESS_STAGING } from '../../../../packages/constants';
import {
  CONSERVATION_ID,
  ELEMENT_ID,
  NAME,
  SYMBOL,
  TOKEN_URI,
} from '../../../../packages/constants/mocks/deep-link';

// eslint-disable-next-line @typescript-eslint/ban-types
export function mockForToken(tokenId: BigInt): void {
  const contract = Address.fromString(SNI_CONTRACT_ADDRESS_STAGING);
  const tokenIdParam = ethereum.Value.fromUnsignedBigInt(tokenId);

  createMockedFunction(contract, 'elementId', 'elementId(uint256):(string)')
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(ELEMENT_ID)]);

  createMockedFunction(
    contract,
    'conservationId',
    'conservationId(uint256):(string)'
  )
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(CONSERVATION_ID)]);

  createMockedFunction(contract, 'tokenURI', 'tokenURI(uint256):(string)')
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(TOKEN_URI)]);

  createMockedFunction(contract, 'name', 'name():(string)').returns([
    ethereum.Value.fromString(NAME),
  ]);

  createMockedFunction(contract, 'symbol', 'symbol():(string)').returns([
    ethereum.Value.fromString(SYMBOL),
  ]);
}
