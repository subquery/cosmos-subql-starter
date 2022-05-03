import { Block, Message, Transaction, TransferEvent } from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";

export async function handleBlock(block: CosmosBlock): Promise<void> {

}

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  const record = new Transaction(tx.tx.hash);
  record.blockHeight = BigInt(tx.block.block.header.height);
  record.timestamp = tx.block.block.header.time;
  await record.save();
}

export async function handleMessage(
  msg: CosmosMessage
): Promise<void> {
  const record = new Message(`${msg.tx.tx.hash}-${msg.idx}`);
  record.blockHeight = BigInt(msg.block.block.header.height);
  record.txHash = msg.tx.tx.hash;
  record.fromAddress = msg.msg.fromAddress;
  record.toAddress = msg.msg.toAddress;
  record.amount = JSON.stringify(msg.msg.amount);
  await record.save();
}

export async function handleEvent(
  event: CosmosEvent
): Promise<void> {
  const record = new TransferEvent(
    `${event.tx.tx.hash}-${event.msg.idx}-${event.idx}`
  );
  record.blockHeight = BigInt(event.block.block.header.height);
  record.txHash = event.tx.tx.hash;
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "sender":
        record.sender = attr.value;
        break;
      case "recipient":
        record.recipient = attr.value;
        break;
      case "amount":
        record.amount = attr.value;
        break;
      default:
    }
  }
  await record.save();
}
