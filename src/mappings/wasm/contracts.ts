import {CosmosEvent, CosmosMessage} from "@subql/types-cosmos";
import {ExecuteContractMsg} from "../types";
import {messageId} from "../utils";
import {ExecuteContractMessage} from "../../types";

export async function handleExecuteContractEvent(event: CosmosEvent): Promise<void> {
  const msg: CosmosMessage<ExecuteContractMsg> = event.msg
  logger.info(`[handleExecuteContractMessage] (tx ${msg.tx.hash}): indexing ExecuteContractMessage ${messageId(msg)}`)
  logger.debug(`[handleExecuteContractMessage] (event.msg.msg): ${JSON.stringify(msg.msg, null, 2)}`)

  const id = messageId(msg);
  const funds = msg?.msg?.decodedMsg?.funds, contract = msg?.msg?.decodedMsg?.contract
  const method = Object.keys(msg?.msg?.decodedMsg?.msg)[0];

  if (!funds || !contract || !method) {
    logger.warn(`[handleExecuteContractEvent] (tx ${event.tx.hash}): cannot index event (event.event): ${JSON.stringify(event.event, null, 2)}`)
    return
  }

  const msgEntity = ExecuteContractMessage.create({
    id,
    method,
    contract,
    funds,
    messageId: id,
    transactionId: msg.tx.hash,
    blockId: msg.block.block.id
  });

  // NB: no need to update msg ids in txs.

  await msgEntity.save();
}

