import { DepositConfirmation } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

/*
export async function handleBlock(block: CosmosBlock): Promise<void> {
  // If you want to index each block in Cosmos (CosmosHub), you could do that here
}

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  // If you want to index each transaction in Cosmos (CosmosHub), you could do that here
  const transactionRecord = Transaction.create({
    id: tx.hash,
    blockHeight: BigInt(tx.block.block.header.height),
    timestamp: tx.block.block.header.time,
  });
  await transactionRecord.save();
}

export async function handleMessage(msg: CosmosMessage): Promise<void> {
  logger.warn("in message handler")
  const messageRecord = Message.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    from: msg.msg.decodedMsg.fromAddress,
    to: msg.msg.decodedMsg.toAddress,
    amount: JSON.stringify(msg.msg.decodedMsg.amount),
  });
  logger.warn("** blockHeight is: " + messageRecord.blockHeight)
  await messageRecord.save();
}
*/

export async function handleEvent(event: CosmosEvent): Promise<void> {
  logger.warn("New Event: " + JSON.stringify(event.event));
  // Cosmos events code attributes as an array of key value pairs
  const actionAttribute = event.event.attributes.find(
    (a) => a.key === "action",
  );
  if (actionAttribute && actionAttribute.value == "confirm") {
    // We are only looking for events with the confirm type
    const eventRecord = DepositConfirmation.create({
      id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
      blockHeight: BigInt(event.block.block.header.height),
      txHash: event.tx.hash,
      sourceChain: "", // Initialize optional properties with empty string
      from: "",
      to: "",
      toChain: "",
      amount: "",
      asset: undefined,
      transferID: "",
    });
    for (const attr of event.event.attributes) {
      switch (attr.key) {
        case "sourceChain":
          eventRecord.sourceChain = attr.value;
          break;
        case "depositAddress":
          eventRecord.from = attr.value;
          break;
        case "destinationAddress":
          eventRecord.to = attr.value;
          break;
        case "destinationChain":
          eventRecord.toChain = attr.value;
          break;
        case "amount":
          eventRecord.amount = attr.value;
          break;
        case "asset":
          eventRecord.asset = attr.value;
          break;
        case "transferID":
          eventRecord.transferID = attr.value;
          break;
        default:
          break;
      }
    }
    await eventRecord.save();
  }
}
