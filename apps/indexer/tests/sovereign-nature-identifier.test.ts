/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  createMockedFunction
} from 'matchstick-as/assembly/index'
import { Address, BigInt, Bytes, ethereum } from '@graphprotocol/graph-ts'
import { SNI } from '../generated/schema'
import { Approval } from '../generated/SovereignNatureIdentifier/SovereignNatureIdentifier'
import {
  handleApproval,
  handleTokenURISet,
  handleTransfer
} from '../src/sovereign-nature-identifier'
import {
  createApprovalEvent,
  createTokenURISetEvent,
  createTransferEvent
} from './sovereign-nature-identifier-utils'

import { SNI_CONTRACT_ADDRESS } from '@sni/constants'

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

// describe('Describe entity assertions', () => {
//   beforeAll(() => {
//     const owner = Address.fromString(
//       '0x0000000000000000000000000000000000000001'
//     )
//     const approved = Address.fromString(
//       '0x0000000000000000000000000000000000000001'
//     )
//     const tokenId = BigInt.fromI32(234)
//     const newApprovalEvent = createApprovalEvent(owner, approved, tokenId)
//     handleApproval(newApprovalEvent)
//   })

//   afterAll(() => {
//     clearStore()
//   })

//   // For more test scenarios, see:
//   // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

//   test('ExampleEntity created and stored', () => {
//     assert.entityCount('ExampleEntity', 1)

//     // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
//     assert.fieldEquals(
//       'ExampleEntity',
//       '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
//       'owner',
//       '0x0000000000000000000000000000000000000001'
//     )
//     assert.fieldEquals(
//       'ExampleEntity',
//       '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
//       'approved',
//       '0x0000000000000000000000000000000000000001'
//     )
//     //Write proper tests

//     // assert.fieldEquals(
//     //   'ExampleEntity',
//     //   '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
//     //   'tokenId',
//     //   '234'
//     // )

//     // More assert options:
//     // https://thegraph.com/docs/en/developer/matchstick/#asserts
//   })
// })

const INITIAL_URI = 'ipfs://initial'
const TOKEN_ID = BigInt.fromI32(0)
const MINTER = Address.fromString('0x0000000000000000000000000000000000000000')
const OWNER = Address.fromString('0x0000000000000000000000000000000000000001')
const CONTRACT = Address.fromString(
  '0xB72a77d425aad2faAE3F695846b337E7d65D098e'
)
const INITIAL_STATUS = BigInt.fromI32(0)

describe('Handles TokenURISet event', () => {
  beforeAll(() => {
    const transferEvent = createTransferEvent(MINTER, OWNER, TOKEN_ID)
    const tokenURISetEvent = createTokenURISetEvent(TOKEN_ID, INITIAL_URI)

    const tokenIdParam = ethereum.Value.fromUnsignedBigInt(TOKEN_ID)

    createMockedFunction(CONTRACT, 'statusOf', 'statusOf(uint256):(uint256)')
      .withArgs([tokenIdParam])
      .returns([ethereum.Value.fromUnsignedBigInt(INITIAL_STATUS)])

    createMockedFunction(CONTRACT, 'tokenURI', 'tokenURI(uint256):(string)')
      .withArgs([tokenIdParam])
      .returns([ethereum.Value.fromString(INITIAL_URI)])

    handleTransfer(transferEvent)
    handleTokenURISet(tokenURISetEvent)
  })

  test('TokenURI was set', () => {
    assert.fieldEquals('SNI', TOKEN_ID.toHex(), 'tokenURI', INITIAL_URI)
  })
})
