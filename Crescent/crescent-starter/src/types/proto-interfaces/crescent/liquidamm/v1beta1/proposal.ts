import { Long } from "../../../helpers";
export interface PublicPositionCreateProposal {
  title: string;
  description: string;
  poolId: Long;
  lowerPrice: string;
  upperPrice: string;
  minBidAmount: string;
  feeRate: string;
}
export interface PublicPositionCreateProposalProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.PublicPositionCreateProposal";
  value: Uint8Array;
}
export interface PublicPositionCreateProposalAmino {
  title: string;
  description: string;
  pool_id: string;
  lower_price: string;
  upper_price: string;
  min_bid_amount: string;
  fee_rate: string;
}
export interface PublicPositionCreateProposalAminoMsg {
  type: "/crescent.liquidamm.v1beta1.PublicPositionCreateProposal";
  value: PublicPositionCreateProposalAmino;
}
export interface PublicPositionCreateProposalSDKType {
  title: string;
  description: string;
  pool_id: Long;
  lower_price: string;
  upper_price: string;
  min_bid_amount: string;
  fee_rate: string;
}
export interface PublicPositionParameterChangeProposal {
  title: string;
  description: string;
  changes: PublicPositionParameterChange[];
}
export interface PublicPositionParameterChangeProposalProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.PublicPositionParameterChangeProposal";
  value: Uint8Array;
}
export interface PublicPositionParameterChangeProposalAmino {
  title: string;
  description: string;
  changes: PublicPositionParameterChangeAmino[];
}
export interface PublicPositionParameterChangeProposalAminoMsg {
  type: "/crescent.liquidamm.v1beta1.PublicPositionParameterChangeProposal";
  value: PublicPositionParameterChangeProposalAmino;
}
export interface PublicPositionParameterChangeProposalSDKType {
  title: string;
  description: string;
  changes: PublicPositionParameterChangeSDKType[];
}
export interface PublicPositionParameterChange {
  publicPositionId: Long;
  minBidAmount: string;
  feeRate: string;
}
export interface PublicPositionParameterChangeProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.PublicPositionParameterChange";
  value: Uint8Array;
}
export interface PublicPositionParameterChangeAmino {
  public_position_id: string;
  min_bid_amount: string;
  fee_rate: string;
}
export interface PublicPositionParameterChangeAminoMsg {
  type: "/crescent.liquidamm.v1beta1.PublicPositionParameterChange";
  value: PublicPositionParameterChangeAmino;
}
export interface PublicPositionParameterChangeSDKType {
  public_position_id: Long;
  min_bid_amount: string;
  fee_rate: string;
}