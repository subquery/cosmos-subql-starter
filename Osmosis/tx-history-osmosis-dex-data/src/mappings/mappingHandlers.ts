import * as messages from "../types/CosmosMessageTypes";
import { Pool, Swap, SwapRoute, Direction, Message } from "../types";
import { CosmosBlock } from "@subql/types-cosmos";
import fetch from "node-fetch";

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
  try {
    logger.warn(`Pool id: ${pool_id}`);
    // let response = await fetch(`https://api.osmosis.zone/pools/v2/liquidity/${pool_id}/chart`);
    let response = await fetch(
      `https://api-osmosis.imperator.co/pools/v2/liquidity/${pool_id}/chart`
    );
    let content = await response.json();
    logger.warn(`Response status ${response.status}`);
    const parsedContent: DataItem[] = JSON.parse(JSON.stringify(content));
    logger.info("parsedContent: ", parsedContent);
    return parsedContent;
  } catch (error) {
    logger.error(`Error at getLiquidityPool: ${error}`);
  }
}

async function checkGetPool(id: string, block: CosmosBlock): Promise<[Pool, number | undefined]> {
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

  const blockDate = convertToCustomFormat(new Date(block.header.time.toISOString()));
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
    | messages.osmosis.gamm.v1beta1.tx.MsgSwapExactAmountOutMessage,
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

export async function handleMsgSwapExactAmountIn(
  msg: messages.osmosis.gamm.v1beta1.tx.MsgSwapExactAmountInMessage
): Promise<void> {
  logger.info(`Processing MsgSwapExactAmountIn at block ${msg.block.header.height.toString()}`);
  logger.info(`infotokne: ${JSON.stringify(msg.msg.decodedMsg)}`);
  // We first create a new swap record
  const swap = createSwap(msg, Direction.IN, Message.MsgSwapExactAmountIn);
  swap.tokenInDenom = msg.msg.decodedMsg.tokenIn?.denom;
  swap.tokenInAmount = msg.msg.decodedMsg.tokenIn
    ? BigInt(msg.msg.decodedMsg.tokenIn.amount)
    : undefined;
  swap.tokenOutMin = BigInt(msg.msg.decodedMsg.tokenOutMinAmount);

  const lastRoute = msg.msg.decodedMsg.routes[msg.msg.decodedMsg.routes.length - 1];
  swap.tokenOutDenom = lastRoute?.tokenOutDenom;

  // Save this to the DB
  await swap.save();

  // Create swap routes from the array on the message
  let currentTokenInDenom = swap.tokenInDenom;
  for (const route of msg.msg.decodedMsg.routes) {
    const index = msg.msg.decodedMsg.routes.indexOf(route);
    // Check that the pool aready exists
    const [pool, liquidity] = await checkGetPool(route.poolId.toString(), msg.block);

    const swapRoute = SwapRoute.create({
      id: `${msg.tx.hash}-${msg.idx}-${index}`,
      poolId: pool.id,
      swapId: swap.id,
      tokenInDenom: currentTokenInDenom,
      tokenOutDenom: route.tokenOutDenom,
      poolLiquidity: liquidity,
    });
    currentTokenInDenom = route.tokenOutDenom;
    await swapRoute.save();
  }
}

export async function handleMsgSwapExactAmountOut(
  msg: messages.osmosis.gamm.v1beta1.tx.MsgSwapExactAmountOutMessage
): Promise<void> {
  logger.info(`Processing MsgSwapExactAmountOut at block ${msg.block.header.height.toString()}`);
  // We first create a new swap record
  const swap = createSwap(msg, Direction.OUT, Message.MsgSwapExactAmountOut);
  swap.tokenOutDenom = msg.msg.decodedMsg.tokenOut.denom;
  swap.tokenOutAmount = msg.msg.decodedMsg.tokenOut
    ? BigInt(msg.msg.decodedMsg.tokenOut.amount)
    : undefined;
  swap.tokenInMax = BigInt(msg.msg.decodedMsg.tokenInMaxAmount);

  const lastRoute = msg.msg.decodedMsg.routes[msg.msg.decodedMsg.routes.length - 1];
  swap.tokenInDenom = lastRoute?.tokenInDenom;

  // Save this to the DB
  await swap.save();

  // Create swap routes from the array on the message
  let currentTokenOutDenom = swap.tokenOutDenom;
  for (const route of msg.msg.decodedMsg.routes) {
    const index = msg.msg.decodedMsg.routes.indexOf(route);
    // Check that the pool aready exists
    const [pool, liquidity] = await checkGetPool(route.poolId.toString(), msg.block);

    const swapRoute = SwapRoute.create({
      id: `${msg.tx.hash}-${msg.idx}-${index}`,
      poolId: pool.id,
      swapId: swap.id,
      tokenInDenom: route.tokenInDenom,
      tokenOutDenom: currentTokenOutDenom,
      poolLiquidity: liquidity,
    });
    currentTokenOutDenom = route.tokenInDenom;
    await swapRoute.save();
  }
}
