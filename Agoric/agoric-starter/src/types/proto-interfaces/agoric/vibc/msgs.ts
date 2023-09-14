import {
  Packet,
  PacketAmino,
  PacketSDKType,
} from "../../ibc/core/channel/v1/channel";
/** MsgSendPacket is an SDK message for sending an outgoing IBC packet */
export interface MsgSendPacket {
  packet: Packet;
  sender: Uint8Array;
}
export interface MsgSendPacketProtoMsg {
  typeUrl: "/agoric.vibc.MsgSendPacket";
  value: Uint8Array;
}
/** MsgSendPacket is an SDK message for sending an outgoing IBC packet */
export interface MsgSendPacketAmino {
  packet?: PacketAmino;
  sender: Uint8Array;
}
export interface MsgSendPacketAminoMsg {
  type: "/agoric.vibc.MsgSendPacket";
  value: MsgSendPacketAmino;
}
/** MsgSendPacket is an SDK message for sending an outgoing IBC packet */
export interface MsgSendPacketSDKType {
  packet: PacketSDKType;
  sender: Uint8Array;
}
/** Empty response for SendPacket. */
export interface MsgSendPacketResponse {}
export interface MsgSendPacketResponseProtoMsg {
  typeUrl: "/agoric.vibc.MsgSendPacketResponse";
  value: Uint8Array;
}
/** Empty response for SendPacket. */
export interface MsgSendPacketResponseAmino {}
export interface MsgSendPacketResponseAminoMsg {
  type: "/agoric.vibc.MsgSendPacketResponse";
  value: MsgSendPacketResponseAmino;
}
/** Empty response for SendPacket. */
export interface MsgSendPacketResponseSDKType {}
