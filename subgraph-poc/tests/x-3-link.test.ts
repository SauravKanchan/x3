import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { LinkCreated } from "../generated/schema"
import { LinkCreated as LinkCreatedEvent } from "../generated/X3Link/X3Link"
import { handleLinkCreated } from "../src/x-3-link"
import { createLinkCreatedEvent } from "./x-3-link-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let ipfs_hash = "Example string value"
    let newLinkCreatedEvent = createLinkCreatedEvent(id, owner, ipfs_hash)
    handleLinkCreated(newLinkCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LinkCreated created and stored", () => {
    assert.entityCount("LinkCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LinkCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LinkCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ipfs_hash",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
