import { Transfers } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const newTransfers = new Transfers(
    `${event.tx.hash}-${event.msg.idx}-${event.idx}`
  );

 newTransfers.blockHeight = BigInt(event.block.block.header.height);
 newTransfers.txHash = event.tx.hash;
 newTransfers.fromAddress = event.msg.msg.decodedMsg.fromAddress;
 newTransfers.toAddress = event.msg.msg.decodedMsg.toAddress;
 newTransfers.amount = event.msg.msg.decodedMsg.amount;

 await newTransfers.save();
}
