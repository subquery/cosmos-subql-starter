import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
export interface EventPublicPositionCreated {
  publicPositionId: Long;
  poolId: Long;
  lowerTick: number;
  upperTick: number;
  minBidAmount: string;
  feeRate: string;
}
export interface EventPublicPositionCreatedProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.EventPublicPositionCreated";
  value: Uint8Array;
}
export interface EventPublicPositionCreatedAmino {
  public_position_id: string;
  pool_id: string;
  lower_tick: number;
  upper_tick: number;
  min_bid_amount: string;
  fee_rate: string;
}
export interface EventPublicPositionCreatedAminoMsg {
  type: "/crescent.liquidamm.v1beta1.EventPublicPositionCreated";
  value: EventPublicPositionCreatedAmino;
}
export interface EventPublicPositionCreatedSDKType {
  public_position_id: Long;
  pool_id: Long;
  lower_tick: number;
  upper_tick: number;
  min_bid_amount: string;
  fee_rate: string;
}
export interface EventMintShare {
  minter: string;
  publicPositionId: Long;
  mintedShare: Coin;
  liquidity: string;
  amount: Coin[];
}
export interface EventMintShareProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.EventMintShare";
  value: Uint8Array;
}
export interface EventMintShareAmino {
  minter: string;
  public_position_id: string;
  minted_share?: CoinAmino;
  liquidity: string;
  amount: CoinAmino[];
}
export interface EventMintShareAminoMsg {
  type: "/crescent.liquidamm.v1beta1.EventMintShare";
  value: EventMintShareAmino;
}
export interface EventMintShareSDKType {
  minter: string;
  public_position_id: Long;
  minted_share: CoinSDKType;
  liquidity: string;
  amount: CoinSDKType[];
}
export interface EventBurnShare {
  burner: string;
  publicPositionId: Long;
  share: Coin;
  removedLiquidity: string;
  amount: Coin[];
}
export interface EventBurnShareProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.EventBurnShare";
  value: Uint8Array;
}
export interface EventBurnShareAmino {
  burner: string;
  public_position_id: string;
  share?: CoinAmino;
  removed_liquidity: string;
  amount: CoinAmino[];
}
export interface EventBurnShareAminoMsg {
  type: "/crescent.liquidamm.v1beta1.EventBurnShare";
  value: EventBurnShareAmino;
}
export interface EventBurnShareSDKType {
  burner: string;
  public_position_id: Long;
  share: CoinSDKType;
  removed_liquidity: string;
  amount: CoinSDKType[];
}
export interface EventPlaceBid {
  bidder: string;
  publicPositionId: Long;
  rewardsAuctionId: Long;
  share: Coin;
}
export interface EventPlaceBidProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.EventPlaceBid";
  value: Uint8Array;
}
export interface EventPlaceBidAmino {
  bidder: string;
  public_position_id: string;
  rewards_auction_id: string;
  share?: CoinAmino;
}
export interface EventPlaceBidAminoMsg {
  type: "/crescent.liquidamm.v1beta1.EventPlaceBid";
  value: EventPlaceBidAmino;
}
export interface EventPlaceBidSDKType {
  bidder: string;
  public_position_id: Long;
  rewards_auction_id: Long;
  share: CoinSDKType;
}
export interface EventBidRefunded {
  bidder: string;
  publicPositionId: Long;
  rewardsAuctionId: Long;
  share: Coin;
}
export interface EventBidRefundedProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.EventBidRefunded";
  value: Uint8Array;
}
export interface EventBidRefundedAmino {
  bidder: string;
  public_position_id: string;
  rewards_auction_id: string;
  share?: CoinAmino;
}
export interface EventBidRefundedAminoMsg {
  type: "/crescent.liquidamm.v1beta1.EventBidRefunded";
  value: EventBidRefundedAmino;
}
export interface EventBidRefundedSDKType {
  bidder: string;
  public_position_id: Long;
  rewards_auction_id: Long;
  share: CoinSDKType;
}
export interface EventPublicPositionParameterChanged {
  publicPositionId: Long;
  minBidAmount: string;
  feeRate: string;
}
export interface EventPublicPositionParameterChangedProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.EventPublicPositionParameterChanged";
  value: Uint8Array;
}
export interface EventPublicPositionParameterChangedAmino {
  public_position_id: string;
  min_bid_amount: string;
  fee_rate: string;
}
export interface EventPublicPositionParameterChangedAminoMsg {
  type: "/crescent.liquidamm.v1beta1.EventPublicPositionParameterChanged";
  value: EventPublicPositionParameterChangedAmino;
}
export interface EventPublicPositionParameterChangedSDKType {
  public_position_id: Long;
  min_bid_amount: string;
  fee_rate: string;
}