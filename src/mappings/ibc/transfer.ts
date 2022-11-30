import {CosmosEvent} from "@subql/types-cosmos";
import {IbcTransfer} from "../../types";
import {attemptHandling, messageId, unprocessedEventHandler} from "../utils";

export async function handleIBCTransfer(event: CosmosEvent): Promise<void> {
  await attemptHandling(event, _handleIBCTransfer, unprocessedEventHandler);
}

async function _handleIBCTransfer(event: CosmosEvent): Promise<void> {
  const msg = event.msg;
  logger.info(`[handleIBCTransfer] (tx ${msg.tx.hash}): indexing message ${msg.idx + 1} / ${msg.tx.decodedTx.body.messages.length}`);
  logger.debug(`[handleIBCTransfer] (msg.msg): ${JSON.stringify(msg.msg, null, 2)}`);

  const decodedMsg = msg.msg.decodedMsg;
  const sourcePort = decodedMsg.sourcePort;
  const sourceChannel = decodedMsg.sourceChannel;
  const tokenAmount = decodedMsg.token?.amount;
  const tokenDenom = decodedMsg.token?.denom;
  const sender = decodedMsg.sender;
  const receiver = decodedMsg.receiver;

  if (!sourcePort || !sourceChannel || !tokenAmount || !tokenDenom || !sender || !receiver) {
    logger.warn(`[handleIBCTransfer] (tx ${msg.tx.hash}): cannot index message (msg.msg): ${JSON.stringify(msg.msg, null, 2)}`);
    return;
  }

  const id = messageId(msg);
  const transferEntity = IbcTransfer.create({
    id,
    toAddress: receiver,
    fromAddress: sender,
    amount: {amount: tokenAmount, denom: tokenDenom},
    denom: tokenDenom,
    sourcePort,
    sourceChannel,
    eventId: `${messageId(event)}-${event.idx}`,
    messageId: id,
    transactionId: msg.tx.hash,
    blockId: msg.block.block.id
  });

  await transferEntity.save();
}
