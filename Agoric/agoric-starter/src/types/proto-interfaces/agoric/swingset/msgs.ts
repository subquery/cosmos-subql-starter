import { Long } from "../../helpers";
/** MsgDeliverInbound defines an SDK message for delivering an eventual send */
export interface MsgDeliverInbound {
  messages: string[];
  nums: Long[];
  ack: Long;
  submitter: Uint8Array;
}
export interface MsgDeliverInboundProtoMsg {
  typeUrl: "/agoric.swingset.MsgDeliverInbound";
  value: Uint8Array;
}
/** MsgDeliverInbound defines an SDK message for delivering an eventual send */
export interface MsgDeliverInboundAmino {
  messages: string[];
  nums: string[];
  ack: string;
  submitter: Uint8Array;
}
export interface MsgDeliverInboundAminoMsg {
  type: "/agoric.swingset.MsgDeliverInbound";
  value: MsgDeliverInboundAmino;
}
/** MsgDeliverInbound defines an SDK message for delivering an eventual send */
export interface MsgDeliverInboundSDKType {
  messages: string[];
  nums: Long[];
  ack: Long;
  submitter: Uint8Array;
}
/** MsgDeliverInboundResponse is an empty reply. */
export interface MsgDeliverInboundResponse {}
export interface MsgDeliverInboundResponseProtoMsg {
  typeUrl: "/agoric.swingset.MsgDeliverInboundResponse";
  value: Uint8Array;
}
/** MsgDeliverInboundResponse is an empty reply. */
export interface MsgDeliverInboundResponseAmino {}
export interface MsgDeliverInboundResponseAminoMsg {
  type: "/agoric.swingset.MsgDeliverInboundResponse";
  value: MsgDeliverInboundResponseAmino;
}
/** MsgDeliverInboundResponse is an empty reply. */
export interface MsgDeliverInboundResponseSDKType {}
/**
 * MsgWalletAction defines an SDK message for the on-chain wallet to perform an
 * action that *does not* spend any assets (other than gas fees/stamps).  This
 * message type is typically protected by feegrant budgets.
 */
export interface MsgWalletAction {
  owner: Uint8Array;
  /** The action to perform, as JSON-stringified marshalled data. */
  action: string;
}
export interface MsgWalletActionProtoMsg {
  typeUrl: "/agoric.swingset.MsgWalletAction";
  value: Uint8Array;
}
/**
 * MsgWalletAction defines an SDK message for the on-chain wallet to perform an
 * action that *does not* spend any assets (other than gas fees/stamps).  This
 * message type is typically protected by feegrant budgets.
 */
export interface MsgWalletActionAmino {
  owner: Uint8Array;
  /** The action to perform, as JSON-stringified marshalled data. */
  action: string;
}
export interface MsgWalletActionAminoMsg {
  type: "/agoric.swingset.MsgWalletAction";
  value: MsgWalletActionAmino;
}
/**
 * MsgWalletAction defines an SDK message for the on-chain wallet to perform an
 * action that *does not* spend any assets (other than gas fees/stamps).  This
 * message type is typically protected by feegrant budgets.
 */
export interface MsgWalletActionSDKType {
  owner: Uint8Array;
  action: string;
}
/** MsgWalletActionResponse is an empty reply. */
export interface MsgWalletActionResponse {}
export interface MsgWalletActionResponseProtoMsg {
  typeUrl: "/agoric.swingset.MsgWalletActionResponse";
  value: Uint8Array;
}
/** MsgWalletActionResponse is an empty reply. */
export interface MsgWalletActionResponseAmino {}
export interface MsgWalletActionResponseAminoMsg {
  type: "/agoric.swingset.MsgWalletActionResponse";
  value: MsgWalletActionResponseAmino;
}
/** MsgWalletActionResponse is an empty reply. */
export interface MsgWalletActionResponseSDKType {}
/**
 * MsgWalletSpendAction defines an SDK message for the on-chain wallet to
 * perform an action that *does spend the owner's assets.*  This message type is
 * typically protected by explicit confirmation by the user.
 */
export interface MsgWalletSpendAction {
  owner: Uint8Array;
  /** The action to perform, as JSON-stringified marshalled data. */
  spendAction: string;
}
export interface MsgWalletSpendActionProtoMsg {
  typeUrl: "/agoric.swingset.MsgWalletSpendAction";
  value: Uint8Array;
}
/**
 * MsgWalletSpendAction defines an SDK message for the on-chain wallet to
 * perform an action that *does spend the owner's assets.*  This message type is
 * typically protected by explicit confirmation by the user.
 */
export interface MsgWalletSpendActionAmino {
  owner: Uint8Array;
  /** The action to perform, as JSON-stringified marshalled data. */
  spend_action: string;
}
export interface MsgWalletSpendActionAminoMsg {
  type: "/agoric.swingset.MsgWalletSpendAction";
  value: MsgWalletSpendActionAmino;
}
/**
 * MsgWalletSpendAction defines an SDK message for the on-chain wallet to
 * perform an action that *does spend the owner's assets.*  This message type is
 * typically protected by explicit confirmation by the user.
 */
export interface MsgWalletSpendActionSDKType {
  owner: Uint8Array;
  spend_action: string;
}
/** MsgWalletSpendActionResponse is an empty reply. */
export interface MsgWalletSpendActionResponse {}
export interface MsgWalletSpendActionResponseProtoMsg {
  typeUrl: "/agoric.swingset.MsgWalletSpendActionResponse";
  value: Uint8Array;
}
/** MsgWalletSpendActionResponse is an empty reply. */
export interface MsgWalletSpendActionResponseAmino {}
export interface MsgWalletSpendActionResponseAminoMsg {
  type: "/agoric.swingset.MsgWalletSpendActionResponse";
  value: MsgWalletSpendActionResponseAmino;
}
/** MsgWalletSpendActionResponse is an empty reply. */
export interface MsgWalletSpendActionResponseSDKType {}
/** MsgProvision defines an SDK message for provisioning a client to the chain */
export interface MsgProvision {
  nickname: string;
  address: Uint8Array;
  powerFlags: string[];
  submitter: Uint8Array;
}
export interface MsgProvisionProtoMsg {
  typeUrl: "/agoric.swingset.MsgProvision";
  value: Uint8Array;
}
/** MsgProvision defines an SDK message for provisioning a client to the chain */
export interface MsgProvisionAmino {
  nickname: string;
  address: Uint8Array;
  power_flags: string[];
  submitter: Uint8Array;
}
export interface MsgProvisionAminoMsg {
  type: "/agoric.swingset.MsgProvision";
  value: MsgProvisionAmino;
}
/** MsgProvision defines an SDK message for provisioning a client to the chain */
export interface MsgProvisionSDKType {
  nickname: string;
  address: Uint8Array;
  power_flags: string[];
  submitter: Uint8Array;
}
/** MsgProvisionResponse is an empty reply. */
export interface MsgProvisionResponse {}
export interface MsgProvisionResponseProtoMsg {
  typeUrl: "/agoric.swingset.MsgProvisionResponse";
  value: Uint8Array;
}
/** MsgProvisionResponse is an empty reply. */
export interface MsgProvisionResponseAmino {}
export interface MsgProvisionResponseAminoMsg {
  type: "/agoric.swingset.MsgProvisionResponse";
  value: MsgProvisionResponseAmino;
}
/** MsgProvisionResponse is an empty reply. */
export interface MsgProvisionResponseSDKType {}
/** MsgInstallBundle carries a signed bundle to SwingSet. */
export interface MsgInstallBundle {
  bundle: string;
  submitter: Uint8Array;
  /**
   * Either bundle or compressed_bundle will be set.
   * Default compression algorithm is gzip.
   */
  compressedBundle: Uint8Array;
  /** Size in bytes of uncompression of compressed_bundle. */
  uncompressedSize: Long;
}
export interface MsgInstallBundleProtoMsg {
  typeUrl: "/agoric.swingset.MsgInstallBundle";
  value: Uint8Array;
}
/** MsgInstallBundle carries a signed bundle to SwingSet. */
export interface MsgInstallBundleAmino {
  bundle: string;
  submitter: Uint8Array;
  /**
   * Either bundle or compressed_bundle will be set.
   * Default compression algorithm is gzip.
   */
  compressed_bundle: Uint8Array;
  /** Size in bytes of uncompression of compressed_bundle. */
  uncompressed_size: string;
}
export interface MsgInstallBundleAminoMsg {
  type: "/agoric.swingset.MsgInstallBundle";
  value: MsgInstallBundleAmino;
}
/** MsgInstallBundle carries a signed bundle to SwingSet. */
export interface MsgInstallBundleSDKType {
  bundle: string;
  submitter: Uint8Array;
  compressed_bundle: Uint8Array;
  uncompressed_size: Long;
}
/**
 * MsgInstallBundleResponse is an empty acknowledgement that an install bundle
 * message has been queued for the SwingSet kernel's consideration.
 */
export interface MsgInstallBundleResponse {}
export interface MsgInstallBundleResponseProtoMsg {
  typeUrl: "/agoric.swingset.MsgInstallBundleResponse";
  value: Uint8Array;
}
/**
 * MsgInstallBundleResponse is an empty acknowledgement that an install bundle
 * message has been queued for the SwingSet kernel's consideration.
 */
export interface MsgInstallBundleResponseAmino {}
export interface MsgInstallBundleResponseAminoMsg {
  type: "/agoric.swingset.MsgInstallBundleResponse";
  value: MsgInstallBundleResponseAmino;
}
/**
 * MsgInstallBundleResponse is an empty acknowledgement that an install bundle
 * message has been queued for the SwingSet kernel's consideration.
 */
export interface MsgInstallBundleResponseSDKType {}