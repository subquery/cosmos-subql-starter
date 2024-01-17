import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
export interface MarketMakerProposal {
  /** title specifies the title of the proposal */
  title: string;
  /** description specifies the description of the proposal */
  description: string;
  /** set the market makers to eligible, refund deposit */
  inclusions: MarketMakerHandle[];
  /** delete existing eligible market makers */
  exclusions: MarketMakerHandle[];
  /** delete the not eligible market makers, refund deposit */
  rejections: MarketMakerHandle[];
  /** distribute claimable incentive to eligible market makers */
  distributions: IncentiveDistribution[];
}
export interface MarketMakerProposalProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.MarketMakerProposal";
  value: Uint8Array;
}
export interface MarketMakerProposalAmino {
  /** title specifies the title of the proposal */
  title: string;
  /** description specifies the description of the proposal */
  description: string;
  /** set the market makers to eligible, refund deposit */
  inclusions: MarketMakerHandleAmino[];
  /** delete existing eligible market makers */
  exclusions: MarketMakerHandleAmino[];
  /** delete the not eligible market makers, refund deposit */
  rejections: MarketMakerHandleAmino[];
  /** distribute claimable incentive to eligible market makers */
  distributions: IncentiveDistributionAmino[];
}
export interface MarketMakerProposalAminoMsg {
  type: "/crescent.marketmaker.v1beta1.MarketMakerProposal";
  value: MarketMakerProposalAmino;
}
export interface MarketMakerProposalSDKType {
  title: string;
  description: string;
  inclusions: MarketMakerHandleSDKType[];
  exclusions: MarketMakerHandleSDKType[];
  rejections: MarketMakerHandleSDKType[];
  distributions: IncentiveDistributionSDKType[];
}
export interface MarketMakerHandle {
  address: string;
  pairId: Long;
}
export interface MarketMakerHandleProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.MarketMakerHandle";
  value: Uint8Array;
}
export interface MarketMakerHandleAmino {
  address: string;
  pair_id: string;
}
export interface MarketMakerHandleAminoMsg {
  type: "/crescent.marketmaker.v1beta1.MarketMakerHandle";
  value: MarketMakerHandleAmino;
}
export interface MarketMakerHandleSDKType {
  address: string;
  pair_id: Long;
}
export interface IncentiveDistribution {
  address: string;
  pairId: Long;
  amount: Coin[];
}
export interface IncentiveDistributionProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.IncentiveDistribution";
  value: Uint8Array;
}
export interface IncentiveDistributionAmino {
  address: string;
  pair_id: string;
  amount: CoinAmino[];
}
export interface IncentiveDistributionAminoMsg {
  type: "/crescent.marketmaker.v1beta1.IncentiveDistribution";
  value: IncentiveDistributionAmino;
}
export interface IncentiveDistributionSDKType {
  address: string;
  pair_id: Long;
  amount: CoinSDKType[];
}