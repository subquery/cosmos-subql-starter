import {
  IdentifiedConnection,
  IdentifiedConnectionAmino,
  IdentifiedConnectionSDKType,
  ConnectionPaths,
  ConnectionPathsAmino,
  ConnectionPathsSDKType,
  Params,
  ParamsAmino,
  ParamsSDKType,
} from "./connection";
import { Long } from "../../../../helpers";
/** GenesisState defines the ibc connection submodule's genesis state. */
export interface GenesisState {
  connections: IdentifiedConnection[];
  clientConnectionPaths: ConnectionPaths[];
  /** the sequence for the next generated connection identifier */
  nextConnectionSequence: Long;
  params: Params;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/ibc.core.connection.v1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the ibc connection submodule's genesis state. */
export interface GenesisStateAmino {
  connections: IdentifiedConnectionAmino[];
  client_connection_paths: ConnectionPathsAmino[];
  /** the sequence for the next generated connection identifier */
  next_connection_sequence: string;
  params?: ParamsAmino;
}
export interface GenesisStateAminoMsg {
  type: "cosmos-sdk/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the ibc connection submodule's genesis state. */
export interface GenesisStateSDKType {
  connections: IdentifiedConnectionSDKType[];
  client_connection_paths: ConnectionPathsSDKType[];
  next_connection_sequence: Long;
  params: ParamsSDKType;
}
