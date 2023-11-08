import { Long } from "../../helpers";
export interface MsgPostFile {
  creator: string;
  merkle: Uint8Array;
  fileSize: Long;
  /** How many blocks between proofs. */
  proofInterval: Long;
  proofType: Long;
  /** How many provers this file can have. */
  maxProofs: Long;
  expires: Long;
  /** Misc string to store extra details. */
  note: string;
}
export interface MsgPostFileProtoMsg {
  typeUrl: "/canine_chain.storage.MsgPostFile";
  value: Uint8Array;
}
export interface MsgPostFileAmino {
  creator: string;
  merkle: Uint8Array;
  file_size: string;
  /** How many blocks between proofs. */
  proof_interval: string;
  proof_type: string;
  /** How many provers this file can have. */
  max_proofs: string;
  expires: string;
  /** Misc string to store extra details. */
  note: string;
}
export interface MsgPostFileAminoMsg {
  type: "/canine_chain.storage.MsgPostFile";
  value: MsgPostFileAmino;
}
export interface MsgPostFileSDKType {
  creator: string;
  merkle: Uint8Array;
  file_size: Long;
  proof_interval: Long;
  proof_type: Long;
  max_proofs: Long;
  expires: Long;
  note: string;
}
export interface MsgPostFileResponse {
  /** list of providers that are pre-loaded into the file */
  providerIps: string[];
  startBlock: Long;
}
export interface MsgPostFileResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgPostFileResponse";
  value: Uint8Array;
}
export interface MsgPostFileResponseAmino {
  /** list of providers that are pre-loaded into the file */
  provider_ips: string[];
  start_block: string;
}
export interface MsgPostFileResponseAminoMsg {
  type: "/canine_chain.storage.MsgPostFileResponse";
  value: MsgPostFileResponseAmino;
}
export interface MsgPostFileResponseSDKType {
  provider_ips: string[];
  start_block: Long;
}
export interface MsgPostProof {
  creator: string;
  item: Uint8Array;
  hashList: Uint8Array;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface MsgPostProofProtoMsg {
  typeUrl: "/canine_chain.storage.MsgPostProof";
  value: Uint8Array;
}
export interface MsgPostProofAmino {
  creator: string;
  item: Uint8Array;
  hash_list: Uint8Array;
  merkle: Uint8Array;
  owner: string;
  start: string;
}
export interface MsgPostProofAminoMsg {
  type: "/canine_chain.storage.MsgPostProof";
  value: MsgPostProofAmino;
}
export interface MsgPostProofSDKType {
  creator: string;
  item: Uint8Array;
  hash_list: Uint8Array;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface MsgPostProofResponse {
  success: boolean;
  errorMessage: string;
}
export interface MsgPostProofResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgPostProofResponse";
  value: Uint8Array;
}
export interface MsgPostProofResponseAmino {
  success: boolean;
  errorMessage: string;
}
export interface MsgPostProofResponseAminoMsg {
  type: "/canine_chain.storage.MsgPostProofResponse";
  value: MsgPostProofResponseAmino;
}
export interface MsgPostProofResponseSDKType {
  success: boolean;
  errorMessage: string;
}
export interface MsgDeleteFile {
  creator: string;
  merkle: Uint8Array;
  start: Long;
}
export interface MsgDeleteFileProtoMsg {
  typeUrl: "/canine_chain.storage.MsgDeleteFile";
  value: Uint8Array;
}
export interface MsgDeleteFileAmino {
  creator: string;
  merkle: Uint8Array;
  start: string;
}
export interface MsgDeleteFileAminoMsg {
  type: "/canine_chain.storage.MsgDeleteFile";
  value: MsgDeleteFileAmino;
}
export interface MsgDeleteFileSDKType {
  creator: string;
  merkle: Uint8Array;
  start: Long;
}
export interface MsgDeleteFileResponse {}
export interface MsgDeleteFileResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgDeleteFileResponse";
  value: Uint8Array;
}
export interface MsgDeleteFileResponseAmino {}
export interface MsgDeleteFileResponseAminoMsg {
  type: "/canine_chain.storage.MsgDeleteFileResponse";
  value: MsgDeleteFileResponseAmino;
}
export interface MsgDeleteFileResponseSDKType {}
export interface MsgSetProviderIP {
  creator: string;
  ip: string;
}
export interface MsgSetProviderIPProtoMsg {
  typeUrl: "/canine_chain.storage.MsgSetProviderIP";
  value: Uint8Array;
}
export interface MsgSetProviderIPAmino {
  creator: string;
  ip: string;
}
export interface MsgSetProviderIPAminoMsg {
  type: "/canine_chain.storage.MsgSetProviderIP";
  value: MsgSetProviderIPAmino;
}
export interface MsgSetProviderIPSDKType {
  creator: string;
  ip: string;
}
export interface MsgSetProviderIPResponse {}
export interface MsgSetProviderIPResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgSetProviderIPResponse";
  value: Uint8Array;
}
export interface MsgSetProviderIPResponseAmino {}
export interface MsgSetProviderIPResponseAminoMsg {
  type: "/canine_chain.storage.MsgSetProviderIPResponse";
  value: MsgSetProviderIPResponseAmino;
}
export interface MsgSetProviderIPResponseSDKType {}
export interface MsgSetProviderKeybase {
  creator: string;
  keybase: string;
}
export interface MsgSetProviderKeybaseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgSetProviderKeybase";
  value: Uint8Array;
}
export interface MsgSetProviderKeybaseAmino {
  creator: string;
  keybase: string;
}
export interface MsgSetProviderKeybaseAminoMsg {
  type: "/canine_chain.storage.MsgSetProviderKeybase";
  value: MsgSetProviderKeybaseAmino;
}
export interface MsgSetProviderKeybaseSDKType {
  creator: string;
  keybase: string;
}
export interface MsgSetProviderKeybaseResponse {}
export interface MsgSetProviderKeybaseResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgSetProviderKeybaseResponse";
  value: Uint8Array;
}
export interface MsgSetProviderKeybaseResponseAmino {}
export interface MsgSetProviderKeybaseResponseAminoMsg {
  type: "/canine_chain.storage.MsgSetProviderKeybaseResponse";
  value: MsgSetProviderKeybaseResponseAmino;
}
export interface MsgSetProviderKeybaseResponseSDKType {}
export interface MsgSetProviderTotalspace {
  creator: string;
  space: string;
}
export interface MsgSetProviderTotalspaceProtoMsg {
  typeUrl: "/canine_chain.storage.MsgSetProviderTotalspace";
  value: Uint8Array;
}
export interface MsgSetProviderTotalspaceAmino {
  creator: string;
  space: string;
}
export interface MsgSetProviderTotalspaceAminoMsg {
  type: "/canine_chain.storage.MsgSetProviderTotalspace";
  value: MsgSetProviderTotalspaceAmino;
}
export interface MsgSetProviderTotalspaceSDKType {
  creator: string;
  space: string;
}
export interface MsgSetProviderTotalspaceResponse {}
export interface MsgSetProviderTotalspaceResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgSetProviderTotalspaceResponse";
  value: Uint8Array;
}
export interface MsgSetProviderTotalspaceResponseAmino {}
export interface MsgSetProviderTotalspaceResponseAminoMsg {
  type: "/canine_chain.storage.MsgSetProviderTotalspaceResponse";
  value: MsgSetProviderTotalspaceResponseAmino;
}
export interface MsgSetProviderTotalspaceResponseSDKType {}
export interface MsgAddClaimer {
  creator: string;
  claimAddress: string;
}
export interface MsgAddClaimerProtoMsg {
  typeUrl: "/canine_chain.storage.MsgAddClaimer";
  value: Uint8Array;
}
export interface MsgAddClaimerAmino {
  creator: string;
  claim_address: string;
}
export interface MsgAddClaimerAminoMsg {
  type: "/canine_chain.storage.MsgAddClaimer";
  value: MsgAddClaimerAmino;
}
export interface MsgAddClaimerSDKType {
  creator: string;
  claim_address: string;
}
export interface MsgAddClaimerResponse {}
export interface MsgAddClaimerResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgAddClaimerResponse";
  value: Uint8Array;
}
export interface MsgAddClaimerResponseAmino {}
export interface MsgAddClaimerResponseAminoMsg {
  type: "/canine_chain.storage.MsgAddClaimerResponse";
  value: MsgAddClaimerResponseAmino;
}
export interface MsgAddClaimerResponseSDKType {}
export interface MsgRemoveClaimer {
  creator: string;
  claimAddress: string;
}
export interface MsgRemoveClaimerProtoMsg {
  typeUrl: "/canine_chain.storage.MsgRemoveClaimer";
  value: Uint8Array;
}
export interface MsgRemoveClaimerAmino {
  creator: string;
  claim_address: string;
}
export interface MsgRemoveClaimerAminoMsg {
  type: "/canine_chain.storage.MsgRemoveClaimer";
  value: MsgRemoveClaimerAmino;
}
export interface MsgRemoveClaimerSDKType {
  creator: string;
  claim_address: string;
}
export interface MsgRemoveClaimerResponse {}
export interface MsgRemoveClaimerResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgRemoveClaimerResponse";
  value: Uint8Array;
}
export interface MsgRemoveClaimerResponseAmino {}
export interface MsgRemoveClaimerResponseAminoMsg {
  type: "/canine_chain.storage.MsgRemoveClaimerResponse";
  value: MsgRemoveClaimerResponseAmino;
}
export interface MsgRemoveClaimerResponseSDKType {}
export interface MsgInitProvider {
  creator: string;
  ip: string;
  keybase: string;
  totalspace: string;
}
export interface MsgInitProviderProtoMsg {
  typeUrl: "/canine_chain.storage.MsgInitProvider";
  value: Uint8Array;
}
export interface MsgInitProviderAmino {
  creator: string;
  ip: string;
  keybase: string;
  totalspace: string;
}
export interface MsgInitProviderAminoMsg {
  type: "/canine_chain.storage.MsgInitProvider";
  value: MsgInitProviderAmino;
}
export interface MsgInitProviderSDKType {
  creator: string;
  ip: string;
  keybase: string;
  totalspace: string;
}
export interface MsgInitProviderResponse {}
export interface MsgInitProviderResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgInitProviderResponse";
  value: Uint8Array;
}
export interface MsgInitProviderResponseAmino {}
export interface MsgInitProviderResponseAminoMsg {
  type: "/canine_chain.storage.MsgInitProviderResponse";
  value: MsgInitProviderResponseAmino;
}
export interface MsgInitProviderResponseSDKType {}
export interface MsgShutdownProvider {
  creator: string;
}
export interface MsgShutdownProviderProtoMsg {
  typeUrl: "/canine_chain.storage.MsgShutdownProvider";
  value: Uint8Array;
}
export interface MsgShutdownProviderAmino {
  creator: string;
}
export interface MsgShutdownProviderAminoMsg {
  type: "/canine_chain.storage.MsgShutdownProvider";
  value: MsgShutdownProviderAmino;
}
export interface MsgShutdownProviderSDKType {
  creator: string;
}
export interface MsgShutdownProviderResponse {}
export interface MsgShutdownProviderResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgShutdownProviderResponse";
  value: Uint8Array;
}
export interface MsgShutdownProviderResponseAmino {}
export interface MsgShutdownProviderResponseAminoMsg {
  type: "/canine_chain.storage.MsgShutdownProviderResponse";
  value: MsgShutdownProviderResponseAmino;
}
export interface MsgShutdownProviderResponseSDKType {}
export interface MsgBuyStorage {
  creator: string;
  forAddress: string;
  duration: string;
  bytes: string;
  paymentDenom: string;
}
export interface MsgBuyStorageProtoMsg {
  typeUrl: "/canine_chain.storage.MsgBuyStorage";
  value: Uint8Array;
}
export interface MsgBuyStorageAmino {
  creator: string;
  for_address: string;
  duration: string;
  bytes: string;
  payment_denom: string;
}
export interface MsgBuyStorageAminoMsg {
  type: "/canine_chain.storage.MsgBuyStorage";
  value: MsgBuyStorageAmino;
}
export interface MsgBuyStorageSDKType {
  creator: string;
  for_address: string;
  duration: string;
  bytes: string;
  payment_denom: string;
}
export interface MsgBuyStorageResponse {}
export interface MsgBuyStorageResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgBuyStorageResponse";
  value: Uint8Array;
}
export interface MsgBuyStorageResponseAmino {}
export interface MsgBuyStorageResponseAminoMsg {
  type: "/canine_chain.storage.MsgBuyStorageResponse";
  value: MsgBuyStorageResponseAmino;
}
export interface MsgBuyStorageResponseSDKType {}
export interface MsgClaimStray {
  creator: string;
  cid: string;
  forAddress: string;
}
export interface MsgClaimStrayProtoMsg {
  typeUrl: "/canine_chain.storage.MsgClaimStray";
  value: Uint8Array;
}
export interface MsgClaimStrayAmino {
  creator: string;
  cid: string;
  for_address: string;
}
export interface MsgClaimStrayAminoMsg {
  type: "/canine_chain.storage.MsgClaimStray";
  value: MsgClaimStrayAmino;
}
export interface MsgClaimStraySDKType {
  creator: string;
  cid: string;
  for_address: string;
}
export interface MsgClaimStrayResponse {}
export interface MsgClaimStrayResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgClaimStrayResponse";
  value: Uint8Array;
}
export interface MsgClaimStrayResponseAmino {}
export interface MsgClaimStrayResponseAminoMsg {
  type: "/canine_chain.storage.MsgClaimStrayResponse";
  value: MsgClaimStrayResponseAmino;
}
export interface MsgClaimStrayResponseSDKType {}
export interface MsgUpgradeStorage {
  creator: string;
  forAddress: string;
  duration: string;
  bytes: string;
  paymentDenom: string;
}
export interface MsgUpgradeStorageProtoMsg {
  typeUrl: "/canine_chain.storage.MsgUpgradeStorage";
  value: Uint8Array;
}
export interface MsgUpgradeStorageAmino {
  creator: string;
  for_address: string;
  duration: string;
  bytes: string;
  payment_denom: string;
}
export interface MsgUpgradeStorageAminoMsg {
  type: "/canine_chain.storage.MsgUpgradeStorage";
  value: MsgUpgradeStorageAmino;
}
export interface MsgUpgradeStorageSDKType {
  creator: string;
  for_address: string;
  duration: string;
  bytes: string;
  payment_denom: string;
}
export interface MsgUpgradeStorageResponse {}
export interface MsgUpgradeStorageResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgUpgradeStorageResponse";
  value: Uint8Array;
}
export interface MsgUpgradeStorageResponseAmino {}
export interface MsgUpgradeStorageResponseAminoMsg {
  type: "/canine_chain.storage.MsgUpgradeStorageResponse";
  value: MsgUpgradeStorageResponseAmino;
}
export interface MsgUpgradeStorageResponseSDKType {}
export interface MsgRequestAttestationForm {
  creator: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface MsgRequestAttestationFormProtoMsg {
  typeUrl: "/canine_chain.storage.MsgRequestAttestationForm";
  value: Uint8Array;
}
export interface MsgRequestAttestationFormAmino {
  creator: string;
  merkle: Uint8Array;
  owner: string;
  start: string;
}
export interface MsgRequestAttestationFormAminoMsg {
  type: "/canine_chain.storage.MsgRequestAttestationForm";
  value: MsgRequestAttestationFormAmino;
}
export interface MsgRequestAttestationFormSDKType {
  creator: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface MsgRequestAttestationFormResponse {
  providers: string[];
  success: boolean;
  error: string;
}
export interface MsgRequestAttestationFormResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgRequestAttestationFormResponse";
  value: Uint8Array;
}
export interface MsgRequestAttestationFormResponseAmino {
  providers: string[];
  success: boolean;
  error: string;
}
export interface MsgRequestAttestationFormResponseAminoMsg {
  type: "/canine_chain.storage.MsgRequestAttestationFormResponse";
  value: MsgRequestAttestationFormResponseAmino;
}
export interface MsgRequestAttestationFormResponseSDKType {
  providers: string[];
  success: boolean;
  error: string;
}
export interface MsgAttest {
  creator: string;
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface MsgAttestProtoMsg {
  typeUrl: "/canine_chain.storage.MsgAttest";
  value: Uint8Array;
}
export interface MsgAttestAmino {
  creator: string;
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: string;
}
export interface MsgAttestAminoMsg {
  type: "/canine_chain.storage.MsgAttest";
  value: MsgAttestAmino;
}
export interface MsgAttestSDKType {
  creator: string;
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface MsgAttestResponse {}
export interface MsgAttestResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgAttestResponse";
  value: Uint8Array;
}
export interface MsgAttestResponseAmino {}
export interface MsgAttestResponseAminoMsg {
  type: "/canine_chain.storage.MsgAttestResponse";
  value: MsgAttestResponseAmino;
}
export interface MsgAttestResponseSDKType {}
export interface MsgRequestReportForm {
  creator: string;
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface MsgRequestReportFormProtoMsg {
  typeUrl: "/canine_chain.storage.MsgRequestReportForm";
  value: Uint8Array;
}
export interface MsgRequestReportFormAmino {
  creator: string;
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: string;
}
export interface MsgRequestReportFormAminoMsg {
  type: "/canine_chain.storage.MsgRequestReportForm";
  value: MsgRequestReportFormAmino;
}
export interface MsgRequestReportFormSDKType {
  creator: string;
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface MsgRequestReportFormResponse {
  providers: string[];
  success: boolean;
  error: string;
}
export interface MsgRequestReportFormResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgRequestReportFormResponse";
  value: Uint8Array;
}
export interface MsgRequestReportFormResponseAmino {
  providers: string[];
  success: boolean;
  error: string;
}
export interface MsgRequestReportFormResponseAminoMsg {
  type: "/canine_chain.storage.MsgRequestReportFormResponse";
  value: MsgRequestReportFormResponseAmino;
}
export interface MsgRequestReportFormResponseSDKType {
  providers: string[];
  success: boolean;
  error: string;
}
export interface MsgReport {
  creator: string;
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface MsgReportProtoMsg {
  typeUrl: "/canine_chain.storage.MsgReport";
  value: Uint8Array;
}
export interface MsgReportAmino {
  creator: string;
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: string;
}
export interface MsgReportAminoMsg {
  type: "/canine_chain.storage.MsgReport";
  value: MsgReportAmino;
}
export interface MsgReportSDKType {
  creator: string;
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface MsgReportResponse {}
export interface MsgReportResponseProtoMsg {
  typeUrl: "/canine_chain.storage.MsgReportResponse";
  value: Uint8Array;
}
export interface MsgReportResponseAmino {}
export interface MsgReportResponseAminoMsg {
  type: "/canine_chain.storage.MsgReportResponse";
  value: MsgReportResponseAmino;
}
export interface MsgReportResponseSDKType {}