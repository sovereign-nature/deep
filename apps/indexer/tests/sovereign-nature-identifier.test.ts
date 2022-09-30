/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  assert,
  describe,
  test,
  beforeAll,
  createMockedFunction
} from 'matchstick-as/assembly/index'

import { Address, BigInt, ethereum, store } from '@graphprotocol/graph-ts'

import {
  handleStatusSet,
  handleTokenURISet,
  handleTransfer
} from '../src/sovereign-nature-identifier'
import {
  createTokenURISetEvent,
  createTransferEvent,
  createStatusSetEvent
} from './sovereign-nature-identifier-utils'

import { SNI_CONTRACT_ADDRESS } from '@sni/constants'

const INITIAL_URI = 'ipfs://initial'
const NEW_URI = 'ipfs://new'
const TOKEN_ID = BigInt.fromI32(0)
const TEMP_TOKEN_ID = BigInt.fromI32(99)
const MINTER = Address.fromString('0x0000000000000000000000000000000000000000')
const OWNER = Address.fromString('0x0000000000000000000000000000000000000001')
const OWNER_2 = Address.fromString('0x0000000000000000000000000000000000000002')
const CONTRACT = Address.fromString(SNI_CONTRACT_ADDRESS)
const INITIAL_STATUS = BigInt.fromI32(0)
const NEW_STATUS = BigInt.fromI32(1)

const ENTITY_NAME = 'SNI'

// eslint-disable-next-line @typescript-eslint/ban-types
function mockForToken(id: BigInt): void {
  const tokenIdParam = ethereum.Value.fromUnsignedBigInt(id)

  createMockedFunction(CONTRACT, 'statusOf', 'statusOf(uint256):(uint256)')
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromUnsignedBigInt(INITIAL_STATUS)])

  createMockedFunction(CONTRACT, 'tokenURI', 'tokenURI(uint256):(string)')
    .withArgs([tokenIdParam])
    .returns([ethereum.Value.fromString(INITIAL_URI)])
}

describe('SNI Indexer', () => {
  beforeAll(() => {
    mockForToken(TOKEN_ID)

    const transferEvent = createTransferEvent(MINTER, OWNER, TOKEN_ID)
    handleTransfer(transferEvent)
  })

  test('Sets createdAt on entity', () => {
    const tokenId = TEMP_TOKEN_ID
    mockForToken(tokenId)

    const transferEvent = createTransferEvent(MINTER, OWNER, tokenId)
    handleTransfer(transferEvent)

    assert.fieldEquals(
      ENTITY_NAME,
      tokenId.toHex(),
      'createdAt',
      transferEvent.block.timestamp.toString()
    )

    store.remove(ENTITY_NAME, tokenId.toHex())
  })

  test('Sets updatedAt on entity', () => {
    const transferEvent = createTransferEvent(OWNER, OWNER_2, TOKEN_ID)
    handleTransfer(transferEvent)

    assert.fieldEquals(
      ENTITY_NAME,
      TOKEN_ID.toHex(),
      'updatedAt',
      transferEvent.block.timestamp.toString()
    )
  })

  test('Handles Transfer event', () => {
    const transferEvent = createTransferEvent(MINTER, OWNER, TOKEN_ID)
    handleTransfer(transferEvent)

    const tokenId = TOKEN_ID.toHex()

    assert.fieldEquals(ENTITY_NAME, tokenId, 'owner', OWNER.toHex())
    assert.fieldEquals(ENTITY_NAME, tokenId, 'tokenURI', INITIAL_URI)
    assert.fieldEquals(
      ENTITY_NAME,
      tokenId,
      'status',
      INITIAL_STATUS.toString()
    )
  })

  test('Handles TokenURISet event', () => {
    const tokenURISetEvent = createTokenURISetEvent(TOKEN_ID, NEW_URI)
    handleTokenURISet(tokenURISetEvent)

    assert.fieldEquals(ENTITY_NAME, TOKEN_ID.toHex(), 'tokenURI', NEW_URI)
  })

  test('Handles StatusSet event', () => {
    const statusSetEvent = createStatusSetEvent(TOKEN_ID, NEW_STATUS)
    handleStatusSet(statusSetEvent)

    assert.fieldEquals(
      ENTITY_NAME,
      TOKEN_ID.toHex(),
      'status',
      NEW_STATUS.toString()
    )
  })
})
