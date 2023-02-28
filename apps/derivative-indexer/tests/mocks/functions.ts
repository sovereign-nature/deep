import { createMockedFunction } from 'matchstick-as/assembly/index';

import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';

import { SAMPLE_COLLECTION_ADDRESS } from '@sni/constants';
import {
  BASE_URI,
  COLLECTION_NAME,
  COLLECTION_SYMBOL,
  IDENTIFIER_ADDRESS,
} from '@sni/constants/mocks/sampleCollection';

// eslint-disable-next-line @typescript-eslint/ban-types
export function mockForToken(tokenId: BigInt): void {
  const contract = Address.fromString(SAMPLE_COLLECTION_ADDRESS);
  const tokenIdParam = ethereum.Value.fromUnsignedBigInt(tokenId);

  createMockedFunction(contract, 'tokenURI', 'tokenURI(uint256):(string)')
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(`${BASE_URI}${tokenId.toString()}`)]);

  createMockedFunction(
    contract,
    'identifierAddress',
    'identifierAddress(uint256):(string)'
  )
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(`${IDENTIFIER_ADDRESS}`)]);

  createMockedFunction(contract, 'name', 'name():(string)').returns([
    ethereum.Value.fromString(COLLECTION_NAME),
  ]);

  createMockedFunction(contract, 'symbol', 'symbol():(string)').returns([
    ethereum.Value.fromString(COLLECTION_SYMBOL),
  ]);
}
