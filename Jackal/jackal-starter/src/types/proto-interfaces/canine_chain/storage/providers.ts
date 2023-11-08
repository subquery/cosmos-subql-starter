import { Long } from "../../helpers";
export interface Providers {
  address: string;
  ip: string;
  totalspace: string;
  burnedContracts: string;
  creator: string;
  keybaseIdentity: string;
  authClaimers: string[];
}
export interface ProvidersProtoMsg {
  typeUrl: "/canine_chain.storage.Providers";
  value: Uint8Array;
}
export interface ProvidersAmino {
  address: string;
  ip: string;
  totalspace: string;
  burned_contracts: string;
  creator: string;
  keybase_identity: string;
  auth_claimers: string[];
}
export interface ProvidersAminoMsg {
  type: "/canine_chain.storage.Providers";
  value: ProvidersAmino;
}
export interface ProvidersSDKType {
  address: string;
  ip: string;
  totalspace: string;
  burned_contracts: string;
  creator: string;
  keybase_identity: string;
  auth_claimers: string[];
}
export interface ActiveProviders {
  address: string;
}
export interface ActiveProvidersProtoMsg {
  typeUrl: "/canine_chain.storage.ActiveProviders";
  value: Uint8Array;
}
export interface ActiveProvidersAmino {
  address: string;
}
export interface ActiveProvidersAminoMsg {
  type: "/canine_chain.storage.ActiveProviders";
  value: ActiveProvidersAmino;
}
export interface ActiveProvidersSDKType {
  address: string;
}
export interface Attestation {
  provider: string;
  complete: boolean;
}
export interface AttestationProtoMsg {
  typeUrl: "/canine_chain.storage.Attestation";
  value: Uint8Array;
}
export interface AttestationAmino {
  provider: string;
  complete: boolean;
}
export interface AttestationAminoMsg {
  type: "/canine_chain.storage.Attestation";
  value: AttestationAmino;
}
export interface AttestationSDKType {
  provider: string;
  complete: boolean;
}
export interface AttestationForm {
  attestations: Attestation[];
  prover: string;
  /** The merkle root is unique to every file based on its contents. */
  merkle: Uint8Array;
  owner: string;
  /** Marks the block height the file started on. */
  start: Long;
}
export interface AttestationFormProtoMsg {
  typeUrl: "/canine_chain.storage.AttestationForm";
  value: Uint8Array;
}
export interface AttestationFormAmino {
  attestations: AttestationAmino[];
  prover: string;
  /** The merkle root is unique to every file based on its contents. */
  merkle: Uint8Array;
  owner: string;
  /** Marks the block height the file started on. */
  start: string;
}
export interface AttestationFormAminoMsg {
  type: "/canine_chain.storage.AttestationForm";
  value: AttestationFormAmino;
}
export interface AttestationFormSDKType {
  attestations: AttestationSDKType[];
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface ReportForm {
  attestations: Attestation[];
  prover: string;
  /** The merkle root is unique to every file based on its contents. */
  merkle: Uint8Array;
  owner: string;
  /** Marks the block height the file started on. */
  start: Long;
}
export interface ReportFormProtoMsg {
  typeUrl: "/canine_chain.storage.ReportForm";
  value: Uint8Array;
}
export interface ReportFormAmino {
  attestations: AttestationAmino[];
  prover: string;
  /** The merkle root is unique to every file based on its contents. */
  merkle: Uint8Array;
  owner: string;
  /** Marks the block height the file started on. */
  start: string;
}
export interface ReportFormAminoMsg {
  type: "/canine_chain.storage.ReportForm";
  value: ReportFormAmino;
}
export interface ReportFormSDKType {
  attestations: AttestationSDKType[];
  prover: string;
  merkle: Uint8Array;
  owner: string;
  start: Long;
}
export interface Collateral {
  address: string;
  amount: Long;
}
export interface CollateralProtoMsg {
  typeUrl: "/canine_chain.storage.Collateral";
  value: Uint8Array;
}
export interface CollateralAmino {
  address: string;
  amount: string;
}
export interface CollateralAminoMsg {
  type: "/canine_chain.storage.Collateral";
  value: CollateralAmino;
}
export interface CollateralSDKType {
  address: string;
  amount: Long;
}