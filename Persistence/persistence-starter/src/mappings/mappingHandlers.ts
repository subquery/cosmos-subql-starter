import { DelegatorReward } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  // We create a new entity using the transaction hash and message index as a unique ID
  logger.info(`New delegator reward event at block ${event.block.block.header.height}`);
  const newDelegatorReward = new DelegatorReward(`${event.tx.hash}-${event.msg.idx}-${event.idx}`);

  newDelegatorReward.blockHeight = BigInt(event.block.block.header.height);
  newDelegatorReward.txHash = event.tx.hash;
  newDelegatorReward.delegatorAddress = event.msg.msg.decodedMsg.delegatorAddress;
  newDelegatorReward.validatorAddress =event.msg.msg.decodedMsg.validatorAddress;
  newDelegatorReward.feeAmount = event.msg.tx.decodedTx.authInfo.fee.amount[0].amount;
  newDelegatorReward.feeDenomination = event.msg.tx.decodedTx.authInfo.fee.amount[0].denom;
  
  // Cosmos events code attributes as an array of key value pairs, we're looking for an amount
  for (const attr of event.event.attributes) {
    if (attr.key === "amount") {
      newDelegatorReward.rewardAmount = attr.value;
    }
  }
  await newDelegatorReward.save();
}
