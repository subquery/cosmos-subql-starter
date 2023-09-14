import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin";
import {
  Input,
  InputAmino,
  InputSDKType,
  Output,
  OutputAmino,
  OutputSDKType,
} from "./bank";
/** MsgSend represents a message to send coins from one account to another. */
export interface MsgSend {
  fromAddress: string;
  toAddress: string;
  amount: Coin[];
}
export interface MsgSendProtoMsg {
  typeUrl: "/cosmos.bank.v1beta1.MsgSend";
  value: Uint8Array;
}
/** MsgSend represents a message to send coins from one account to another. */
export interface MsgSendAmino {
  from_address: string;
  to_address: string;
  amount: CoinAmino[];
}
export interface MsgSendAminoMsg {
  type: "cosmos-sdk/MsgSend";
  value: MsgSendAmino;
}
/** MsgSend represents a message to send coins from one account to another. */
export interface MsgSendSDKType {
  from_address: string;
  to_address: string;
  amount: CoinSDKType[];
}
/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgSendResponse {}
export interface MsgSendResponseProtoMsg {
  typeUrl: "/cosmos.bank.v1beta1.MsgSendResponse";
  value: Uint8Array;
}
/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgSendResponseAmino {}
export interface MsgSendResponseAminoMsg {
  type: "cosmos-sdk/MsgSendResponse";
  value: MsgSendResponseAmino;
}
/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgSendResponseSDKType {}
/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export interface MsgMultiSend {
  inputs: Input[];
  outputs: Output[];
}
export interface MsgMultiSendProtoMsg {
  typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend";
  value: Uint8Array;
}
/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export interface MsgMultiSendAmino {
  inputs: InputAmino[];
  outputs: OutputAmino[];
}
export interface MsgMultiSendAminoMsg {
  type: "cosmos-sdk/MsgMultiSend";
  value: MsgMultiSendAmino;
}
/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export interface MsgMultiSendSDKType {
  inputs: InputSDKType[];
  outputs: OutputSDKType[];
}
/** MsgMultiSendResponse defines the Msg/MultiSend response type. */
export interface MsgMultiSendResponse {}
export interface MsgMultiSendResponseProtoMsg {
  typeUrl: "/cosmos.bank.v1beta1.MsgMultiSendResponse";
  value: Uint8Array;
}
/** MsgMultiSendResponse defines the Msg/MultiSend response type. */
export interface MsgMultiSendResponseAmino {}
export interface MsgMultiSendResponseAminoMsg {
  type: "cosmos-sdk/MsgMultiSendResponse";
  value: MsgMultiSendResponseAmino;
}
/** MsgMultiSendResponse defines the Msg/MultiSend response type. */
export interface MsgMultiSendResponseSDKType {}
