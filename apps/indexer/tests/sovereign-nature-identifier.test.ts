import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from 'matchstick-as/assembly/index'
import { Address, BigInt, Bytes } from '@graphprotocol/graph-ts'
import { ExampleEntity } from '../generated/schema'
import { Approval } from '../generated/SovereignNatureIdentifier/SovereignNatureIdentifier'
import { handleApproval } from '../src/sovereign-nature-identifier'
import { createApprovalEvent } from './sovereign-nature-identifier-utils'

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe('Describe entity assertions', () => {
  beforeAll(() => {
    const owner = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    )
    const approved = Address.fromString(
      '0x0000000000000000000000000000000000000001'
    )
    const tokenId = BigInt.fromI32(234)
    const newApprovalEvent = createApprovalEvent(owner, approved, tokenId)
    handleApproval(newApprovalEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test('ExampleEntity created and stored', () => {
    assert.entityCount('ExampleEntity', 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      'ExampleEntity',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      'owner',
      '0x0000000000000000000000000000000000000001'
    )
    assert.fieldEquals(
      'ExampleEntity',
      '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
      'approved',
      '0x0000000000000000000000000000000000000001'
    )
    //TODO: Write proper tests
    // assert.fieldEquals(
    //   'ExampleEntity',
    //   '0xa16081f360e3847006db660bae1c6d1b2e17ec2a',
    //   'tokenId',
    //   '234'
    // )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
