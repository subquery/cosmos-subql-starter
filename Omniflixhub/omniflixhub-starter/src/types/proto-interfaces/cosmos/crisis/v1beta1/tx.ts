/** MsgVerifyInvariant represents a message to verify a particular invariance. */
export interface MsgVerifyInvariant {
  sender: string;
  invariantModuleName: string;
  invariantRoute: string;
}
export interface MsgVerifyInvariantProtoMsg {
  typeUrl: "/cosmos.crisis.v1beta1.MsgVerifyInvariant";
  value: Uint8Array;
}
/** MsgVerifyInvariant represents a message to verify a particular invariance. */
export interface MsgVerifyInvariantAmino {
  sender: string;
  invariant_module_name: string;
  invariant_route: string;
}
export interface MsgVerifyInvariantAminoMsg {
  type: "cosmos-sdk/MsgVerifyInvariant";
  value: MsgVerifyInvariantAmino;
}
/** MsgVerifyInvariant represents a message to verify a particular invariance. */
export interface MsgVerifyInvariantSDKType {
  sender: string;
  invariant_module_name: string;
  invariant_route: string;
}
/** MsgVerifyInvariantResponse defines the Msg/VerifyInvariant response type. */
export interface MsgVerifyInvariantResponse {}
export interface MsgVerifyInvariantResponseProtoMsg {
  typeUrl: "/cosmos.crisis.v1beta1.MsgVerifyInvariantResponse";
  value: Uint8Array;
}
/** MsgVerifyInvariantResponse defines the Msg/VerifyInvariant response type. */
export interface MsgVerifyInvariantResponseAmino {}
export interface MsgVerifyInvariantResponseAminoMsg {
  type: "cosmos-sdk/MsgVerifyInvariantResponse";
  value: MsgVerifyInvariantResponseAmino;
}
/** MsgVerifyInvariantResponse defines the Msg/VerifyInvariant response type. */
export interface MsgVerifyInvariantResponseSDKType {}
