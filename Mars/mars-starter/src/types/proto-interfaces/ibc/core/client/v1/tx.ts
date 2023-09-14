import { Any, AnyAmino, AnySDKType } from "../../../../google/protobuf/any";
/** MsgCreateClient defines a message to create an IBC client */
export interface MsgCreateClient {
  /** light client state */
  clientState: Any;
  /**
   * consensus state associated with the client that corresponds to a given
   * height.
   */
  consensusState: Any;
  /** signer address */
  signer: string;
}
export interface MsgCreateClientProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgCreateClient";
  value: Uint8Array;
}
/** MsgCreateClient defines a message to create an IBC client */
export interface MsgCreateClientAmino {
  /** light client state */
  client_state?: AnyAmino;
  /**
   * consensus state associated with the client that corresponds to a given
   * height.
   */
  consensus_state?: AnyAmino;
  /** signer address */
  signer: string;
}
export interface MsgCreateClientAminoMsg {
  type: "cosmos-sdk/MsgCreateClient";
  value: MsgCreateClientAmino;
}
/** MsgCreateClient defines a message to create an IBC client */
export interface MsgCreateClientSDKType {
  client_state: AnySDKType;
  consensus_state: AnySDKType;
  signer: string;
}
/** MsgCreateClientResponse defines the Msg/CreateClient response type. */
export interface MsgCreateClientResponse {}
export interface MsgCreateClientResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgCreateClientResponse";
  value: Uint8Array;
}
/** MsgCreateClientResponse defines the Msg/CreateClient response type. */
export interface MsgCreateClientResponseAmino {}
export interface MsgCreateClientResponseAminoMsg {
  type: "cosmos-sdk/MsgCreateClientResponse";
  value: MsgCreateClientResponseAmino;
}
/** MsgCreateClientResponse defines the Msg/CreateClient response type. */
export interface MsgCreateClientResponseSDKType {}
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using
 * the given header.
 */
export interface MsgUpdateClient {
  /** client unique identifier */
  clientId: string;
  /** header to update the light client */
  header: Any;
  /** signer address */
  signer: string;
}
export interface MsgUpdateClientProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgUpdateClient";
  value: Uint8Array;
}
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using
 * the given header.
 */
export interface MsgUpdateClientAmino {
  /** client unique identifier */
  client_id: string;
  /** header to update the light client */
  header?: AnyAmino;
  /** signer address */
  signer: string;
}
export interface MsgUpdateClientAminoMsg {
  type: "cosmos-sdk/MsgUpdateClient";
  value: MsgUpdateClientAmino;
}
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using
 * the given header.
 */
export interface MsgUpdateClientSDKType {
  client_id: string;
  header: AnySDKType;
  signer: string;
}
/** MsgUpdateClientResponse defines the Msg/UpdateClient response type. */
export interface MsgUpdateClientResponse {}
export interface MsgUpdateClientResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgUpdateClientResponse";
  value: Uint8Array;
}
/** MsgUpdateClientResponse defines the Msg/UpdateClient response type. */
export interface MsgUpdateClientResponseAmino {}
export interface MsgUpdateClientResponseAminoMsg {
  type: "cosmos-sdk/MsgUpdateClientResponse";
  value: MsgUpdateClientResponseAmino;
}
/** MsgUpdateClientResponse defines the Msg/UpdateClient response type. */
export interface MsgUpdateClientResponseSDKType {}
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client
 * state
 */
export interface MsgUpgradeClient {
  /** client unique identifier */
  clientId: string;
  /** upgraded client state */
  clientState: Any;
  /**
   * upgraded consensus state, only contains enough information to serve as a
   * basis of trust in update logic
   */
  consensusState: Any;
  /** proof that old chain committed to new client */
  proofUpgradeClient: Uint8Array;
  /** proof that old chain committed to new consensus state */
  proofUpgradeConsensusState: Uint8Array;
  /** signer address */
  signer: string;
}
export interface MsgUpgradeClientProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgUpgradeClient";
  value: Uint8Array;
}
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client
 * state
 */
export interface MsgUpgradeClientAmino {
  /** client unique identifier */
  client_id: string;
  /** upgraded client state */
  client_state?: AnyAmino;
  /**
   * upgraded consensus state, only contains enough information to serve as a
   * basis of trust in update logic
   */
  consensus_state?: AnyAmino;
  /** proof that old chain committed to new client */
  proof_upgrade_client: Uint8Array;
  /** proof that old chain committed to new consensus state */
  proof_upgrade_consensus_state: Uint8Array;
  /** signer address */
  signer: string;
}
export interface MsgUpgradeClientAminoMsg {
  type: "cosmos-sdk/MsgUpgradeClient";
  value: MsgUpgradeClientAmino;
}
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client
 * state
 */
export interface MsgUpgradeClientSDKType {
  client_id: string;
  client_state: AnySDKType;
  consensus_state: AnySDKType;
  proof_upgrade_client: Uint8Array;
  proof_upgrade_consensus_state: Uint8Array;
  signer: string;
}
/** MsgUpgradeClientResponse defines the Msg/UpgradeClient response type. */
export interface MsgUpgradeClientResponse {}
export interface MsgUpgradeClientResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgUpgradeClientResponse";
  value: Uint8Array;
}
/** MsgUpgradeClientResponse defines the Msg/UpgradeClient response type. */
export interface MsgUpgradeClientResponseAmino {}
export interface MsgUpgradeClientResponseAminoMsg {
  type: "cosmos-sdk/MsgUpgradeClientResponse";
  value: MsgUpgradeClientResponseAmino;
}
/** MsgUpgradeClientResponse defines the Msg/UpgradeClient response type. */
export interface MsgUpgradeClientResponseSDKType {}
/**
 * MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for
 * light client misbehaviour.
 */
export interface MsgSubmitMisbehaviour {
  /** client unique identifier */
  clientId: string;
  /** misbehaviour used for freezing the light client */
  misbehaviour: Any;
  /** signer address */
  signer: string;
}
export interface MsgSubmitMisbehaviourProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviour";
  value: Uint8Array;
}
/**
 * MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for
 * light client misbehaviour.
 */
export interface MsgSubmitMisbehaviourAmino {
  /** client unique identifier */
  client_id: string;
  /** misbehaviour used for freezing the light client */
  misbehaviour?: AnyAmino;
  /** signer address */
  signer: string;
}
export interface MsgSubmitMisbehaviourAminoMsg {
  type: "cosmos-sdk/MsgSubmitMisbehaviour";
  value: MsgSubmitMisbehaviourAmino;
}
/**
 * MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for
 * light client misbehaviour.
 */
export interface MsgSubmitMisbehaviourSDKType {
  client_id: string;
  misbehaviour: AnySDKType;
  signer: string;
}
/**
 * MsgSubmitMisbehaviourResponse defines the Msg/SubmitMisbehaviour response
 * type.
 */
export interface MsgSubmitMisbehaviourResponse {}
export interface MsgSubmitMisbehaviourResponseProtoMsg {
  typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviourResponse";
  value: Uint8Array;
}
/**
 * MsgSubmitMisbehaviourResponse defines the Msg/SubmitMisbehaviour response
 * type.
 */
export interface MsgSubmitMisbehaviourResponseAmino {}
export interface MsgSubmitMisbehaviourResponseAminoMsg {
  type: "cosmos-sdk/MsgSubmitMisbehaviourResponse";
  value: MsgSubmitMisbehaviourResponseAmino;
}
/**
 * MsgSubmitMisbehaviourResponse defines the Msg/SubmitMisbehaviour response
 * type.
 */
export interface MsgSubmitMisbehaviourResponseSDKType {}
