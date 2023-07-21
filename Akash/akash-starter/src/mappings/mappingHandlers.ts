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
  
  const recordAmount = event.event.attributes.find((a) => a.key === "amount")?.value;
  const validatorAddress = event.event.attributes.find((a) => a.key === "validator")?.value;
  const delegatorAddress = event.tx.tx.events.find((e) => e.type === "coins_received")?.attributes.find((a) => a.key === "receiver")?.value;
  
  if (!recordAmount || !validatorAddress || !delegatorAddress) {
    logger.info("No reward or no msg found");
    return;
  }
  else {
    const rewardRecord = DelegatorReward.create({
      id: event.tx.hash,
      blockHeight: BigInt(event.block.block.header.height),
      txHash: event.tx.hash,
      feeDenomination: event.tx.decodedTx.authInfo.fee?.amount[0].denom,
      feeAmount: event.tx.decodedTx.authInfo.fee?.amount[0].amount,
      rewardAmount: recordAmount,
      delegatorAddress: delegatorAddress,
      validatorAddress: validatorAddress,
    });
    logger.info(
      "tx hash: " + event.tx.hash
    );
    logger.info(
      "delegatorAddress: " + delegatorAddress
    );
    await handleDelegator(rewardRecord.rewardAmount, rewardRecord.delegatorAddress);
    await rewardRecord.save();
  }
}

async function handleDelegator(reward: string, delegatorAddress: string) {
  let delegatorRecord = await Delegator.get(delegatorAddress);
  var rewardInt = BigInt(0);
  if (Array.from(reward)[0] != "0") {
    const rewardSplit = reward.split("u")[0];
    rewardInt = BigInt(rewardSplit);
  }
  if (!delegatorRecord) {
    delegatorRecord = Delegator.create({
      id: delegatorAddress,
      rewardsList: [rewardInt],
      totalRewards: rewardInt,
    });
    await delegatorRecord.save();
    logger.info(
      "New delegator" + delegatorAddress + "with reward" + rewardInt.toString()
    );
  } else {
    delegatorRecord.rewardsList = [...delegatorRecord.rewardsList, rewardInt];
    delegatorRecord.totalRewards = delegatorRecord.totalRewards + rewardInt;
    await delegatorRecord.save();
  }
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
