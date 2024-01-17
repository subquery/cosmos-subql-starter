import { Long } from "../../helpers";
/**
 * App includes the protocol and software version for the application.
 * This information is included in ResponseInfo. The App.Protocol can be
 * updated in ResponseEndBlock.
 */
export interface App {
  protocol: Long;
  software: string;
}
export interface AppProtoMsg {
  typeUrl: "/tendermint.version.App";
  value: Uint8Array;
}
/**
 * App includes the protocol and software version for the application.
 * This information is included in ResponseInfo. The App.Protocol can be
 * updated in ResponseEndBlock.
 */
export interface AppAmino {
  protocol: string;
  software: string;
}
export interface AppAminoMsg {
  type: "/tendermint.version.App";
  value: AppAmino;
}
/**
 * App includes the protocol and software version for the application.
 * This information is included in ResponseInfo. The App.Protocol can be
 * updated in ResponseEndBlock.
 */
export interface AppSDKType {
  protocol: Long;
  software: string;
}
/**
 * Consensus captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export interface Consensus {
  block: Long;
  app: Long;
}
export interface ConsensusProtoMsg {
  typeUrl: "/tendermint.version.Consensus";
  value: Uint8Array;
}
/**
 * Consensus captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export interface ConsensusAmino {
  block: string;
  app: string;
}
export interface ConsensusAminoMsg {
  type: "/tendermint.version.Consensus";
  value: ConsensusAmino;
}
/**
 * Consensus captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export interface ConsensusSDKType {
  block: Long;
  app: Long;
}