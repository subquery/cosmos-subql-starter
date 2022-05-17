import { Block, ExecuteEvent, Message, Transaction } from "../types";
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
  record.sender = msg.msg.sender;
  record.contract = msg.msg.contract;
  await record.save();
}

export async function handleEvent(
  event: CosmosEvent
): Promise<void> {
  const record = new ExecuteEvent(
    `${event.tx.tx.hash}-${event.msg.idx}-${event.idx}`
  );
  record.blockHeight = BigInt(event.block.block.header.height);
  record.txHash = event.tx.tx.hash;
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "_contract_address":
        record.contractAddress = attr.value;
        break;
      default:
    }
  }
  await record.save();
}
