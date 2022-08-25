import {Coin} from "./common";

export interface ExecuteContractMsg {
  contract: string;
  msg: object;
  funds?: Coin[];
}

export interface GovProposalVoteMsg {
  proposalId: string;
  voter: string;
  option: number;
}

export interface DistDelegatorClaimMsg {
  delegatorAddress: string;
  validatorAddress: string;
}

export interface LegacyBridgeSwapMsg extends ExecuteContractMsg{
  msg: {
    swap: {
      destination: string,
      amount: bigint,
    },
  },
}

