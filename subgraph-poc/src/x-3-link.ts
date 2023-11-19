import { LinkCreated as LinkCreatedEvent } from "../generated/X3Link/X3Link"
import { LinkCreated } from "../generated/schema"

export function handleLinkCreated(event: LinkCreatedEvent): void {
  let entity = new LinkCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.X3Link_id = event.params.id
  entity.owner = event.params.owner
  entity.ipfs_hash = event.params.ipfs_hash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
