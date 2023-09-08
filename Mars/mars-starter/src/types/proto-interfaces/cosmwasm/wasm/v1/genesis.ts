import { Params, ParamsAmino, ParamsSDKType, CodeInfo, CodeInfoAmino, CodeInfoSDKType, ContractInfo, ContractInfoAmino, ContractInfoSDKType, Model, ModelAmino, ModelSDKType, ContractCodeHistoryEntry, ContractCodeHistoryEntryAmino, ContractCodeHistoryEntrySDKType } from "./types";
import { Long } from "../../../helpers";
/** GenesisState - genesis state of x/wasm */
export interface GenesisState {
  params: Params;
  codes: Code[];
  contracts: Contract[];
  sequences: Sequence[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState - genesis state of x/wasm */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  codes: CodeAmino[];
  contracts: ContractAmino[];
  sequences: SequenceAmino[];
}
export interface GenesisStateAminoMsg {
  type: "wasm/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState - genesis state of x/wasm */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  codes: CodeSDKType[];
  contracts: ContractSDKType[];
  sequences: SequenceSDKType[];
}
/** Code struct encompasses CodeInfo and CodeBytes */
export interface Code {
  codeId: Long;
  codeInfo: CodeInfo;
  codeBytes: Uint8Array;
  /** Pinned to wasmvm cache */
  pinned: boolean;
}
export interface CodeProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.Code";
  value: Uint8Array;
}
/** Code struct encompasses CodeInfo and CodeBytes */
export interface CodeAmino {
  code_id: string;
  code_info?: CodeInfoAmino;
  code_bytes: Uint8Array;
  /** Pinned to wasmvm cache */
  pinned: boolean;
}
export interface CodeAminoMsg {
  type: "wasm/Code";
  value: CodeAmino;
}
/** Code struct encompasses CodeInfo and CodeBytes */
export interface CodeSDKType {
  code_id: Long;
  code_info: CodeInfoSDKType;
  code_bytes: Uint8Array;
  pinned: boolean;
}
/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface Contract {
  contractAddress: string;
  contractInfo: ContractInfo;
  contractState: Model[];
  contractCodeHistory: ContractCodeHistoryEntry[];
}
export interface ContractProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.Contract";
  value: Uint8Array;
}
/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface ContractAmino {
  contract_address: string;
  contract_info?: ContractInfoAmino;
  contract_state: ModelAmino[];
  contract_code_history: ContractCodeHistoryEntryAmino[];
}
export interface ContractAminoMsg {
  type: "wasm/Contract";
  value: ContractAmino;
}
/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface ContractSDKType {
  contract_address: string;
  contract_info: ContractInfoSDKType;
  contract_state: ModelSDKType[];
  contract_code_history: ContractCodeHistoryEntrySDKType[];
}
/** Sequence key and value of an id generation counter */
export interface Sequence {
  idKey: Uint8Array;
  value: Long;
}
export interface SequenceProtoMsg {
  typeUrl: "/cosmwasm.wasm.v1.Sequence";
  value: Uint8Array;
}
/** Sequence key and value of an id generation counter */
export interface SequenceAmino {
  id_key: Uint8Array;
  value: string;
}
export interface SequenceAminoMsg {
  type: "wasm/Sequence";
  value: SequenceAmino;
}
/** Sequence key and value of an id generation counter */
export interface SequenceSDKType {
  id_key: Uint8Array;
  value: Long;
}