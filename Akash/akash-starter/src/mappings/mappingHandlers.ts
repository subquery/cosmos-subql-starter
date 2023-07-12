import { DelegatorReward } from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";

/*
export async function handleBlock(block: CosmosBlock): Promise<void> {
  // If you want to index each block in Cosmos (Juno), you could do that here
}

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  // If you want to index each transaction in Cosmos (Juno), you could do that here
  const transactionRecord = Transaction.create({
    id: tx.hash,
    blockHeight: BigInt(tx.block.block.header.height),
    timestamp: tx.block.block.header.time,
  });
  await transactionRecord.save();
}
*/

export async function handleReward(event: CosmosEvent): Promise<void> {
  
  logger.info(
    `New Reward Withdraw event at block ${event.block.header.height.toString()}`
  );
  const rewardRecord = DelegatorReward.create({
    id: event.tx.hash,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    feeDenomination: event.tx.decodedTx.authInfo.fee?.amount[0].denom,
    feeAmount: event.tx.decodedTx.authInfo.fee?.amount[0].amount ,
    rewardAmount: event.event.attributes.find((a) => a.key === "amount")?.value,
    delegatorAddress: event.msg.msg.decodedMsg.delegator_address,
    validatorAddress: event.msg.msg.decodedMsg.validator_address,
  });
  await rewardRecord.save();
}

/*export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = ExecuteEvent.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    contractAddress: event.event.attributes.find(attr => attr.key === '_contract_address').value
  });

  await eventRecord.save();
}*/
