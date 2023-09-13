import { Airdrop, AirdropAmino, AirdropSDKType, ClaimRecord, ClaimRecordAmino, ClaimRecordSDKType } from "./claim";
/** GenesisState defines the claim module's genesis state. */
export interface GenesisState {
  /** airdrops specifies a list of airdrops */
  airdrops: Airdrop[];
  /** claim_records specifies a list of claim records */
  claimRecords: ClaimRecord[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.claim.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the claim module's genesis state. */
export interface GenesisStateAmino {
  /** airdrops specifies a list of airdrops */
  airdrops: AirdropAmino[];
  /** claim_records specifies a list of claim records */
  claim_records: ClaimRecordAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/crescent.claim.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the claim module's genesis state. */
export interface GenesisStateSDKType {
  airdrops: AirdropSDKType[];
  claim_records: ClaimRecordSDKType[];
}