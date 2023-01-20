import {CosmosEvent} from "@subql/types-cosmos";
import {Cw20BalanceChange, Cw20Transfer, TuningData} from "../../types";
import {
  attemptHandling,
  checkBalancesAccount,
  unprocessedEventHandler,
  messageId,
} from "../utils";

export async function handleTuningContractExecute(event: CosmosEvent): Promise<void> {
  await attemptHandling(event, _handleTuningContractExecute, unprocessedEventHandler);
}

async function _handleTuningContractExecute(event: CosmosEvent): Promise<void> {
  logger.fatal("HERE : INSIDE _handleTuningContract")
  const id = messageId(event.msg);
  logger.info(`[handleTuningExecute] (tx ${event.tx.hash}): indexing TuningExecute ${id}`);
  logger.debug(`[handleTuningExecute] (event.msg.msg): ${JSON.stringify(event.msg.msg, null, 2)}`);

  const msg = event.msg?.msg?.decodedMsg;
  const contractId = msg?.contract;


  if (!contractId) {
    logger.warn(`[handleTuningExecute] (tx ${event.tx.hash}): cannot index event (event.event): ${JSON.stringify(event.event, null, 2)}`);
    return;
  }

  const TuningDataEntity = TuningData.create({
    id,
    balanceOffset: BigInt(1),
    contractId,
    accountId: "sample",
    executeContractMessageId: msg,
    eventId: "sample",
    messageId: id,
    transactionId: event.tx.hash,
    blockId: event.block.block.id
  });

  await TuningDataEntity.save();
}
