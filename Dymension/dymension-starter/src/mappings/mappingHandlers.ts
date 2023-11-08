import { Transfers } from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";

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
*/

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const newTransfers = new Transfers(
    `${event.tx.hash}-${event.msg.idx}-${event.idx}`
  );

 newTransfers.blockHeight = BigInt(event.block.block.header.height);
 newTransfers.txHash = event.tx.hash;
 newTransfers.fromAddress = event.msg.msg.decodedMsg.fromAddress;
 newTransfers.toAddress = event.msg.msg.decodedMsg.toAddress;
 newTransfers.amount = event.msg.msg.decodedMsg.amount;
 newTransfers.denomination = event.msg.msg.decodedMsg.denomination; 

 await newTransfers.save();
}
