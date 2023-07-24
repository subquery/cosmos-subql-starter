import assert from "assert";
import { DelegatorReward, Delegator } from "../types";
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

  const recordAmountString = event.event.attributes.find(
    (a) => a.key === "amount"
  )?.value;
  const validatorAddress = event.event.attributes.find(
    (a) => a.key === "validator"
  )?.value;
  const delegatorAddress = event.tx.tx.events
    .find((e) => e.type === "coins_received")
    ?.attributes.find((a) => a.key === "receiver")?.value;

  var rewardBigInt = BigInt(0);
  if (recordAmountString && Array.from(recordAmountString)[0] != "0") {
    rewardBigInt = BigInt(recordAmountString.split("u")[0]);
  }

  // Confirm we have all required values
  assert(
    rewardBigInt && validatorAddress && delegatorAddress,
    "No reward or no msg found"
  );

  const rewardRecord = DelegatorReward.create({
    id: event.tx.hash,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    feeDenomination: event.tx.decodedTx.authInfo.fee?.amount[0].denom,
    feeAmount: event.tx.decodedTx.authInfo.fee?.amount[0].amount
      ? BigInt(event.tx.decodedTx.authInfo.fee?.amount[0].amount)
      : undefined,
    rewardAmount: rewardBigInt,
    delegatorId: delegatorAddress,
    validatorAddress: validatorAddress,
  });

  await handleDelegator(rewardRecord.rewardAmount, rewardRecord.delegatorId);
  await rewardRecord.save();
}

async function handleDelegator(reward: bigint, delegatorAddress: string) {
  let delegatorRecord = await Delegator.get(delegatorAddress);

  if (!delegatorRecord) {
    // Create new Delegator record
    delegatorRecord = Delegator.create({
      id: delegatorAddress,
      totalRewards: reward,
    });
    logger.info(
      "New delegator" + delegatorAddress + "with reward" + reward.toString()
    );
  } else {
    // Update delegators total
    delegatorRecord.totalRewards = delegatorRecord.totalRewards + reward;
  }
  await delegatorRecord.save();
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
