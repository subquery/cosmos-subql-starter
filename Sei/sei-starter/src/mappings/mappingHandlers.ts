import { PlacedOrders } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  // We create a new entity using the transaction hash and message index as a unique ID
  logger.info(
    `New delegator reward event at block ${event.block.block.header.height}`
  );
  const newPlacedOrders = new PlacedOrders(
    `${event.tx.hash}-${event.msg.idx}-${event.idx}`
  );

  newPlacedOrders.blockHeight = BigInt(event.block.block.header.height);
  newPlacedOrders.txHash = event.tx.hash;

  // Cosmos events code attributes as an array of key value pairs, we're looking for an amount
  for (const attr of event.event.attributes) {
    if (attr.key === "amount") {
      //newPlacedOrders.rewardAmount = attr.value;
    }
  }
  await newPlacedOrders.save();
}
