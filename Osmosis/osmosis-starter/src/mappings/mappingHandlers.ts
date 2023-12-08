import {
  MsgSwapExactAmountInMessage,
  MsgSwapExactAmountOutMessage,
  MsgJoinSwapShareAmountOutMessage,
} from "../types/CosmosMessageTypes";
import { Pool, Swap, SwapRoute, Direction, Message } from "../types";
import { CosmosBlock } from "@subql/types-cosmos";

async function checkGetPool(id: string, block: CosmosBlock): Promise<Pool> {
  // Check that the pool exists and create new ones if now
  let pool = await Pool.get(id);
  if (!pool) {
    pool = Pool.create({
      id,
      createdBlockHeight: BigInt(block.header.height),
      created: new Date(block.header.time.toISOString()),
    });
    await pool.save();
  }
  return pool;
}

function createSwap(
  msg:
    | MsgSwapExactAmountInMessage
    | MsgSwapExactAmountOutMessage
    | MsgJoinSwapShareAmountOutMessage,
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
  msg: MsgSwapExactAmountInMessage
): Promise<void> {
  logger.info(
    `Processing MsgSwapExactAmountIn at block ${msg.block.header.height.toString()}`
  );
  // We first create a new swap record
  const swap = createSwap(msg, Direction.IN, Message.MsgSwapExactAmountIn);
  swap.tokenInDenom = msg.msg.decodedMsg.tokenIn?.denom;
  swap.tokenInAmount = msg.msg.decodedMsg.tokenIn
    ? BigInt(msg.msg.decodedMsg.tokenIn.amount)
    : undefined;
  swap.tokenOutMin = BigInt(msg.msg.decodedMsg.tokenOutMinAmount);

  // Save this to the DB
  await swap.save();

  // Create swap routes from the array on the message
  let currentTokenInDenom = swap.tokenInDenom;
  for (const route of msg.msg.decodedMsg.routes) {
    const index = msg.msg.decodedMsg.routes.indexOf(route);
    // Check that the pool aready exists
    const pool = await checkGetPool(route.poolId.toString(), msg.block);

    const swapRoute = SwapRoute.create({
      id: `${msg.tx.hash}-${msg.idx}-${index}`,
      poolId: pool.id,
      swapId: swap.id,
      tokenInDenom: currentTokenInDenom,
      tokenOutDenom: route.tokenOutDenom,
    });
    currentTokenInDenom = route.tokenOutDenom;
    await swapRoute.save();
  }
}

export async function handleMsgSwapExactAmountOut(
  msg: MsgSwapExactAmountOutMessage
): Promise<void> {
  logger.info(
    `Processing MsgSwapExactAmountOut at block ${msg.block.header.height.toString()}`
  );
  // We first create a new swap record
  const swap = createSwap(msg, Direction.OUT, Message.MsgSwapExactAmountOut);
  swap.tokenOutDenom = msg.msg.decodedMsg.tokenOut.denom;
  swap.tokenOutAmount = msg.msg.decodedMsg.tokenOut
    ? BigInt(msg.msg.decodedMsg.tokenOut.amount)
    : undefined;
  swap.tokenInMax = BigInt(msg.msg.decodedMsg.tokenInMaxAmount);

  // Save this to the DB
  await swap.save();

  // Create swap routes from the array on the message
  let currentTokenOutDenom = swap.tokenOutDenom;
  for (const route of msg.msg.decodedMsg.routes) {
    const index = msg.msg.decodedMsg.routes.indexOf(route);
    // Check that the pool aready exists
    const pool = await checkGetPool(route.poolId.toString(), msg.block);

    const swapRoute = SwapRoute.create({
      id: `${msg.tx.hash}-${msg.idx}-${index}`,
      poolId: pool.id,
      swapId: swap.id,
      tokenInDenom: route.tokenInDenom,
      tokenOutDenom: currentTokenOutDenom,
    });
    currentTokenOutDenom = route.tokenInDenom;
    await swapRoute.save();
  }
}

export async function handleMsgJoinSwapShareAmountOut(
  msg: MsgJoinSwapShareAmountOutMessage
): Promise<void> {
  logger.info(
    `Processing MsgJoinSwapShareAmountOut at block ${msg.block.header.height.toString()}`
  );
  // We first create a new swap record
  const swap = createSwap(msg, Direction.IN, Message.MsgJoinSwapShareAmountOut);
  swap.tokenInDenom = msg.msg.decodedMsg.tokenInDenom;
  swap.tokenInMax = BigInt(msg.msg.decodedMsg.tokenInMaxAmount);
  swap.tokenOutAmount = BigInt(msg.msg.decodedMsg.shareOutAmount);

  // Save this to the DB
  await swap.save();

  // Create swap routes from the array on the message
  const pool = await checkGetPool(
    msg.msg.decodedMsg.poolId.toString(),
    msg.block
  );

  const swapRoute = SwapRoute.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    poolId: pool.id,
    swapId: swap.id,
    tokenInDenom: msg.msg.decodedMsg.tokenInDenom,
  });
  await swapRoute.save();
}
