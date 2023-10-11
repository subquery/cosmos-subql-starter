import { MsgSwapExactAmountInMessage } from "../types/CosmosMessageTypes";
import { Pool, Swap, SwapRoute } from "../types";

async function checkGetPool(id: string): Promise<Pool> {
  // Check that the pool exists and create new ones if now
  let pool = await Pool.get(id);
  if (!pool) {
    pool = new Pool(id);
    await pool.save();
  }
  return pool;
}

export async function handleMessage(
  msg: MsgSwapExactAmountInMessage
): Promise<void> {
  // You can see an example record here https://www.mintscan.io/osmosis/txs/6A22C6C978A96D99FCB08826807C6EB1DCBDCEC6044C35105B624A81A1CB6E24?height=9798771
  logger.info(`New Swap Message received at block ${msg.block.header.height}`);
  // logger.info(JSON.stringify(msg.tx.tx.events)); // You can use this to preview the data

  // We first create a new swap record
  const swap = Swap.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    txHash: msg.tx.hash,
    blockHeight: BigInt(msg.block.block.header.height),
    sender: msg.msg.decodedMsg.sender,
    tokenInDenom: msg.msg.decodedMsg.tokenIn?.denom,
    tokenInAmount: msg.msg.decodedMsg.tokenIn
      ? BigInt(msg.msg.decodedMsg.tokenIn.amount)
      : undefined,
    tokenOutMin: BigInt(msg.msg.decodedMsg.tokenOutMinAmount),
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
