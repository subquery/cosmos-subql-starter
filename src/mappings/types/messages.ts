import {Coin} from "./common";

export interface NativeTransferMsg {
  toAddress: string;
  fromAddress: string;
  amount: Coin[];
}

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

export interface EncodedMsg {
  typeUrl: string;
  value: Uint8Array;
}

export interface AuthzExecMsg {
  grantee: string;
  msgs: EncodedMsg[];
}
