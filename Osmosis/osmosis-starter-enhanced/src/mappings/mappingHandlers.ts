import {
  MsgSwapExactAmountInMessage,
  MsgSwapExactAmountOutMessage,
  MsgJoinSwapShareAmountOutMessage,
} from "../types/CosmosMessageTypes";
import { Pool, Swap, SwapRoute, Direction, Message } from "../types";

async function checkGetPool(id: string): Promise<Pool> {
  // Check that the pool exists and create new ones if now
  let pool = await Pool.get(id);
  if (!pool) {
    pool = new Pool(id);
    await pool.save();
  }
  return pool;
}

export async function handleMsgSwapExactAmountOut(
  msg: MsgSwapExactAmountOutMessage
): Promise<void> {
  // We first create a new swap record
  const swap = Swap.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    txHash: msg.tx.hash,
    blockHeight: BigInt(msg.block.block.header.height),
    sender: msg.msg.decodedMsg.sender,
    direction: Direction.IN,
    message: Message.MsgSwapExactAmountIn,
    tokenOutDenom: msg.msg.decodedMsg.tokenOut.denom,
    tokenOutAmount: msg.msg.decodedMsg.tokenOut
      ? BigInt(msg.msg.decodedMsg.tokenOut.amount)
      : undefined,
    tokenInMax: BigInt(msg.msg.decodedMsg.tokenInMaxAmount),
    datetime: new Date(msg.block.header.time.toISOString()),
  });

  // Save this to the DB
  await swap.save();

  // Create swap routes from the array on the message
  let lastTokenOutDenom = swap.tokenOutDenom;
  for (const route of msg.msg.decodedMsg.routes) {
    const index = msg.msg.decodedMsg.routes.indexOf(route);
    // Check that the pool aready exists
    const pool = await checkGetPool(route.poolId.toString());

    const swapRoute = SwapRoute.create({
      id: `${msg.tx.hash}-${msg.idx}-${index}`,
      poolId: pool.id,
      swapId: swap.id,
      tokenInDenom: route.tokenInDenom,
      tokenOutDenom: lastTokenOutDenom,
    });
    lastTokenOutDenom = route.tokenInDenom;
    await swapRoute.save();
  }
}

export async function handleMsgJoinSwapShareAmountOut(
  msg: MsgJoinSwapShareAmountOutMessage
): Promise<void> {
  // We first create a new swap record
  const swap = Swap.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    txHash: msg.tx.hash,
    blockHeight: BigInt(msg.block.block.header.height),
    sender: msg.msg.decodedMsg.sender,
    direction: Direction.IN,
    message: Message.MsgJoinSwapShareAmountOut,
    tokenInDenom: msg.msg.decodedMsg.tokenInDenom,
    tokenInMax: BigInt(msg.msg.decodedMsg.tokenInMaxAmount),
    tokenOutAmount: BigInt(msg.msg.decodedMsg.shareOutAmount),

    datetime: new Date(msg.block.header.time.toISOString()),
  });

  // Save this to the DB
  await swap.save();

  // Create swap routes from the array on the message
  const pool = await checkGetPool(msg.msg.decodedMsg.poolId.toString());

  const swapRoute = SwapRoute.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    poolId: pool.id,
    swapId: swap.id,
    tokenInDenom: msg.msg.decodedMsg.tokenInDenom,
  });
  await swapRoute.save();
}

export async function handleMsgSwapExactAmountIn(
  msg: MsgSwapExactAmountInMessage
): Promise<void> {
  // We first create a new swap record
  const swap = Swap.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    txHash: msg.tx.hash,
    blockHeight: BigInt(msg.block.block.header.height),
    sender: msg.msg.decodedMsg.sender,
    direction: Direction.IN,
    message: Message.MsgSwapExactAmountIn,
    tokenInDenom: msg.msg.decodedMsg.tokenIn?.denom,
    tokenInAmount: msg.msg.decodedMsg.tokenIn
      ? BigInt(msg.msg.decodedMsg.tokenIn.amount)
      : undefined,
    tokenOutMin: BigInt(msg.msg.decodedMsg.tokenOutMinAmount),
    datetime: new Date(msg.block.header.time.toISOString()),
  });

  // Save this to the DB
  await swap.save();

  // Create swap routes from the array on the message
  let lastTokenOutDenom = swap.tokenInDenom;
  for (const route of msg.msg.decodedMsg.routes) {
    const index = msg.msg.decodedMsg.routes.indexOf(route);
    // Check that the pool aready exists
    const pool = await checkGetPool(route.poolId.toString());

    const swapRoute = SwapRoute.create({
      id: `${msg.tx.hash}-${msg.idx}-${index}`,
      poolId: pool.id,
      swapId: swap.id,
      tokenInDenom: lastTokenOutDenom,
      tokenOutDenom: route.tokenOutDenom,
    });
    lastTokenOutDenom = route.tokenOutDenom;
    await swapRoute.save();
  }
}
