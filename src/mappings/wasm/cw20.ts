import {CosmosEvent} from "@subql/types-cosmos";
import {Cw20BalanceChange, Cw20Transfer} from "../../types";
import {
  attemptHandling,
  checkBalancesAccount,
  unprocessedEventHandler,
  messageId,
} from "../utils";

export async function saveCw20BalanceEvent(id: string, address: string, amount: bigint, contractId: string, event: CosmosEvent) {
  await checkBalancesAccount(address, event.block.block.header.chainId);
  const msgId = messageId(event.msg);
  const Cw20BalanceChangeEntity = Cw20BalanceChange.create({
    id,
    balanceOffset: amount.valueOf(),
    contractId,
    accountId: address,
    eventId: `${messageId(event)}-${event.idx}`,
    executeContractMessageId: msgId,
    messageId: msgId,
    blockId: event.block.block.id,
    transactionId: event.tx.hash,
  });
  await Cw20BalanceChangeEntity.save();
}

export async function handleCw20Transfer(event: CosmosEvent): Promise<void> {
  await attemptHandling(event, _handleCw20Transfer, unprocessedEventHandler);
}

export async function handleCw20BalanceMint(event: CosmosEvent): Promise<void> {
  await attemptHandling(event,
    _handleCw20BalanceMint,
    unprocessedEventHandler);
}

export async function handleCw20BalanceTransfer(event: CosmosEvent): Promise<void> {
  await attemptHandling(event,
    _handleCw20BalanceTransfer,
    unprocessedEventHandler);
}

async function _handleCw20Transfer(event: CosmosEvent): Promise<void> { // TODO: consolidate Cw20 functions and helpers
  const id = messageId(event.msg);
  logger.info(`[handleCw20Transfer] (tx ${event.tx.hash}): indexing Cw20Transfer ${id}`);
  logger.debug(`[handleCw20Transfer] (event.msg.msg): ${JSON.stringify(event.msg.msg, null, 2)}`);

  const msg = event.msg?.msg?.decodedMsg;
  const contractId = msg?.contract, fromAddress = msg?.sender;
  const toAddress = msg?.msg?.transfer?.recipient;
  const amount = msg?.msg?.transfer?.amount;


  if (!fromAddress || !amount || !toAddress || !contractId) {
    logger.warn(`[handleCw20Transfer] (tx ${event.tx.hash}): cannot index event (event.event): ${JSON.stringify(event.event, null, 2)}`);
    return;
  }

  const Cw20transfer = Cw20Transfer.create({
    id,
    toAddress,
    fromAddress,
    contractId,
    amount,
    messageId: id,
    transactionId: event.tx.hash,
    blockId: event.block.block.id
  });

  await Cw20transfer.save();
}

export async function handleCw20BalanceBurn(event: CosmosEvent): Promise<void> {
  const id = messageId(event.msg);
  logger.info(`[handleCw20BalanceBurn] (tx ${event.tx.hash}): indexing Cw20BalanceBurn ${id}`);
  logger.debug(`[handleCw20BalanceBurn] (event.msg.msg): ${JSON.stringify(event.msg.msg, null, 2)}`);

  const msg = event.msg.msg.decodedMsg;
  const fromAddress = msg.sender, contract = msg.contract;
  const amount = msg.msg?.burn?.amount;

  if (!fromAddress || !amount || !contract) {
    logger.warn(`[handleCw20BalanceBurn] (tx ${event.tx.hash}): cannot index event (event.event): ${JSON.stringify(event.event, null, 2)}`);
    return;
  }

  await saveCw20BalanceEvent(`${id}-burn`, fromAddress, BigInt(0) - BigInt(amount), contract, event);
}

async function _handleCw20BalanceMint(event: CosmosEvent): Promise<void> {
  const id = messageId(event.msg);
  logger.info(`[handleCw20BalanceMint] (tx ${event.tx.hash}): indexing Cw20BalanceMint ${id}`);
  logger.debug(`[handleCw20BalanceMint] (event.msg.msg): ${JSON.stringify(event.msg.msg, null, 2)}`);

  const msg = event.msg?.msg?.decodedMsg;
  const contract = msg?.contract;
  const amount = msg?.msg?.mint?.amount;
  const toAddress = msg?.msg?.mint?.recipient;

  if (!toAddress || !amount || !contract) {
    logger.warn(`[handleCw20BalanceMint] (tx ${event.tx.hash}): cannot index event (event.event): ${JSON.stringify(event.event, null, 2)}`);
    return;
  }

  await saveCw20BalanceEvent(`${id}-mint`, toAddress, BigInt(amount), contract, event);
}

async function _handleCw20BalanceTransfer(event: CosmosEvent): Promise<void> {
  const id = messageId(event.msg);
  logger.info(`[handleCw20BalanceTransfer] (tx ${event.tx.hash}): indexing Cw20BalanceTransfer ${id}`);
  logger.debug(`[handleCw20BalanceTransfer] (event.msg.msg): ${JSON.stringify(event.msg.msg, null, 2)}`);

  const msg = event.msg.msg.decodedMsg;
  const contract = msg?.contract, fromAddress = msg?.sender;
  const toAddress = msg?.msg?.transfer?.recipient;
  const amount = msg?.msg?.transfer?.amount;

  if (!fromAddress || !toAddress || !amount || !contract) {
    logger.warn(`[handleCw20BalanceTransfer] (tx ${event.tx.hash}): cannot index event (event.event): ${JSON.stringify(event.event, null, 2)}`);
    return;
  }

  await saveCw20BalanceEvent(`${id}-credit`, toAddress, BigInt(amount), contract, event);
  await saveCw20BalanceEvent(`${id}-debit`, fromAddress, BigInt(0) - BigInt(amount), contract, event);
}
