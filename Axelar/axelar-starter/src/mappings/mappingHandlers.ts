import {DepositConfirmation} from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";

type depositConfirmationMsg = {
  type: string;
  attributes: {        
    key: string;
    value: string;
  }[];
}

/*
export async function handleBlock(block: CosmosBlock): Promise<void> {
  // If you want to index each block in Cosmos (CosmosHub), you could do that here
}
*/

/*
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
  logger.warn("in event handler: " + JSON.stringify(event.event))
  const eventRecord = new DepositConfirmation(
    `${event.tx.hash}-${event.msg.idx}-${event.idx}`
  );
  eventRecord.blockHeight = BigInt(event.block.block.header.height);
  eventRecord.txHash = event.tx.hash;

  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "sourceChain":
        eventRecord.sourceChain = attr.value;
        break;
      case "amount":
        eventRecord.depositAddress = attr.value;
        break;
      case "sender":
        eventRecord.destinationChain = attr.value;
        break;
      default:
        break;
    }
  }
  await eventRecord.save();
}
