import { Long } from "../../helpers";
export interface ProtocolVersion {
  p2p: Long;
  block: Long;
  app: Long;
}
export interface ProtocolVersionProtoMsg {
  typeUrl: "/tendermint.p2p.ProtocolVersion";
  value: Uint8Array;
}
export interface ProtocolVersionAmino {
  p2p: string;
  block: string;
  app: string;
}
export interface ProtocolVersionAminoMsg {
  type: "/tendermint.p2p.ProtocolVersion";
  value: ProtocolVersionAmino;
}
export interface ProtocolVersionSDKType {
  p2p: Long;
  block: Long;
  app: Long;
}
export interface NodeInfo {
  protocolVersion: ProtocolVersion;
  nodeId: string;
  listenAddr: string;
  network: string;
  version: string;
  channels: Uint8Array;
  moniker: string;
  other: NodeInfoOther;
}
export interface NodeInfoProtoMsg {
  typeUrl: "/tendermint.p2p.NodeInfo";
  value: Uint8Array;
}
export interface NodeInfoAmino {
  protocol_version?: ProtocolVersionAmino;
  node_id: string;
  listen_addr: string;
  network: string;
  version: string;
  channels: Uint8Array;
  moniker: string;
  other?: NodeInfoOtherAmino;
}
export interface NodeInfoAminoMsg {
  type: "/tendermint.p2p.NodeInfo";
  value: NodeInfoAmino;
}
export interface NodeInfoSDKType {
  protocol_version: ProtocolVersionSDKType;
  node_id: string;
  listen_addr: string;
  network: string;
  version: string;
  channels: Uint8Array;
  moniker: string;
  other: NodeInfoOtherSDKType;
}
export interface NodeInfoOther {
  txIndex: string;
  rpcAddress: string;
}
export interface NodeInfoOtherProtoMsg {
  typeUrl: "/tendermint.p2p.NodeInfoOther";
  value: Uint8Array;
}
export interface NodeInfoOtherAmino {
  tx_index: string;
  rpc_address: string;
}
export interface NodeInfoOtherAminoMsg {
  type: "/tendermint.p2p.NodeInfoOther";
  value: NodeInfoOtherAmino;
}
export interface NodeInfoOtherSDKType {
  tx_index: string;
  rpc_address: string;
}
export interface PeerInfo {
  id: string;
  addressInfo: PeerAddressInfo[];
  lastConnected: Date;
}
export interface PeerInfoProtoMsg {
  typeUrl: "/tendermint.p2p.PeerInfo";
  value: Uint8Array;
}
export interface PeerInfoAmino {
  id: string;
  address_info: PeerAddressInfoAmino[];
  last_connected?: Date;
}
export interface PeerInfoAminoMsg {
  type: "/tendermint.p2p.PeerInfo";
  value: PeerInfoAmino;
}
export interface PeerInfoSDKType {
  id: string;
  address_info: PeerAddressInfoSDKType[];
  last_connected: Date;
}
export interface PeerAddressInfo {
  address: string;
  lastDialSuccess: Date;
  lastDialFailure: Date;
  dialFailures: number;
}
export interface PeerAddressInfoProtoMsg {
  typeUrl: "/tendermint.p2p.PeerAddressInfo";
  value: Uint8Array;
}
export interface PeerAddressInfoAmino {
  address: string;
  last_dial_success?: Date;
  last_dial_failure?: Date;
  dial_failures: number;
}
export interface PeerAddressInfoAminoMsg {
  type: "/tendermint.p2p.PeerAddressInfo";
  value: PeerAddressInfoAmino;
}
export interface PeerAddressInfoSDKType {
  address: string;
  last_dial_success: Date;
  last_dial_failure: Date;
  dial_failures: number;
}