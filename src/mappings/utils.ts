import {CosmosBlock, CosmosEvent, CosmosMessage, CosmosTransaction} from "@subql/types-cosmos";
import {Account, Interface, UnprocessedEntity} from "../types";
import {createHash} from "crypto";
import {Attribute} from "@cosmjs/stargate/build/logs";

export type Primitive = CosmosEvent | CosmosMessage | CosmosTransaction | CosmosBlock;

export interface Primitives {
  event?: CosmosEvent;
  msg?: CosmosMessage;
  tx?: CosmosTransaction;
  block?: CosmosBlock;
}

// messageId returns the id of the message passed or
// that of the message which generated the event passed.
export function messageId(msg: CosmosMessage | CosmosEvent): string {
  return `${msg.tx.hash}-${msg.idx}`;
}

export async function checkBalancesAccount(address: string, chainId: string) {
  let accountEntity = await Account.get(address);
  if (typeof (accountEntity) === "undefined") {
    accountEntity = Account.create({id: address, chainId});
    await accountEntity.save();
  }
}

export function getJaccardResult(payload: object): Interface {
  let prediction = Structure, prediction_coefficient = 0.5;   // prediction coefficient can be set as a minimum threshold for the certainty of an output
  let diff = 0, match = 0, coefficient = 0;                   // where coefficient of 1 is a perfect property key match, 2 is a perfect match of property and type
  const structs = [CW20Structure, LegacyBridgeSwapStructure];
  structs.forEach((struct) => {
    Object.keys(payload).forEach((payload_key) => {
      if (struct.listProperties().some((prop) => prop === payload_key)) { // If payload property exists as a property within current structure
        match++;
        if (payload[payload_key] && typeof (payload[payload_key]) === struct.getPropertyType(payload_key)) { // award bonus point for same value datatype
          match++;
        }
      } else {
        diff++;
      }
    });
    // If a set of properties is greatly different from ideal set, size of union is larger and num of matches is smaller
    const union = (struct.listProperties().length + diff);  // num of total properties to match + num of those that didn't match
    coefficient = match / union;                          // num of properties that matched divided by union is Jaccard Coefficient
    if (coefficient > prediction_coefficient) { // if current comparison gives the highest matching score (above minimum threshold), set as current best fit
      prediction_coefficient = coefficient;
      prediction = struct;
    }
    coefficient = match = diff = 0;
  });
  return prediction.getInterface(); // return best matched Interface to contract
}

export async function attemptHandling(input: Primitive,
  handlerFn: (primitive) => Promise<void>,
  errorFn: (Error, Primitive) => void): Promise<void> {
  try {
    await handlerFn(input);
  } catch (error) {
    errorFn(error, input);
  }
}

export async function unprocessedEventHandler(err: Error, event: CosmosEvent): Promise<void> {
  await trackUnprocessed(err, primitivesFromEvent(event));
}

export function primitivesFromTx(tx: CosmosTransaction): Primitives {
  return {block: tx.block, tx: tx};
}

export function primitivesFromMsg(msg: CosmosMessage): Primitives {
  return {block: msg.block, tx: msg.tx};
}

export function primitivesFromEvent(event: CosmosEvent): Primitives {
  return {block: event.block, tx: event.tx};
}

export async function trackUnprocessed(error: Error, primitives: Primitives): Promise<void> {
  logger.warn(`[trackUnprocessable] (error.message): ${error.message}`);
  // NB: failsafe try/catch
  try {
    const {event, msg, tx, block} = primitives;
    const sha256 = createHash("sha256");
    // NB: use error stack if no primitives available (i.e. block handler).
    const hashInput = event ?
      messageId(event) : msg ?
        messageId(msg) : tx ?
          tx.hash : block ?
            block.block.id : error.stack;
    sha256.write(hashInput);
    sha256.end();
    // NB: ID is base64 encoded representation of the sha256 of either:
    // 1. the conventional ID of the "highest-level" primitive available or
    // 2. the error stacktrace, if none are available (i.e. handle block error)
    const id = sha256.read().toString("base64");
    const eventId = event ? messageId(event) : undefined;
    const _messageId = event ? messageId(event) : undefined;
    const transactionId = tx ? tx.hash : undefined;

    const unprocessedEntity = UnprocessedEntity.create({
      id,
      error: error.stack,
      eventId,
      messageId: _messageId,
      transactionId,
      blockId: block.block.id,
    });
    return await unprocessedEntity.save();
  } catch {
    logger.error("[trackUnprocessable] (ERROR): unable to persist unprocessable entity");
    logger.error(`[trackUnprocessable] (ERROR | stack): ${error.stack}`);
  }
}

class Structure {
  static getInterface() {
    return Interface.Uncertain;
  }
}

class CW20Structure extends Structure {
  private name = "";
  private symbol = "";
  private decimals = 0;
  private initial_balances: [{ amount: bigint, address: string }] = [{amount: BigInt(0), address: ""}];
  private mint: { minter: string } = {minter: ""};

  static listProperties() {
    const a = new CW20Structure();
    return Object.getOwnPropertyNames(a);
  }

  static getPropertyType(prop: string) {
    const a = new CW20Structure();
    return typeof (a[prop]);
  }

  static getInterface() {
    return Interface.CW20;
  }
}

class LegacyBridgeSwapStructure extends Structure {
  private cap = BigInt(0);
  private reverse_aggregated_allowance = BigInt(0);
  private reverse_aggregated_allowance_approver_cap = BigInt(0);
  private lower_swap_limit = BigInt(0);
  private upper_swap_limit = BigInt(0);
  private swap_fee = BigInt(0);
  private paused_since_block = BigInt(0);
  private denom = "";
  private next_swap_id = "";

  static listProperties() {
    const a = new LegacyBridgeSwapStructure();
    return Object.getOwnPropertyNames(a);
  }

  static getPropertyType(prop: string) {
    const a = new LegacyBridgeSwapStructure();
    return typeof (a[prop]);
  }

  static getInterface() {
    return Interface.LegacyBridgeSwap;
  }
}

export interface BaseEventAttributesI {
  action: string;
}

// (see: https://github.com/CosmWasm/wasmd/blob/main/x/wasm/keeper/events.go)
export interface WasmdEventAttributesI extends BaseEventAttributesI {
  _contract_address: string;
}

export function parseAttributes<T extends BaseEventAttributesI>(attributes: readonly Attribute[]): T {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return attributes.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc as T;
  }, {});
}
