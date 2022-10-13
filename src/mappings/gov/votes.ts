import {CosmosEvent, CosmosMessage} from "@subql/types-cosmos";
import {GovProposalVoteMsg} from "../types";
import {messageId} from "../utils";
import {GovProposalVote, GovProposalVoteOption} from "../../types";

export async function handleGovProposalVote(event: CosmosEvent): Promise<void> {
  const msg: CosmosMessage<GovProposalVoteMsg> = event.msg;
  logger.info(`[handleGovProposalVote] (tx ${msg.tx.hash}): indexing GovProposalVote ${messageId(msg)}`);
  logger.debug(`[handleGovProposalVote] (event.msg.msg): ${JSON.stringify(msg.msg, null, 2)}`);

  const id = messageId(msg);
  const option = msg?.msg?.decodedMsg?.option;
  const proposalId = msg?.msg?.decodedMsg?.proposalId, voter = msg?.msg?.decodedMsg?.voter;

  if (!option || !proposalId || !voter) {
    logger.warn(`[handleGovProposalVote] (tx ${event.tx.hash}): cannot index event (event.event): ${JSON.stringify(event.event, null, 2)}`);
    return;
  }

  const vote = GovProposalVote.create({
    id,
    proposalId: proposalId,
    voterAddress: voter,
    option: Object.values(GovProposalVoteOption)[option],
    messageId: id,
    transactionId: msg.tx.hash,
    blockId: msg.block.block.id,
  });

  await vote.save();
}
