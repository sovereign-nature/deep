/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  assert,
  describe,
  test,
  beforeAll,
  createMockedFunction,
  mockIpfsFile
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

const INITIAL_URI =
  'ipfs://bafyreib564aosdw5igyfbvedtdvtz4xgrznz64iszd34b32cfvzro3rm5y/metadata.json'
const NEW_URI =
  'ipfs://bafyreib564aosdw5igyfbvedtdvtz4xgrznz64iszd34b32cfvzro3rnew/metadata.json'
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

  //Initial IPFS Metadata
  mockIpfsFile(
    'bafyreib564aosdw5igyfbvedtdvtz4xgrznz64iszd34b32cfvzro3rm5y/metadata.json',
    'tests/ipfs/initial.json'
  )

  //Updated IPFS Metadata
  mockIpfsFile(
    'bafyreib564aosdw5igyfbvedtdvtz4xgrznz64iszd34b32cfvzro3rnew/metadata.json',
    'tests/ipfs/updated.json'
  )
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

    // Base fields
    assert.fieldEquals(ENTITY_NAME, tokenId, 'owner', OWNER.toHex())
    assert.fieldEquals(ENTITY_NAME, tokenId, 'tokenURI', INITIAL_URI)
    assert.fieldEquals(
      ENTITY_NAME,
      tokenId,
      'status',
      INITIAL_STATUS.toString()
    )

    // JSON metadata fields from initial.json
    assert.fieldEquals(
      ENTITY_NAME,
      tokenId,
      'name',
      'Sovereign Nature Identifier #0'
    )
    assert.fieldEquals(
      ENTITY_NAME,
      tokenId,
      'description',
      'Test lion identifier'
    )
    assert.fieldEquals(
      ENTITY_NAME,
      tokenId,
      'image',
      'ipfs://bafybeihs6qouvmo4pnjozlrdmgic3b4nav6rrswc3tobgclrrvtwsa47oe/blob'
    )
    assert.fieldEquals(
      ENTITY_NAME,
      tokenId,
      'statusDescription',
      "{ '0': 'Normal', '1': 'Aggressive' }"
    )
    assert.fieldEquals(ENTITY_NAME, tokenId, 'taxonId', 'itis:183803')
    assert.fieldEquals(ENTITY_NAME, tokenId, 'conservationStatus', 'VU')
    assert.fieldEquals(
      ENTITY_NAME,
      tokenId,
      'geometry',
      'POINT(5.9559 47.8084)'
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
