import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";
import { ContractMetadata, RewardWithdrawl } from "../types";

/*
export async function handleBlock(block: CosmosBlock): Promise<void> {
  // If you want to index each block in Cosmos (Archway), you could do that here
}

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  // If you want to index each transaction in Cosmos (Archway), you could do that here
  const transactionRecord = Transaction.create({
    id: tx.hash,
    blockHeight: BigInt(tx.block.block.header.height),
    timestamp: tx.block.block.header.time,
  });
  await transactionRecord.save();
}
*/

export async function handleSetContractMetadata(
  msg: CosmosMessage
): Promise<void> {
  logger.info(
    `New Set contract metadata at block ${msg.block.header.height.toString()} ${
      msg.msg.typeUrl
    }`
  );
}

export async function handleRewardsWithdrawEvent(
  event: CosmosEvent
): Promise<void> {
  logger.info(
    `New Reward Withdraw event at block ${event.block.header.height.toString()} ${
      event.msg?.msg.typeUrl
    } ${event.event.type} `
  );
}
