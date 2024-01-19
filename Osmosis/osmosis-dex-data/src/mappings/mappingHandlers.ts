import * as messages from "../types/CosmosMessageTypes";
import { Pool, Swap, SwapRoute, Direction, Message } from "../types";
import { CosmosBlock, CosmosMessage } from "@subql/types-cosmos";
import fetch from "node-fetch";
import { Event } from "../types/proto-interfaces/tendermint/abci/types";

interface DataItem {
  time: string;
  value: number;
}

function convertToCustomFormat(isoDateString: Date): string {
  const date = new Date(isoDateString);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function getObjectByDate(
  targetDate: string,
  dataArray: DataItem[]
): Promise<number | undefined> {
  let selectedObject: number | undefined;

  dataArray.forEach((data) => {
    if (data.time === targetDate) {
      selectedObject = data.value;
    }
  });

  return selectedObject;
}

async function getLiquidityPool(pool_id: string) {
  // logger.warn(`Pool id: ${pool_id}`);
  let response = await fetch(
    `https://api.osmosis.zone/pools/v2/liquidity/${pool_id}/chart`
  );
  let content = await response.json();
  // logger.warn(`Response status ${response.status}`);
  const parsedContent: DataItem[] = JSON.parse(JSON.stringify(content));
  return parsedContent;
}

async function checkGetPool(
  id: string,
  block: CosmosBlock
): Promise<[Pool, number | undefined]> {
  // logger.warn("Fetching Pool from database");
  let pool = await Pool.get(id);

  if (!pool) {
    logger.warn("Pool is not present");
    pool = Pool.create({
      id,
      createdBlockHeight: BigInt(block.header.height),
      created: new Date(block.header.time.toISOString()),
    });
    await pool.save();
    await cache.set(id, await getLiquidityPool(id));
  }

  const blockDate = convertToCustomFormat(
    new Date(block.header.time.toISOString())
  );
  let liquidity: number | undefined;
  let cachedLiquidity = await cache.get(id);
  // logger.warn(`Cached liquidity (1st check): ${cachedLiquidity}`);
  if (cachedLiquidity == undefined) {
    // logger.warn("Cache is undefined (possibly due to a reboot)");
    let pool_liquidity = await getLiquidityPool(id);
    // logger.warn(`Liquidity pool: ${pool_liquidity}`);
    await cache.set(id, pool_liquidity);
  }

  cachedLiquidity = await cache.get(id);
  // logger.warn(`Cached liquidity (2nd check): ${cachedLiquidity}`);
  liquidity = await getObjectByDate(blockDate, cachedLiquidity);

  if (liquidity == undefined) {
    logger.warn(
      "Failed to locate the liquidity for the associated pool on the swap date. Refreshing the cache and attempting the operation again"
    );
    await cache.set(id, await getLiquidityPool(id));
    liquidity = await getObjectByDate(blockDate, await cache.get(id));
  }

  return [pool, liquidity];
}

function createSwap(
  msg:
    | messages.osmosis.gamm.v1beta1.tx.MsgSwapExactAmountInMessage
    | messages.osmosis.gamm.v1beta1.tx.MsgSwapExactAmountOutMessage
    | messages.osmosis.gamm.v1beta1.tx.MsgJoinSwapShareAmountOutMessage,
  direction: Direction,
  message: Message
): Swap {
  return Swap.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    txHash: msg.tx.hash,
    blockHeight: BigInt(msg.block.header.height),
    sender: msg.msg.decodedMsg.sender,
    direction,
    message,
    date: new Date(msg.block.header.time.toISOString()),
  });
}

async function createSwapRoutes(msg: CosmosMessage, swap: Swap) {
  let stringified = msg.tx.tx.log;
  if (stringified != undefined) {
    let parsed = JSON.parse(stringified);
    for (const obj of parsed) {
      const { _, events } = obj;
      let eventIndex: number = 0;
      for (const event of events) {
        const typedEvent = event as Event;
        if (typedEvent.type === "token_swapped") {
          // logger.warn(`eventIndex ${eventIndex}`);
          let poolId: string = "";
          let tokensIn: string = "";
          let tokensOut: string = "";
          for (const attr of typedEvent.attributes) {
            // logger.warn(`key: ${attr.key}, value: ${attr.value}`);
            switch (attr.key.toString()) {
              case "pool_id":
                poolId = attr.value.toString();
                break;
              case "tokens_in":
                tokensIn = attr.value.toString();
                break;
              case "tokens_out":
                tokensOut = attr.value.toString();
                break;
            }
          }
          const [pool, liquidity] = await checkGetPool(poolId, msg.block);
          const swapRoute = SwapRoute.create({
            id: `${msg.tx.hash}-${msg.idx}-${eventIndex}`,
            poolId: pool.id,
            swapId: swap.id,
            poolLiquidity: liquidity,
            tokensIn: tokensIn,
            tokensOut: tokensOut,
          });
          await swapRoute.save();
          logger.info(msg.tx.hash);
          eventIndex += 1;
        }
      }
    }
  }
}

export async function handleMsgSwapExactAmountIn(
  msg: messages.osmosis.gamm.v1beta1.tx.MsgSwapExactAmountInMessage
): Promise<void> {
  logger.info(
    `Processing MsgSwapExactAmountIn at block ${msg.block.header.height.toString()}`
  );
  const swap = createSwap(msg, Direction.IN, Message.MsgSwapExactAmountIn);
  swap.tokenInDenom = msg.msg.decodedMsg.tokenIn?.denom;
  swap.tokenInAmount = msg.msg.decodedMsg.tokenIn
    ? BigInt(msg.msg.decodedMsg.tokenIn.amount)
    : undefined;
  swap.tokenOutMin = BigInt(msg.msg.decodedMsg.tokenOutMinAmount);
  await swap.save();
  createSwapRoutes(msg, swap);
}

export async function handleMsgSwapExactAmountOut(
  msg: messages.osmosis.gamm.v1beta1.tx.MsgSwapExactAmountOutMessage
): Promise<void> {
  logger.info(
    `Processing MsgSwapExactAmountOut at block ${msg.block.header.height.toString()}`
  );
  const swap = createSwap(msg, Direction.OUT, Message.MsgSwapExactAmountOut);
  swap.tokenOutDenom = msg.msg.decodedMsg.tokenOut.denom;
  swap.tokenOutAmount = msg.msg.decodedMsg.tokenOut
    ? BigInt(msg.msg.decodedMsg.tokenOut.amount)
    : undefined;
  swap.tokenInMax = BigInt(msg.msg.decodedMsg.tokenInMaxAmount);
  await swap.save();
  createSwapRoutes(msg, swap);
}

export async function handleMsgJoinSwapShareAmountOut(
  msg: messages.osmosis.gamm.v1beta1.tx.MsgJoinSwapShareAmountOutMessage
): Promise<void> {
  logger.info(
    `Processing MsgJoinSwapShareAmountOut at block ${msg.block.header.height.toString()}`
  );
  const swap = createSwap(msg, Direction.IN, Message.MsgJoinSwapShareAmountOut);
  swap.tokenInDenom = msg.msg.decodedMsg.tokenInDenom;
  swap.tokenInMax = BigInt(msg.msg.decodedMsg.tokenInMaxAmount);
  swap.tokenOutAmount = BigInt(msg.msg.decodedMsg.shareOutAmount);
  await swap.save();
  createSwapRoutes(msg, swap);
}
