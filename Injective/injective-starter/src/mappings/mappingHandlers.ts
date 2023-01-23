import { SpotLimitOrder } from "../types";
import { CosmosMessage } from "@subql/types-cosmos";

type SpotLimitOrderMessage = {
  market_id: string;
  order_info: {
    subaccount_id: string;
    fee_recipient: string;
    price: string;
    quantity: string;
  };
  order_type: string;
  trigger_price?: any;
};

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

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = new TransferEvent(
    `${event.tx.hash}-${event.msg.idx}-${event.idx}`
  );
  eventRecord.blockHeight = BigInt(event.block.block.header.height);
  eventRecord.txHash = event.tx.hash;
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "recipient":
        eventRecord.recipient = attr.value;
        break;
      case "amount":
        eventRecord.amount = attr.value;
        break;
      case "sender":
        eventRecord.sender = attr.value;
        break;
      default:
        break;
    }
  }
  await eventRecord.save();
}
*/

export async function handleMessage(msg: CosmosMessage<SpotLimitOrderMessage>): Promise<void> {
  logger.info(JSON.stringify(msg));
  const spotLimitOrder = SpotLimitOrder.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    marketID: "",
    from: "",
    orderType: msg.msg.decodedMsg.order_type,
    triggerPrice: msg.msg.decodedMsg.trigger_price,
    subAccountID: msg.msg.decodedMsg.order_info.subaccount_id,
    feeRecipient: msg.msg.decodedMsg.order_info.fee_recipient,
    price: BigInt(msg.msg.decodedMsg.order_info.price),
    quantity: BigInt(msg.msg.decodedMsg.order_info.quantity),
  });
  await spotLimitOrder.save();
  
}
