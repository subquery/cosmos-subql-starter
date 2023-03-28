import { DelegatorReward } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";

export async function handleEvent(evt: CosmosEvent): Promise<void> {
  const eventRecord = new DelegatorReward(`${evt.tx.hash}-${evt.msg.idx}-${evt.idx}`);

  eventRecord.blockHeight = BigInt(evt.block.block.header.height);
  eventRecord.txHash = evt.tx.hash;
  eventRecord.delegatorAddress = evt.msg.msg.decodedMsg.delegatorAddress
  eventRecord.validatorAddress = evt.msg.msg.decodedMsg.validatorAddress

  for(const attr of evt.event.attributes){
    if(attr.key === "amount") {
      eventRecord.rewardAmount = attr.value;
    }
  }
  await eventRecord.save();
}