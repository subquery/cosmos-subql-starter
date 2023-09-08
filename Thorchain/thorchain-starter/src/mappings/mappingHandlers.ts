import { Coin, Deposit, DepositCoin } from "../types";
import {MsgDepositMessage} from "../types/CosmosMessageTypes";

/*
export async function handleBlock(block: CosmosBlock): Promise<void> {
  // If you want to index each block in Thorchain, you could do that here
}
*/

/*
export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  // If you want to index each transaction in Thorchain, you could do that here
  const transactionRecord = Transaction.create({
    id: tx.hash,
    blockHeight: BigInt(tx.block.block.header.height),
    timestamp: tx.block.block.header.time,
  });
  await transactionRecord.save();
}
*/

export async function handleMessage(
  msg: MsgDepositMessage
): Promise<void> {
  // Create Deposit record
  const depositEntity = Deposit.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    signer: msg.msg.decodedMsg.signer.toString(),
    memo: msg.msg.decodedMsg.memo,
  });
  await depositEntity.save();

  // Iterate through coins
  for (let coin of msg.msg.decodedMsg.coins) {
    // Check if the coin exists
    let coinEntity = await Coin.get(`${coin.asset.chain}-${coin.asset.symbol}`);
    if (!coinEntity) {
      // Does not exist, create
      coinEntity = Coin.create({
        id: `${coin.asset.chain}-${coin.asset.symbol}`,
        chain: coin.asset.chain,
        symbol: coin.asset.symbol,
        ticker: coin.asset.ticker,
        synth: coin.asset.synth,
      });
      await coinEntity.save();
    }

    // Create Deposit Coin link
    await DepositCoin.create({
      id: `${msg.tx.hash}-${msg.idx}-${coin.asset.chain}-${coin.asset.symbol}`,
      depositId: depositEntity.id,
      coinId: coinEntity.id,
      amount: BigInt(coin.amount),
    }).save();
  }
}
