import { IdentifiedClientState, IdentifiedClientStateAmino, IdentifiedClientStateSDKType, ClientConsensusStates, ClientConsensusStatesAmino, ClientConsensusStatesSDKType, Params, ParamsAmino, ParamsSDKType } from "./client";
import { Long } from "../../../../helpers";
/** GenesisState defines the ibc client submodule's genesis state. */
export interface GenesisState {
  /** client states with their corresponding identifiers */
  clients: IdentifiedClientState[];
  /** consensus states from each client */
  clientsConsensus: ClientConsensusStates[];
  /** metadata from each client */
  clientsMetadata: IdentifiedGenesisMetadata[];
  params: Params;
  /** create localhost on initialization */
  createLocalhost: boolean;
  /** the sequence for the next generated client identifier */
  nextClientSequence: Long;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/ibc.core.client.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the ibc client submodule's genesis state. */
export interface GenesisStateAmino {
  /** client states with their corresponding identifiers */
  clients: IdentifiedClientStateAmino[];
  /** consensus states from each client */
  clients_consensus: ClientConsensusStatesAmino[];
  /** metadata from each client */
  clients_metadata: IdentifiedGenesisMetadataAmino[];
  params?: ParamsAmino;
  /** create localhost on initialization */
  create_localhost: boolean;
  /** the sequence for the next generated client identifier */
  next_client_sequence: string;
}
export interface GenesisStateAminoMsg {
  type: "cosmos-sdk/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the ibc client submodule's genesis state. */
export interface GenesisStateSDKType {
  clients: IdentifiedClientStateSDKType[];
  clients_consensus: ClientConsensusStatesSDKType[];
  clients_metadata: IdentifiedGenesisMetadataSDKType[];
  params: ParamsSDKType;
  create_localhost: boolean;
  next_client_sequence: Long;
}
/**
 * GenesisMetadata defines the genesis type for metadata that clients may return
 * with ExportMetadata
 */
export interface GenesisMetadata {
  /** store key of metadata without clientID-prefix */
  key: Uint8Array;
  /** metadata value */
  value: Uint8Array;
}
export interface GenesisMetadataProtoMsg {
  typeUrl: "/ibc.core.client.v1.GenesisMetadata";
  value: Uint8Array;
}
/**
 * GenesisMetadata defines the genesis type for metadata that clients may return
 * with ExportMetadata
 */
export interface GenesisMetadataAmino {
  /** store key of metadata without clientID-prefix */
  key: Uint8Array;
  /** metadata value */
  value: Uint8Array;
}
export interface GenesisMetadataAminoMsg {
  type: "cosmos-sdk/GenesisMetadata";
  value: GenesisMetadataAmino;
}
/**
 * GenesisMetadata defines the genesis type for metadata that clients may return
 * with ExportMetadata
 */
export interface GenesisMetadataSDKType {
  key: Uint8Array;
  value: Uint8Array;
}
/**
 * IdentifiedGenesisMetadata has the client metadata with the corresponding
 * client id.
 */
export interface IdentifiedGenesisMetadata {
  clientId: string;
  clientMetadata: GenesisMetadata[];
}
export interface IdentifiedGenesisMetadataProtoMsg {
  typeUrl: "/ibc.core.client.v1.IdentifiedGenesisMetadata";
  value: Uint8Array;
}
/**
 * IdentifiedGenesisMetadata has the client metadata with the corresponding
 * client id.
 */
export interface IdentifiedGenesisMetadataAmino {
  client_id: string;
  client_metadata: GenesisMetadataAmino[];
}
export interface IdentifiedGenesisMetadataAminoMsg {
  type: "cosmos-sdk/IdentifiedGenesisMetadata";
  value: IdentifiedGenesisMetadataAmino;
}
/**
 * IdentifiedGenesisMetadata has the client metadata with the corresponding
 * client id.
 */
export interface IdentifiedGenesisMetadataSDKType {
  client_id: string;
  client_metadata: GenesisMetadataSDKType[];
}