import {
  Coin,
  CoinAmino,
  CoinSDKType,
} from "../../../cosmos/base/v1beta1/coin";
import { Any, AnyAmino, AnySDKType } from "../../../google/protobuf/any";
/** MsgRegisterAccount is the request type for the Msg/RegisterAccount RPC method. */
export interface MsgRegisterAccount {
  /** Sender is the account executing this message. */
  sender: string;
  /**
   * ConnectionId identifies the connection on which the interchain account is
   * to be registered.
   */
  connectionId: string;
}
export interface MsgRegisterAccountProtoMsg {
  typeUrl: "/mars.envoy.v1beta1.MsgRegisterAccount";
  value: Uint8Array;
}
/** MsgRegisterAccount is the request type for the Msg/RegisterAccount RPC method. */
export interface MsgRegisterAccountAmino {
  /** Sender is the account executing this message. */
  sender: string;
  /**
   * ConnectionId identifies the connection on which the interchain account is
   * to be registered.
   */
  connection_id: string;
}
export interface MsgRegisterAccountAminoMsg {
  type: "/mars.envoy.v1beta1.MsgRegisterAccount";
  value: MsgRegisterAccountAmino;
}
/** MsgRegisterAccount is the request type for the Msg/RegisterAccount RPC method. */
export interface MsgRegisterAccountSDKType {
  sender: string;
  connection_id: string;
}
/**
 * MsgRegisterAccountResponse is the response type for the Msg/RegisterAccount
 * RPC method.
 */
export interface MsgRegisterAccountResponse {}
export interface MsgRegisterAccountResponseProtoMsg {
  typeUrl: "/mars.envoy.v1beta1.MsgRegisterAccountResponse";
  value: Uint8Array;
}
/**
 * MsgRegisterAccountResponse is the response type for the Msg/RegisterAccount
 * RPC method.
 */
export interface MsgRegisterAccountResponseAmino {}
export interface MsgRegisterAccountResponseAminoMsg {
  type: "/mars.envoy.v1beta1.MsgRegisterAccountResponse";
  value: MsgRegisterAccountResponseAmino;
}
/**
 * MsgRegisterAccountResponse is the response type for the Msg/RegisterAccount
 * RPC method.
 */
export interface MsgRegisterAccountResponseSDKType {}
/**
 * MsgSendFunds is the request type for the Msg/SendFunds RPC method.
 *
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 *
 * We do not need to specify the recipient address in this message, as it can be
 * deduced from the channel id.
 */
export interface MsgSendFunds {
  /**
   * Authority is the account executing this message.
   * It is typically the x/gov module account.
   */
  authority: string;
  /**
   * ChannelId identifies the channel through which the transfer is to be sent.
   *
   * Unlike other messages of this module which only requires specifying the
   * connection id, we have to specify the channel id here, because there can be
   * multiple transfer channels associated with the same connection.
   */
  channelId: string;
  /**
   * Amount is the coins that are to be sent.
   *
   * Here we support multiple coins in one proposal. As ICS-20 specs only allow
   * one denom per packet, we will have one packet per denom.
   */
  amount: Coin[];
}
export interface MsgSendFundsProtoMsg {
  typeUrl: "/mars.envoy.v1beta1.MsgSendFunds";
  value: Uint8Array;
}
/**
 * MsgSendFunds is the request type for the Msg/SendFunds RPC method.
 *
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 *
 * We do not need to specify the recipient address in this message, as it can be
 * deduced from the channel id.
 */
export interface MsgSendFundsAmino {
  /**
   * Authority is the account executing this message.
   * It is typically the x/gov module account.
   */
  authority: string;
  /**
   * ChannelId identifies the channel through which the transfer is to be sent.
   *
   * Unlike other messages of this module which only requires specifying the
   * connection id, we have to specify the channel id here, because there can be
   * multiple transfer channels associated with the same connection.
   */
  channel_id: string;
  /**
   * Amount is the coins that are to be sent.
   *
   * Here we support multiple coins in one proposal. As ICS-20 specs only allow
   * one denom per packet, we will have one packet per denom.
   */
  amount: CoinAmino[];
}
export interface MsgSendFundsAminoMsg {
  type: "/mars.envoy.v1beta1.MsgSendFunds";
  value: MsgSendFundsAmino;
}
/**
 * MsgSendFunds is the request type for the Msg/SendFunds RPC method.
 *
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 *
 * We do not need to specify the recipient address in this message, as it can be
 * deduced from the channel id.
 */
export interface MsgSendFundsSDKType {
  authority: string;
  channel_id: string;
  amount: CoinSDKType[];
}
/** MsgSendFundsResponse is the respones type for the Msg/SendFunds RPC method. */
export interface MsgSendFundsResponse {}
export interface MsgSendFundsResponseProtoMsg {
  typeUrl: "/mars.envoy.v1beta1.MsgSendFundsResponse";
  value: Uint8Array;
}
/** MsgSendFundsResponse is the respones type for the Msg/SendFunds RPC method. */
export interface MsgSendFundsResponseAmino {}
export interface MsgSendFundsResponseAminoMsg {
  type: "/mars.envoy.v1beta1.MsgSendFundsResponse";
  value: MsgSendFundsResponseAmino;
}
/** MsgSendFundsResponse is the respones type for the Msg/SendFunds RPC method. */
export interface MsgSendFundsResponseSDKType {}
/**
 * MsgSendMessages is the request type for the Msg/SendMessages RPC method.
 *
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 */
export interface MsgSendMessages {
  /**
   * Authority is the account executing this message.
   * It is typically the x/gov module account.
   */
  authority: string;
  /**
   * ConnectionId identifies the connection through which the messages are to
   * be sent.
   */
  connectionId: string;
  /**
   * Messages is an array of one or more messages that are to be executed by the
   * interchain account.
   */
  messages: Any[];
}
export interface MsgSendMessagesProtoMsg {
  typeUrl: "/mars.envoy.v1beta1.MsgSendMessages";
  value: Uint8Array;
}
/**
 * MsgSendMessages is the request type for the Msg/SendMessages RPC method.
 *
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 */
export interface MsgSendMessagesAmino {
  /**
   * Authority is the account executing this message.
   * It is typically the x/gov module account.
   */
  authority: string;
  /**
   * ConnectionId identifies the connection through which the messages are to
   * be sent.
   */
  connection_id: string;
  /**
   * Messages is an array of one or more messages that are to be executed by the
   * interchain account.
   */
  messages: AnyAmino[];
}
export interface MsgSendMessagesAminoMsg {
  type: "/mars.envoy.v1beta1.MsgSendMessages";
  value: MsgSendMessagesAmino;
}
/**
 * MsgSendMessages is the request type for the Msg/SendMessages RPC method.
 *
 * This message is typically executed via a governance proposal with the gov
 * module being the executing authority.
 */
export interface MsgSendMessagesSDKType {
  authority: string;
  connection_id: string;
  messages: AnySDKType[];
}
/**
 * MsgSendMessagesResponse is the response type for the Msg/SendMessages RPC
 * method.
 */
export interface MsgSendMessagesResponse {}
export interface MsgSendMessagesResponseProtoMsg {
  typeUrl: "/mars.envoy.v1beta1.MsgSendMessagesResponse";
  value: Uint8Array;
}
/**
 * MsgSendMessagesResponse is the response type for the Msg/SendMessages RPC
 * method.
 */
export interface MsgSendMessagesResponseAmino {}
export interface MsgSendMessagesResponseAminoMsg {
  type: "/mars.envoy.v1beta1.MsgSendMessagesResponse";
  value: MsgSendMessagesResponseAmino;
}
/**
 * MsgSendMessagesResponse is the response type for the Msg/SendMessages RPC
 * method.
 */
export interface MsgSendMessagesResponseSDKType {}
