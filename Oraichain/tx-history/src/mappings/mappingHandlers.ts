import { CosmosEvent, CosmosMessage } from "@subql/types-cosmos";
import { Message, TransferEvent } from "../types";

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

export async function handleMessage(msg: CosmosMessage): Promise<void> {
  const messageRecord = Message.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    from: msg.msg.decodedMsg.fromAddress,
    to: msg.msg.decodedMsg.toAddress,
    fee: JSON.stringify(msg.tx.decodedTx.authInfo.fee?.amount ?? []),
    denom: msg.msg.decodedMsg.amount[0]?.denom,
    amount: msg.msg.decodedMsg.amount[0]?.amount,
    status: msg.tx.tx.code.toString(),
    timestamp: msg.block.block.header.time?.valueOf().toString() ?? "0",
    type: "native",
  });
  await messageRecord.save();
}

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = TransferEvent.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    fee: JSON.stringify(event.tx.decodedTx.authInfo.fee?.amount ?? []),
    status: event.tx.tx.code.toString(),
    timestamp: event.block.block.header.time?.valueOf().toString() ?? "0",
    recipient: "",
    amount: "",
    sender: "",
  });
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "recipient":
        eventRecord.recipient = attr.value as any;
        break;
      case "amount":
        eventRecord.amount = attr.value as any;
        break;
      case "sender":
        eventRecord.sender = attr.value as any;
        break;
      default:
        break;
    }
  }
  await eventRecord.save();
}

export async function handleMsgExecuteContract(
  msg: CosmosMessage
): Promise<void> {
  const decodedData = msg.msg.decodedMsg;

  const basicTxData = {
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    fee: JSON.stringify(msg.tx.decodedTx.authInfo.fee?.amount ?? []),
    amount: JSON.stringify(decodedData.amount),
    status: msg.tx.tx.code.toString(),
    timestamp: msg.block.block.header.time?.valueOf().toString() ?? "0",
  };

  let mainData: Pick<
    Message,
    "from" | "to" | "tokenContractAddress" | "amount" | "type"
  > | null = null;

  // send cw20
  if (decodedData.msg && "send" in decodedData.msg) {
    const { amount, contract } = decodedData.msg.send;
    mainData = {
      from: decodedData.sender,
      to: contract,
      tokenContractAddress: decodedData.contract,
      amount,
      type: "cw20",
    };
  } else if (decodedData.msg && "transfer" in decodedData.msg) {
    // receive token
    const { amount, recipient } = decodedData.msg.transfer;
    mainData = {
      from: decodedData.sender,
      to: recipient,
      tokenContractAddress: decodedData.contract,
      amount,
      type: "cw20",
    };
  }

  if (!mainData) return;

  const messageRecord = Message.create({
    ...basicTxData,
    ...mainData,
  });
  await messageRecord.save();
}
