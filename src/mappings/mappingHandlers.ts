import {ExecuteEvent, Message, Transaction, LegacyBridgeSwap, DistDelegatorClaim, GovProposalVote} from "../types";
import {
  CosmosEvent,
  CosmosBlock,
  CosmosMessage,
  CosmosTransaction,
} from "@subql/types-cosmos";
import { GovProposalVoteOption } from "../types/enums";

export async function handleBlock(block: CosmosBlock): Promise<void> {
  // If you wanted to index each block in Cosmos (Juno), you could do that here
}

export async function handleTransaction(tx: CosmosTransaction): Promise<void> {
  const transactionRecord = Transaction.create({
    id: tx.hash,
    blockHeight: BigInt(tx.block.block.header.height),
    timestamp: tx.block.block.header.time,
    gasUsed: BigInt(Math.trunc(tx.tx.gasUsed)),
    gasWanted: BigInt(Math.trunc(tx.tx.gasWanted)),
    // TODO:
    // memo: tx.tx.
    // fee: BigInt(Math.trunc(tx.)),
  });
  await transactionRecord.save();
}

export async function handleMessage(msg: CosmosMessage): Promise<void> {
  const messageRecord = Message.create({
    id: `${msg.tx.hash}-${msg.idx}`,
    blockHeight: BigInt(msg.block.block.header.height),
    txHash: msg.tx.hash,
    sender: msg.msg.decodedMsg.sender,
    contract: msg.msg.decodedMsg.contract,
  });
  await messageRecord.save();
}

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = ExecuteEvent.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    contractAddress: event.event.attributes.find(attr => attr.key === '_contract_address').value
  });

  await eventRecord.save();
}

interface GovProposalVoteMsg {
  msg: {
    proposalId: string;
    voter: string;
    option: GovProposalVoteOption;
  }
}

interface DistDelegatorClaimMsg {
  msg: {
    delegatorAddress: string;
    validatorAddress: string;
  }
}

interface LegacyBridgeSwapMsg {
  msg: {
    swap: {
      destination: string,
      amount: bigint,
    }
  }
}

export async function handleGovProposalVote(message: CosmosMessage<GovProposalVoteMsg>): Promise<void> {
  const vote = new GovProposalVote(`${message.tx.hash}-${message.idx}`);
  const {proposalId, voter, option} = message.msg.decodedMsg.msg;

  vote.proposalId = proposalId;
  vote.voterAddress = voter;
  vote.option = option;

  await vote.save();
}

export async function handleDistDelegatorClaim(message: CosmosMessage<DistDelegatorClaimMsg>): Promise<void> {
  const claim = new DistDelegatorClaim(`${message.tx.hash}-${message.idx}`);
  const {delegatorAddress, validatorAddress} = message.msg.decodedMsg.msg;

  claim.delegatorAddress = delegatorAddress;
  claim.validatorAddress = validatorAddress;

  // TODO:
  // claim.amount =

  await claim.save();
}

export async function handleLegacyBridgeSwap(message: CosmosMessage<LegacyBridgeSwapMsg>): Promise<void> {
  const swap = new LegacyBridgeSwap(`${message.tx.hash}-${message.idx}`);

  swap.destination = message.msg.decodedMsg.msg.swap.destination;
  swap.amount = BigInt(0); //message.msg.decodedMsg.msg.amount;

  await swap.save();
}
