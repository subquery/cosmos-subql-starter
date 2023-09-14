import { DelegatorReward } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";
import assert from "assert";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  // We create a new entity using the transaction hash and message index as a unique ID
  logger.info(
    `New delegator reward event at block ${event.block.block.header.height}`
  );

  assert(
    event.msg.tx.decodedTx.authInfo.fee,
    "missing fee in decodeTx.authInfo"
  );
  const newDelegatorReward = DelegatorReward.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    delegatorAddress: event.msg.msg.decodedMsg.delegatorAddress,
    validatorAddress: event.msg.msg.decodedMsg.validatorAddress,
    feeAmount: event.msg.tx.decodedTx.authInfo.fee.amount[0].amount,
    feeDenomination: event.msg.tx.decodedTx.authInfo.fee.amount[0].denom,
  });

  // Cosmos events code attributes as an array of key value pairs, we're looking for an amount
  for (const attr of event.event.attributes) {
    if (attr.key === "amount") {
      newDelegatorReward.rewardAmount = attr.value;
    }
  }
  await newDelegatorReward.save();
}
