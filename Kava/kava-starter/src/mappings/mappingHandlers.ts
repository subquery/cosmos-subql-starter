import { stringify } from "querystring";
import { Transfers } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const newTransfers = new Transfers(
    `${event.tx.hash}-${event.msg.idx}-${event.idx}`
  );

  logger.info(
    `New transfer event at block ${event.block.block.header.height}`
  );

 newTransfers.blockHeight = BigInt(event.block.block.header.height);
 newTransfers.txHash = event.tx.hash;
 newTransfers.fromAddress = event.msg.msg.decodedMsg.fromAddress;
 newTransfers.toAddress = event.msg.msg.decodedMsg.toAddress;

 for(const attr of event.event.attributes) {
  switch(attr.key) {
    case "amount":
      newTransfers.amount = attr.value;
      break;
    case "denomination":
      newTransfers.denomination = attr.value;
      break;
    default:
      break;
  }
}

 await newTransfers.save();
}
