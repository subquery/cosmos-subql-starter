import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";
import { ContractMetadata, RewardWithdrawl } from "../types";
import { MsgSetContractMetadata } from "../types/proto-interfaces/archway/rewards/v1/tx";

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
  msg: CosmosMessage<MsgSetContractMetadata>,
): Promise<void> {
  // Example https://archway.explorers.guru/transaction/485EC908712CCDC0D65918F0E8E90E291D32720F2D0C691CCC055544B98C14A1
  logger.info(
    `New Set contract metadata at block ${msg.block.header.height.toString()}`,
  );

  // contract metadata can be set and updated on the same contract call
  let contractMetadataRecord = await ContractMetadata.get(
    msg.msg.decodedMsg.metadata.contractAddress,
  );
  if (!contractMetadataRecord) {
    // we are creating a new one
    contractMetadataRecord = ContractMetadata.create({
      id: msg.msg.decodedMsg.metadata.contractAddress,
      createdBlockHeight: BigInt(msg.block.block.header.height),
      createdDate: new Date(msg.block.header.time.toISOString()),
      createdTxHash: msg.tx.hash,
      contractAddress: msg.msg.decodedMsg.metadata.contractAddress,
      ownerAddress:
        msg.msg.decodedMsg.metadata.ownerAddress ||
        msg.msg.decodedMsg.senderAddress,
      rewardsAddress: msg.msg.decodedMsg.metadata.rewardsAddress,
    });
  } else {
    // we are updating
    contractMetadataRecord.contractAddress =
      msg.msg.decodedMsg.metadata.contractAddress;
    contractMetadataRecord.ownerAddress =
      msg.msg.decodedMsg.metadata.ownerAddress;
    contractMetadataRecord.rewardsAddress =
      msg.msg.decodedMsg.metadata.rewardsAddress;
  }
  // Save the data
  await contractMetadataRecord.save();
}

export async function handleRewardsWithdrawEvent(
  event: CosmosEvent,
): Promise<void> {
  // Example https://archway.explorers.guru/transaction/CB3AF6F8F38A6628A22E45CAD178D435D42D5A1CAAC431D16CBE64557F2CBEC3
  logger.info(
    `New Reward Withdraw event at block ${event.block.header.height.toString()}`,
  );

  // Attributes are stored as key value pairs
  const rewardAddress = event.event.attributes.find(
    (a) => a.key === "reward_address",
  )?.value;

  // [{"denom":"aarch","amount":"678985288328817228"}]
  const rewardsString = event.event.attributes.find(
    (a) => a.key === "rewards",
  )?.value;

  if (rewardAddress && rewardsString) {
    const rewards: { denom: string; amount: string }[] =
      JSON.parse(rewardsString);

    rewards.forEach(async (reward, index) => {
      const rewardWithdrawlEvent = RewardWithdrawl.create({
        id: `${event.tx.hash}-${event.msg.idx}-${event.idx}-${index}`,
        blockHeight: BigInt(event.block.block.header.height),
        date: new Date(event.block.header.time.toISOString()),
        txHash: event.tx.hash,
        rewardAddress,
        denom: reward.denom,
        amount: BigInt(reward.amount),
      });

      await rewardWithdrawlEvent.save();
    });
  }
}
