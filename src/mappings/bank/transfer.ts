import {CosmosEvent, CosmosMessage} from "@subql/types-cosmos";
import {NativeTransferMsg} from "../types";
import {messageId} from "../utils";
import {NativeTransfer} from "../../types";

export async function handleNativeTransfer(event: CosmosEvent): Promise<void> {
  const msg: CosmosMessage<NativeTransferMsg> = event.msg
  logger.info(`[handleNativeTransfer] (tx ${msg.tx.hash}): indexing message ${msg.idx + 1} / ${msg.tx.decodedTx.body.messages.length}`)
  logger.debug(`[handleNativeTransfer] (msg.msg): ${JSON.stringify(msg.msg, null, 2)}`)

  const fromAddress = msg.msg?.decodedMsg?.fromAddress;
  const toAddress = msg.msg?.decodedMsg?.toAddress
  const amounts = msg.msg?.decodedMsg?.amount;

  if (!fromAddress || !amounts || !toAddress) {
    logger.warn(`[handleNativeTransfer] (tx ${event.tx.hash}): cannot index event (event.event): ${JSON.stringify(event.event, null, 2)}`)
    return
  }

  // workaround: assuming one denomination per transfer message
  const denom = amounts[0].denom;
  const id = messageId(msg);
  const transferEntity = NativeTransfer.create({
    id,
    toAddress,
    fromAddress,
    amounts,
    denom,
    messageId: id,
    transactionId: msg.tx.hash,
    blockId: msg.block.block.id
  });

  await transferEntity.save();
}
