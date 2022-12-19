import {CosmosBlock, CosmosEvent, CosmosMessage, CosmosTransaction} from "@subql/types-cosmos";
import {Block, Event, EventAttribute, Message, Transaction, TxStatus} from "../types";
import {
  attemptHandling,
  messageId,
  primitivesFromMsg,
  primitivesFromTx,
  trackUnprocessed,
  unprocessedEventHandler
} from "./utils";
import {createHash} from "crypto";
import {toBech32} from "@cosmjs/encoding";

export async function handleBlock(block: CosmosBlock): Promise<void> {
  await attemptHandling(block, _handleBlock, _handleBlockError);
}

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  await attemptHandling(tx, _handleTransaction, _handleTransactionError);
}

export async function handleMessage(msg: CosmosMessage): Promise<void> {
  await attemptHandling(msg, _handleMessage, _handleMessageError);
}

export async function handleEvent(event: CosmosEvent): Promise<void> {
  await attemptHandling(event, _handleEvent, unprocessedEventHandler);
}

async function _handleBlock(block: CosmosBlock): Promise<void> {
  logger.info(`[handleBlock] (block.header.height): indexing block ${block.block.header.height}`);

  const {id, header: {chainId, height, time}} = block.block;
  const timestamp = new Date(time);
  const blockEntity = Block.create({
    id,
    chainId,
    height: BigInt(height),
    timestamp
  });

  await blockEntity.save();
}

async function _handleTransaction(tx: CosmosTransaction): Promise<void> {
  logger.info(`[handleTransaction] (block ${tx.block.block.header.height}): indexing transaction ${tx.idx + 1} / ${tx.block.txs.length}`);
  logger.debug(`[handleTransaction] (tx.decodedTx): ${JSON.stringify(tx.decodedTx, null, 2)}`);
  logger.debug(`[handleTransaction] (tx.tx.log): ${tx.tx.log}`);

  let status = TxStatus.Error;
  if (tx.tx.log) {
    try {
      JSON.parse(tx.tx.log);
      status = TxStatus.Success;
    } catch {
      // NB: assume tx failed
    }
  }

  const pubKey: Uint8Array | undefined = tx.decodedTx.authInfo.signerInfos[0]?.publicKey?.value;
  let signerAddress;
  if (typeof (pubKey) !== "undefined") {
    // TODO: check key type and handle respectively
    // NB: ripemd160(sha256(pubKey)) only works for secp256k1 keys
    const ripemd160 = createHash("ripemd160");
    const sha256 = createHash("sha256");
    // TODO: understand why!!!
    // NB: pubKey has 2 "extra" bytes at the beginning as compared to the
    // base64-decoded representation/ of the same key when imported to
    // fetchd (`fetchd keys add --recover`) and shown (`fetchd keys show`).
    sha256.update(pubKey.slice(2));
    ripemd160.update(sha256.digest());
    // TODO: move prefix to config value or constant
    signerAddress = toBech32("fetch", ripemd160.digest());
  }

  const txEntity = Transaction.create({
    id: tx.hash,
    blockId: tx.block.block.id,
    gasUsed: BigInt(Math.trunc(tx.tx.gasUsed)),
    gasWanted: BigInt(Math.trunc(tx.tx.gasWanted)),
    memo: tx.decodedTx.body.memo,
    timeoutHeight: BigInt(tx.decodedTx.body.timeoutHeight.toString()),
    fees: tx.decodedTx.authInfo.fee.amount,
    log: tx.tx.log,
    status,
    signerAddress,
  });

  await txEntity.save();
}

async function _handleMessage(msg: CosmosMessage): Promise<void> {
  logger.info(`[handleMessage] (tx ${msg.tx.hash}): indexing message ${msg.idx + 1} / ${msg.tx.decodedTx.body.messages.length}`);
  logger.debug(`[handleMessage] (msg.msg): ${JSON.stringify(msg.msg, null, 2)}`);
  delete msg.msg?.decodedMsg?.wasmByteCode;
  const json = JSON.stringify(msg.msg.decodedMsg);
  const msgEntity = Message.create({
    id: messageId(msg),
    typeUrl: msg.msg.typeUrl,
    json,
    transactionId: msg.tx.hash,
    blockId: msg.block.block.id,
  });

  await msgEntity.save();
}

async function _handleEvent(event: CosmosEvent): Promise<void> {
  logger.info(`[handleEvent] (tx ${event.tx.hash}): indexing event ${event.idx + 1} / ${event.tx.tx.events.length}`);
  logger.debug(`[handleEvent] (event.event): ${JSON.stringify(event.event, null, 2)}`);
  logger.debug(`[handleEvent] (event.log): ${JSON.stringify(event.log, null, 2)}`);

  // NB: sanitize attribute values (may contain non-text characters)
  const sanitize = (value: unknown) => {
    const json = JSON.stringify(value);
    return json.substring(1, json.length - 1);
  };
  const attributes = event.event.attributes.map((attribute) => {
    const {key, value} = attribute;
    return {key, value: sanitize(value)};
  });

  const id = `${messageId(event)}-${event.idx}`;
  const eventEntity = Event.create({
    id,
    type: event.event.type,
    log: event.log.log,
    transactionId: event.tx.hash,
    blockId: event.block.block.id,
  });
  await eventEntity.save();

  for (const [i, attribute] of Object.entries(attributes)) {
    const attrId = `${id}-${i}`;
    const {key, value} = attribute;
    await EventAttribute.create({
      id: attrId,
      key,
      value,
      eventId: eventEntity.id,
    }).save();
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function _handleBlockError(err: Error, _: CosmosBlock): Promise<void> {
  // NB: we won't have persisted any related entities yet.
  await trackUnprocessed(err, {});
}

async function _handleTransactionError(err: Error, tx: CosmosTransaction): Promise<void> {
  await trackUnprocessed(err, primitivesFromTx(tx));
}

async function _handleMessageError(err: Error, msg: CosmosMessage): Promise<void> {
  await trackUnprocessed(err, primitivesFromMsg(msg));
}
