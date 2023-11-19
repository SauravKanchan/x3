import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { LinkCreated } from "../generated/X3Link/X3Link"

export function createLinkCreatedEvent(
  id: BigInt,
  owner: Address,
  ipfs_hash: string
): LinkCreated {
  let linkCreatedEvent = changetype<LinkCreated>(newMockEvent())

  linkCreatedEvent.parameters = new Array()

  linkCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  linkCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  linkCreatedEvent.parameters.push(
    new ethereum.EventParam("ipfs_hash", ethereum.Value.fromString(ipfs_hash))
  )

  return linkCreatedEvent
}
