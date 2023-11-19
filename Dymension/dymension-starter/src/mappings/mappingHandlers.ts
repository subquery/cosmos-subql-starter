import { Transfer } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = Transfer.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    toAddress: "",
    amount: "",
    fromAddress: "",
  });
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "recipient":
        eventRecord.toAddress = attr.value;
        break;
      case "amount":
        eventRecord.amount = attr.value;
        break;
      case "sender":
        eventRecord.fromAddress = attr.value;
        break;
      default:
        break;
    }
  }
  await eventRecord.save();
}
