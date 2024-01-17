import { Long } from "../../../helpers";
export interface MarketParameterChangeProposal {
  title: string;
  description: string;
  changes: MarketParameterChange[];
}
export interface MarketParameterChangeProposalProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MarketParameterChangeProposal";
  value: Uint8Array;
}
export interface MarketParameterChangeProposalAmino {
  title: string;
  description: string;
  changes: MarketParameterChangeAmino[];
}
export interface MarketParameterChangeProposalAminoMsg {
  type: "/crescent.exchange.v1beta1.MarketParameterChangeProposal";
  value: MarketParameterChangeProposalAmino;
}
export interface MarketParameterChangeProposalSDKType {
  title: string;
  description: string;
  changes: MarketParameterChangeSDKType[];
}
export interface MarketParameterChange {
  marketId: Long;
  makerFeeRate: string;
  takerFeeRate: string;
  orderSourceFeeRatio: string;
}
export interface MarketParameterChangeProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.MarketParameterChange";
  value: Uint8Array;
}
export interface MarketParameterChangeAmino {
  market_id: string;
  maker_fee_rate: string;
  taker_fee_rate: string;
  order_source_fee_ratio: string;
}
export interface MarketParameterChangeAminoMsg {
  type: "/crescent.exchange.v1beta1.MarketParameterChange";
  value: MarketParameterChangeAmino;
}
export interface MarketParameterChangeSDKType {
  market_id: Long;
  maker_fee_rate: string;
  taker_fee_rate: string;
  order_source_fee_ratio: string;
}