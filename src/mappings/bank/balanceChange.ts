import {CosmosEvent} from "@subql/types-cosmos";
import {NativeBalanceChange, Transaction} from "../../types";
import {
  attemptHandling,
  checkBalancesAccount,
  messageId,
  unprocessedEventHandler
} from "../utils";
import {parseCoins} from "../../cosmjs/utils";

export async function saveNativeBalanceEvent(id: string, address: string, amount: bigint, denom: string, event: CosmosEvent) {
  await checkBalancesAccount(address, event.block.block.header.chainId);
  const nativeBalanceChangeEntity = NativeBalanceChange.create({
    id,
    balanceOffset: amount.valueOf(),
    denom,
    accountId: address,
    eventId: `${messageId(event)}-${event.idx}`,
    blockId: event.block.block.id,
    transactionId: event.tx.hash,
  });
  await nativeBalanceChangeEntity.save();
}

async function saveNativeFeesEvent(event: CosmosEvent) {
  const transaction = await Transaction.get(event.tx.hash);
  const {fees, signerAddress} = transaction;
  const fee = fees.length > 0 ? fees[0] : null;
  const feeAmountStr = fee ? fee.amount : 0;
  const feeAmount = BigInt(0) - BigInt(feeAmountStr);
  const feeDenom = fee ? fee.denom : "";
  await saveNativeBalanceEvent(`${event.tx.hash}-fee`, signerAddress, feeAmount, feeDenom, event);
}

export async function handleNativeBalanceDecrement(event: CosmosEvent): Promise<void> {
  await attemptHandling(event, _handleNativeBalanceDecrement, unprocessedEventHandler);
}

export async function handleNativeBalanceIncrement(event: CosmosEvent): Promise<void> {
  await attemptHandling(event, _handleNativeBalanceDecrement, unprocessedEventHandler);
}

async function _handleNativeBalanceDecrement(event: CosmosEvent): Promise<void> {
  logger.info(`[handleNativeBalanceDecrement] (tx ${event.tx.hash}): indexing event ${event.idx + 1} / ${event.tx.tx.events.length}`);
  logger.debug(`[handleNativeBalanceDecrement] (event.event): ${JSON.stringify(event.event, null, 2)}`);
  logger.debug(`[handleNativeBalanceDecrement] (event.log): ${JSON.stringify(event.log, null, 2)}`);

  // sample event.event.attributes:
  // [
  //   {"key":"spender","value":"fetch1jv65s3grqf6v6jl3dp4t6c9t9rk99cd85zdctg"},
  //   {"key":"amount","value":"75462013217046121atestfet"},
  //   {"key":"spender","value":"fetch1wurz7uwmvchhc8x0yztc7220hxs9jxdjdsrqmn"},
  //   {"key":"amount","value":"100atestfet"}
  // ]
  const spendEvents = [];
  for (const [i, e] of Object.entries(event.event.attributes)) {
    if (e.key !== "spender") {
      continue;
    }
    const spender = e.value;
    const amountStr = event.event.attributes[parseInt(i) + 1].value;

    // NB: some events contain empty string amounts
    if (amountStr === "") {
      logger.warn(`empty string amount; block: ${event.block.block.header.height}; event idx: ${event.idx}; message typeUrl: ${event.msg.msg.typeUrl}`);
      return;
    }

    const coin = parseCoins(amountStr)[0];
    const amount = BigInt(0) - BigInt(coin.amount); // save a negative amount for a "spend" event
    spendEvents.push({spender: spender, amount: amount, denom: coin.denom});
  }


  for (const [i, spendEvent] of Object.entries(spendEvents)) {
    await saveNativeBalanceEvent(`${messageId(event)}-spend-${i}`, spendEvent.spender, spendEvent.amount, spendEvent.denom, event);
  }
  await saveNativeFeesEvent(event);
}

async function _handleNativeBalanceIncrement(event: CosmosEvent): Promise<void> {
  logger.info(`[handleNativeBalanceIncrement] (tx ${event.tx.hash}): indexing event ${event.idx + 1} / ${event.tx.tx.events.length}`);
  logger.debug(`[handleNativeBalanceIncrement] (event.event): ${JSON.stringify(event.event, null, 2)}`);
  logger.debug(`[handleNativeBalanceIncrement] (event.log): ${JSON.stringify(event.log, null, 2)}`);

  // sample event.event.attributes:
  // [
  //   {"key":"receiver","value":"fetch1jv65s3grqf6v6jl3dp4t6c9t9rk99cd85zdctg"},
  //   {"key":"amount","value":"75462013217046121atestfet"},
  //   {"key":"receiver","value":"fetch1wurz7uwmvchhc8x0yztc7220hxs9jxdjdsrqmn"},
  //   {"key":"amount","value":"100atestfet"}
  // ]
  const receiveEvents = [];
  for (const [i, e] of Object.entries(event.event.attributes)) {
    if (e.key !== "receiver") {
      continue;
    }
    const receiver = e.value;
    const amountStr = event.event.attributes[parseInt(i) + 1].value;

    // NB: some events contain empty string amounts
    if (amountStr === "") {
      logger.warn(`empty string amount; block: ${event.block.block.header.height}; event idx: ${event.idx}; message typeUrl: ${event.msg.msg.typeUrl}`);
      return;
    }

    const coin = parseCoins(amountStr)[0];
    const amount = BigInt(coin.amount);
    receiveEvents.push({receiver, amount, denom: coin.denom});
  }

  for (const [i, receiveEvent] of Object.entries(receiveEvents)) {
    await saveNativeBalanceEvent(`${messageId(event)}-receive-${i}`, receiveEvent.receiver, receiveEvent.amount, receiveEvent.denom, event);
  }
  await saveNativeFeesEvent(event);
}
