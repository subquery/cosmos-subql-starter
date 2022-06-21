import { ExecuteEvent, Message, Transaction } from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";

export async function handleBlock(block: CosmosBlock): Promise<void> {
  // If you wanted to index each block in Cosmos (Juno), you could do that here
}

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  const transactionRecord = new Transaction(tx.hash);
  transactionRecord.blockHeight = BigInt(tx.block.block.header.height);
  transactionRecord.timestamp = tx.block.block.header.time;
  await transactionRecord.save();
}

export async function handleMessage(msg: CosmosMessage): Promise<void> {
  const messageRecord = new Message(`${msg.tx.hash}-${msg.idx}`);
  messageRecord.blockHeight = BigInt(msg.block.block.header.height);
  messageRecord.txHash = msg.tx.hash;
  messageRecord.sender = msg.msg.decodedMsg.sender;
  messageRecord.contract = msg.msg.decodedMsg.contract;
  await messageRecord.save();
}

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = new ExecuteEvent(
    `${event.tx.hash}-${event.msg.idx}-${event.idx}`
  );
  eventRecord.blockHeight = BigInt(event.block.block.header.height);
  eventRecord.txHash = event.tx.hash;
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "_contract_address":
        eventRecord.contractAddress = attr.value;
        break;
      default:
    }
  }
  await eventRecord.save();
}
