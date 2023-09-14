import {
  MerklePrefix,
  MerklePrefixAmino,
  MerklePrefixSDKType,
} from "../../commitment/v1/commitment";
import { Long } from "../../../../helpers";
/**
 * State defines if a connection is in one of the following states:
 * INIT, TRYOPEN, OPEN or UNINITIALIZED.
 */
export enum State {
  /** STATE_UNINITIALIZED_UNSPECIFIED - Default State */
  STATE_UNINITIALIZED_UNSPECIFIED = 0,
  /** STATE_INIT - A connection end has just started the opening handshake. */
  STATE_INIT = 1,
  /**
   * STATE_TRYOPEN - A connection end has acknowledged the handshake step on the counterparty
   * chain.
   */
  STATE_TRYOPEN = 2,
  /** STATE_OPEN - A connection end has completed the handshake. */
  STATE_OPEN = 3,
  UNRECOGNIZED = -1,
}
export const StateSDKType = State;
export const StateAmino = State;
export function stateFromJSON(object: any): State {
  switch (object) {
    case 0:
    case "STATE_UNINITIALIZED_UNSPECIFIED":
      return State.STATE_UNINITIALIZED_UNSPECIFIED;
    case 1:
    case "STATE_INIT":
      return State.STATE_INIT;
    case 2:
    case "STATE_TRYOPEN":
      return State.STATE_TRYOPEN;
    case 3:
    case "STATE_OPEN":
      return State.STATE_OPEN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return State.UNRECOGNIZED;
  }
}
export function stateToJSON(object: State): string {
  switch (object) {
    case State.STATE_UNINITIALIZED_UNSPECIFIED:
      return "STATE_UNINITIALIZED_UNSPECIFIED";
    case State.STATE_INIT:
      return "STATE_INIT";
    case State.STATE_TRYOPEN:
      return "STATE_TRYOPEN";
    case State.STATE_OPEN:
      return "STATE_OPEN";
    case State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/**
 * ConnectionEnd defines a stateful object on a chain connected to another
 * separate one.
 * NOTE: there must only be 2 defined ConnectionEnds to establish
 * a connection between two chains.
 */
export interface ConnectionEnd {
  /** client associated with this connection. */
  clientId: string;
  /**
   * IBC version which can be utilised to determine encodings or protocols for
   * channels or packets utilising this connection.
   */
  versions: Version[];
  /** current state of the connection end. */
  state: State;
  /** counterparty chain associated with this connection. */
  counterparty: Counterparty;
  /**
   * delay period that must pass before a consensus state can be used for
   * packet-verification NOTE: delay period logic is only implemented by some
   * clients.
   */
  delayPeriod: Long;
}
export interface ConnectionEndProtoMsg {
  typeUrl: "/ibc.core.connection.v1.ConnectionEnd";
  value: Uint8Array;
}
/**
 * ConnectionEnd defines a stateful object on a chain connected to another
 * separate one.
 * NOTE: there must only be 2 defined ConnectionEnds to establish
 * a connection between two chains.
 */
export interface ConnectionEndAmino {
  /** client associated with this connection. */
  client_id: string;
  /**
   * IBC version which can be utilised to determine encodings or protocols for
   * channels or packets utilising this connection.
   */
  versions: VersionAmino[];
  /** current state of the connection end. */
  state: State;
  /** counterparty chain associated with this connection. */
  counterparty?: CounterpartyAmino;
  /**
   * delay period that must pass before a consensus state can be used for
   * packet-verification NOTE: delay period logic is only implemented by some
   * clients.
   */
  delay_period: string;
}
export interface ConnectionEndAminoMsg {
  type: "cosmos-sdk/ConnectionEnd";
  value: ConnectionEndAmino;
}
/**
 * ConnectionEnd defines a stateful object on a chain connected to another
 * separate one.
 * NOTE: there must only be 2 defined ConnectionEnds to establish
 * a connection between two chains.
 */
export interface ConnectionEndSDKType {
  client_id: string;
  versions: VersionSDKType[];
  state: State;
  counterparty: CounterpartySDKType;
  delay_period: Long;
}
/**
 * IdentifiedConnection defines a connection with additional connection
 * identifier field.
 */
export interface IdentifiedConnection {
  /** connection identifier. */
  id: string;
  /** client associated with this connection. */
  clientId: string;
  /**
   * IBC version which can be utilised to determine encodings or protocols for
   * channels or packets utilising this connection
   */
  versions: Version[];
  /** current state of the connection end. */
  state: State;
  /** counterparty chain associated with this connection. */
  counterparty: Counterparty;
  /** delay period associated with this connection. */
  delayPeriod: Long;
}
export interface IdentifiedConnectionProtoMsg {
  typeUrl: "/ibc.core.connection.v1.IdentifiedConnection";
  value: Uint8Array;
}
/**
 * IdentifiedConnection defines a connection with additional connection
 * identifier field.
 */
export interface IdentifiedConnectionAmino {
  /** connection identifier. */
  id: string;
  /** client associated with this connection. */
  client_id: string;
  /**
   * IBC version which can be utilised to determine encodings or protocols for
   * channels or packets utilising this connection
   */
  versions: VersionAmino[];
  /** current state of the connection end. */
  state: State;
  /** counterparty chain associated with this connection. */
  counterparty?: CounterpartyAmino;
  /** delay period associated with this connection. */
  delay_period: string;
}
export interface IdentifiedConnectionAminoMsg {
  type: "cosmos-sdk/IdentifiedConnection";
  value: IdentifiedConnectionAmino;
}
/**
 * IdentifiedConnection defines a connection with additional connection
 * identifier field.
 */
export interface IdentifiedConnectionSDKType {
  id: string;
  client_id: string;
  versions: VersionSDKType[];
  state: State;
  counterparty: CounterpartySDKType;
  delay_period: Long;
}
/** Counterparty defines the counterparty chain associated with a connection end. */
export interface Counterparty {
  /**
   * identifies the client on the counterparty chain associated with a given
   * connection.
   */
  clientId: string;
  /**
   * identifies the connection end on the counterparty chain associated with a
   * given connection.
   */
  connectionId: string;
  /** commitment merkle prefix of the counterparty chain. */
  prefix: MerklePrefix;
}
export interface CounterpartyProtoMsg {
  typeUrl: "/ibc.core.connection.v1.Counterparty";
  value: Uint8Array;
}
/** Counterparty defines the counterparty chain associated with a connection end. */
export interface CounterpartyAmino {
  /**
   * identifies the client on the counterparty chain associated with a given
   * connection.
   */
  client_id: string;
  /**
   * identifies the connection end on the counterparty chain associated with a
   * given connection.
   */
  connection_id: string;
  /** commitment merkle prefix of the counterparty chain. */
  prefix?: MerklePrefixAmino;
}
export interface CounterpartyAminoMsg {
  type: "cosmos-sdk/Counterparty";
  value: CounterpartyAmino;
}
/** Counterparty defines the counterparty chain associated with a connection end. */
export interface CounterpartySDKType {
  client_id: string;
  connection_id: string;
  prefix: MerklePrefixSDKType;
}
/** ClientPaths define all the connection paths for a client state. */
export interface ClientPaths {
  /** list of connection paths */
  paths: string[];
}
export interface ClientPathsProtoMsg {
  typeUrl: "/ibc.core.connection.v1.ClientPaths";
  value: Uint8Array;
}
/** ClientPaths define all the connection paths for a client state. */
export interface ClientPathsAmino {
  /** list of connection paths */
  paths: string[];
}
export interface ClientPathsAminoMsg {
  type: "cosmos-sdk/ClientPaths";
  value: ClientPathsAmino;
}
/** ClientPaths define all the connection paths for a client state. */
export interface ClientPathsSDKType {
  paths: string[];
}
/** ConnectionPaths define all the connection paths for a given client state. */
export interface ConnectionPaths {
  /** client state unique identifier */
  clientId: string;
  /** list of connection paths */
  paths: string[];
}
export interface ConnectionPathsProtoMsg {
  typeUrl: "/ibc.core.connection.v1.ConnectionPaths";
  value: Uint8Array;
}
/** ConnectionPaths define all the connection paths for a given client state. */
export interface ConnectionPathsAmino {
  /** client state unique identifier */
  client_id: string;
  /** list of connection paths */
  paths: string[];
}
export interface ConnectionPathsAminoMsg {
  type: "cosmos-sdk/ConnectionPaths";
  value: ConnectionPathsAmino;
}
/** ConnectionPaths define all the connection paths for a given client state. */
export interface ConnectionPathsSDKType {
  client_id: string;
  paths: string[];
}
/**
 * Version defines the versioning scheme used to negotiate the IBC verison in
 * the connection handshake.
 */
export interface Version {
  /** unique version identifier */
  identifier: string;
  /** list of features compatible with the specified identifier */
  features: string[];
}
export interface VersionProtoMsg {
  typeUrl: "/ibc.core.connection.v1.Version";
  value: Uint8Array;
}
/**
 * Version defines the versioning scheme used to negotiate the IBC verison in
 * the connection handshake.
 */
export interface VersionAmino {
  /** unique version identifier */
  identifier: string;
  /** list of features compatible with the specified identifier */
  features: string[];
}
export interface VersionAminoMsg {
  type: "cosmos-sdk/Version";
  value: VersionAmino;
}
/**
 * Version defines the versioning scheme used to negotiate the IBC verison in
 * the connection handshake.
 */
export interface VersionSDKType {
  identifier: string;
  features: string[];
}
/** Params defines the set of Connection parameters. */
export interface Params {
  /**
   * maximum expected time per block (in nanoseconds), used to enforce block delay. This parameter should reflect the
   * largest amount of time that the chain might reasonably take to produce the next block under normal operating
   * conditions. A safe choice is 3-5x the expected time per block.
   */
  maxExpectedTimePerBlock: Long;
}
export interface ParamsProtoMsg {
  typeUrl: "/ibc.core.connection.v1.Params";
  value: Uint8Array;
}
/** Params defines the set of Connection parameters. */
export interface ParamsAmino {
  /**
   * maximum expected time per block (in nanoseconds), used to enforce block delay. This parameter should reflect the
   * largest amount of time that the chain might reasonably take to produce the next block under normal operating
   * conditions. A safe choice is 3-5x the expected time per block.
   */
  max_expected_time_per_block: string;
}
export interface ParamsAminoMsg {
  type: "cosmos-sdk/Params";
  value: ParamsAmino;
}
/** Params defines the set of Connection parameters. */
export interface ParamsSDKType {
  max_expected_time_per_block: Long;
}
