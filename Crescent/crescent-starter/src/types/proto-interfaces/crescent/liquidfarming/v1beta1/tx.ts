import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
/** MsgLiquidFarm defines a SDK message for farming pool coin for a liquid farm. */
export interface MsgLiquidFarm {
  poolId: Long;
  farmer: string;
  farmingCoin: Coin;
}
export interface MsgLiquidFarmProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgLiquidFarm";
  value: Uint8Array;
}
/** MsgLiquidFarm defines a SDK message for farming pool coin for a liquid farm. */
export interface MsgLiquidFarmAmino {
  pool_id: string;
  farmer: string;
  farming_coin?: CoinAmino;
}
export interface MsgLiquidFarmAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgLiquidFarm";
  value: MsgLiquidFarmAmino;
}
/** MsgLiquidFarm defines a SDK message for farming pool coin for a liquid farm. */
export interface MsgLiquidFarmSDKType {
  pool_id: Long;
  farmer: string;
  farming_coin: CoinSDKType;
}
/** MsgLiquidFarmResponse defines the MsgLiquidFarmResponse response type. */
export interface MsgLiquidFarmResponse {}
export interface MsgLiquidFarmResponseProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgLiquidFarmResponse";
  value: Uint8Array;
}
/** MsgLiquidFarmResponse defines the MsgLiquidFarmResponse response type. */
export interface MsgLiquidFarmResponseAmino {}
export interface MsgLiquidFarmResponseAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgLiquidFarmResponse";
  value: MsgLiquidFarmResponseAmino;
}
/** MsgLiquidFarmResponse defines the MsgLiquidFarmResponse response type. */
export interface MsgLiquidFarmResponseSDKType {}
/** MsgLiquidUnfarm defines a SDK message for unfarming LFCoin. */
export interface MsgLiquidUnfarm {
  poolId: Long;
  farmer: string;
  unfarmingCoin: Coin;
}
export interface MsgLiquidUnfarmProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgLiquidUnfarm";
  value: Uint8Array;
}
/** MsgLiquidUnfarm defines a SDK message for unfarming LFCoin. */
export interface MsgLiquidUnfarmAmino {
  pool_id: string;
  farmer: string;
  unfarming_coin?: CoinAmino;
}
export interface MsgLiquidUnfarmAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgLiquidUnfarm";
  value: MsgLiquidUnfarmAmino;
}
/** MsgLiquidUnfarm defines a SDK message for unfarming LFCoin. */
export interface MsgLiquidUnfarmSDKType {
  pool_id: Long;
  farmer: string;
  unfarming_coin: CoinSDKType;
}
/** MsgLiquidUnfarmResponse defines the MsgLiquidUnfarmResponse response type. */
export interface MsgLiquidUnfarmResponse {}
export interface MsgLiquidUnfarmResponseProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgLiquidUnfarmResponse";
  value: Uint8Array;
}
/** MsgLiquidUnfarmResponse defines the MsgLiquidUnfarmResponse response type. */
export interface MsgLiquidUnfarmResponseAmino {}
export interface MsgLiquidUnfarmResponseAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgLiquidUnfarmResponse";
  value: MsgLiquidUnfarmResponseAmino;
}
/** MsgLiquidUnfarmResponse defines the MsgLiquidUnfarmResponse response type. */
export interface MsgLiquidUnfarmResponseSDKType {}
/** MsgLiquidUnfarmAndWithdraw defines a SDK message for unfarming LFCoin. */
export interface MsgLiquidUnfarmAndWithdraw {
  poolId: Long;
  farmer: string;
  unfarmingCoin: Coin;
}
export interface MsgLiquidUnfarmAndWithdrawProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgLiquidUnfarmAndWithdraw";
  value: Uint8Array;
}
/** MsgLiquidUnfarmAndWithdraw defines a SDK message for unfarming LFCoin. */
export interface MsgLiquidUnfarmAndWithdrawAmino {
  pool_id: string;
  farmer: string;
  unfarming_coin?: CoinAmino;
}
export interface MsgLiquidUnfarmAndWithdrawAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgLiquidUnfarmAndWithdraw";
  value: MsgLiquidUnfarmAndWithdrawAmino;
}
/** MsgLiquidUnfarmAndWithdraw defines a SDK message for unfarming LFCoin. */
export interface MsgLiquidUnfarmAndWithdrawSDKType {
  pool_id: Long;
  farmer: string;
  unfarming_coin: CoinSDKType;
}
/** MsgLiquidUnfarmAndWithdrawResponse defines the MsgLiquidUnfarmAndWithdrawResponse response type. */
export interface MsgLiquidUnfarmAndWithdrawResponse {}
export interface MsgLiquidUnfarmAndWithdrawResponseProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgLiquidUnfarmAndWithdrawResponse";
  value: Uint8Array;
}
/** MsgLiquidUnfarmAndWithdrawResponse defines the MsgLiquidUnfarmAndWithdrawResponse response type. */
export interface MsgLiquidUnfarmAndWithdrawResponseAmino {}
export interface MsgLiquidUnfarmAndWithdrawResponseAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgLiquidUnfarmAndWithdrawResponse";
  value: MsgLiquidUnfarmAndWithdrawResponseAmino;
}
/** MsgLiquidUnfarmAndWithdrawResponse defines the MsgLiquidUnfarmAndWithdrawResponse response type. */
export interface MsgLiquidUnfarmAndWithdrawResponseSDKType {}
/** MsgPlaceBid defines a SDK message for placing a bid for a rewards auction. */
export interface MsgPlaceBid {
  auctionId: Long;
  poolId: Long;
  bidder: string;
  biddingCoin: Coin;
}
export interface MsgPlaceBidProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgPlaceBid";
  value: Uint8Array;
}
/** MsgPlaceBid defines a SDK message for placing a bid for a rewards auction. */
export interface MsgPlaceBidAmino {
  auction_id: string;
  pool_id: string;
  bidder: string;
  bidding_coin?: CoinAmino;
}
export interface MsgPlaceBidAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgPlaceBid";
  value: MsgPlaceBidAmino;
}
/** MsgPlaceBid defines a SDK message for placing a bid for a rewards auction. */
export interface MsgPlaceBidSDKType {
  auction_id: Long;
  pool_id: Long;
  bidder: string;
  bidding_coin: CoinSDKType;
}
/** MsgPlaceBidResponse defines the MsgPlaceBidResponse response type. */
export interface MsgPlaceBidResponse {}
export interface MsgPlaceBidResponseProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgPlaceBidResponse";
  value: Uint8Array;
}
/** MsgPlaceBidResponse defines the MsgPlaceBidResponse response type. */
export interface MsgPlaceBidResponseAmino {}
export interface MsgPlaceBidResponseAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgPlaceBidResponse";
  value: MsgPlaceBidResponseAmino;
}
/** MsgPlaceBidResponse defines the MsgPlaceBidResponse response type. */
export interface MsgPlaceBidResponseSDKType {}
/** MsgRefundBid defines a SDK message for refunding the bid that is not winning for the auction. */
export interface MsgRefundBid {
  auctionId: Long;
  poolId: Long;
  bidder: string;
}
export interface MsgRefundBidProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgRefundBid";
  value: Uint8Array;
}
/** MsgRefundBid defines a SDK message for refunding the bid that is not winning for the auction. */
export interface MsgRefundBidAmino {
  auction_id: string;
  pool_id: string;
  bidder: string;
}
export interface MsgRefundBidAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgRefundBid";
  value: MsgRefundBidAmino;
}
/** MsgRefundBid defines a SDK message for refunding the bid that is not winning for the auction. */
export interface MsgRefundBidSDKType {
  auction_id: Long;
  pool_id: Long;
  bidder: string;
}
/** MsgRefundBidResponse defines the MsgRefundBidResponse response type. */
export interface MsgRefundBidResponse {}
export interface MsgRefundBidResponseProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgRefundBidResponse";
  value: Uint8Array;
}
/** MsgRefundBidResponse defines the MsgRefundBidResponse response type. */
export interface MsgRefundBidResponseAmino {}
export interface MsgRefundBidResponseAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgRefundBidResponse";
  value: MsgRefundBidResponseAmino;
}
/** MsgRefundBidResponse defines the MsgRefundBidResponse response type. */
export interface MsgRefundBidResponseSDKType {}
/** MsgAdvanceAuction defines a message to advance rewards auction by one. */
export interface MsgAdvanceAuction {
  /** requester defines the bech32-encoded address of the requester */
  requester: string;
}
export interface MsgAdvanceAuctionProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgAdvanceAuction";
  value: Uint8Array;
}
/** MsgAdvanceAuction defines a message to advance rewards auction by one. */
export interface MsgAdvanceAuctionAmino {
  /** requester defines the bech32-encoded address of the requester */
  requester: string;
}
export interface MsgAdvanceAuctionAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgAdvanceAuction";
  value: MsgAdvanceAuctionAmino;
}
/** MsgAdvanceAuction defines a message to advance rewards auction by one. */
export interface MsgAdvanceAuctionSDKType {
  requester: string;
}
/** MsgAdvanceAuctionResponse defines the Msg/AdvanceAuction response type. */
export interface MsgAdvanceAuctionResponse {}
export interface MsgAdvanceAuctionResponseProtoMsg {
  typeUrl: "/crescent.liquidfarming.v1beta1.MsgAdvanceAuctionResponse";
  value: Uint8Array;
}
/** MsgAdvanceAuctionResponse defines the Msg/AdvanceAuction response type. */
export interface MsgAdvanceAuctionResponseAmino {}
export interface MsgAdvanceAuctionResponseAminoMsg {
  type: "/crescent.liquidfarming.v1beta1.MsgAdvanceAuctionResponse";
  value: MsgAdvanceAuctionResponseAmino;
}
/** MsgAdvanceAuctionResponse defines the Msg/AdvanceAuction response type. */
export interface MsgAdvanceAuctionResponseSDKType {}