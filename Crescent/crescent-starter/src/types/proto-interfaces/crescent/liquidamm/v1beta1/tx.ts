import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
/** MsgMintShare defines a SDK message for minting share of public position. */
export interface MsgMintShare {
  sender: string;
  publicPositionId: Long;
  desiredAmount: Coin[];
}
export interface MsgMintShareProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.MsgMintShare";
  value: Uint8Array;
}
/** MsgMintShare defines a SDK message for minting share of public position. */
export interface MsgMintShareAmino {
  sender: string;
  public_position_id: string;
  desired_amount: CoinAmino[];
}
export interface MsgMintShareAminoMsg {
  type: "/crescent.liquidamm.v1beta1.MsgMintShare";
  value: MsgMintShareAmino;
}
/** MsgMintShare defines a SDK message for minting share of public position. */
export interface MsgMintShareSDKType {
  sender: string;
  public_position_id: Long;
  desired_amount: CoinSDKType[];
}
export interface MsgMintShareResponse {
  mintedShare: Coin;
  liquidity: string;
  amount: Coin[];
}
export interface MsgMintShareResponseProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.MsgMintShareResponse";
  value: Uint8Array;
}
export interface MsgMintShareResponseAmino {
  minted_share?: CoinAmino;
  liquidity: string;
  amount: CoinAmino[];
}
export interface MsgMintShareResponseAminoMsg {
  type: "/crescent.liquidamm.v1beta1.MsgMintShareResponse";
  value: MsgMintShareResponseAmino;
}
export interface MsgMintShareResponseSDKType {
  minted_share: CoinSDKType;
  liquidity: string;
  amount: CoinSDKType[];
}
/** MsgBurnShare defines a SDK message for burning share of public position. */
export interface MsgBurnShare {
  sender: string;
  publicPositionId: Long;
  share: Coin;
}
export interface MsgBurnShareProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.MsgBurnShare";
  value: Uint8Array;
}
/** MsgBurnShare defines a SDK message for burning share of public position. */
export interface MsgBurnShareAmino {
  sender: string;
  public_position_id: string;
  share?: CoinAmino;
}
export interface MsgBurnShareAminoMsg {
  type: "/crescent.liquidamm.v1beta1.MsgBurnShare";
  value: MsgBurnShareAmino;
}
/** MsgBurnShare defines a SDK message for burning share of public position. */
export interface MsgBurnShareSDKType {
  sender: string;
  public_position_id: Long;
  share: CoinSDKType;
}
export interface MsgBurnShareResponse {
  removedLiquidity: string;
  amount: Coin[];
}
export interface MsgBurnShareResponseProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.MsgBurnShareResponse";
  value: Uint8Array;
}
export interface MsgBurnShareResponseAmino {
  removed_liquidity: string;
  amount: CoinAmino[];
}
export interface MsgBurnShareResponseAminoMsg {
  type: "/crescent.liquidamm.v1beta1.MsgBurnShareResponse";
  value: MsgBurnShareResponseAmino;
}
export interface MsgBurnShareResponseSDKType {
  removed_liquidity: string;
  amount: CoinSDKType[];
}
/** MsgPlaceBid defines a SDK message for placing a bid for a rewards auction. */
export interface MsgPlaceBid {
  sender: string;
  publicPositionId: Long;
  rewardsAuctionId: Long;
  share: Coin;
}
export interface MsgPlaceBidProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.MsgPlaceBid";
  value: Uint8Array;
}
/** MsgPlaceBid defines a SDK message for placing a bid for a rewards auction. */
export interface MsgPlaceBidAmino {
  sender: string;
  public_position_id: string;
  rewards_auction_id: string;
  share?: CoinAmino;
}
export interface MsgPlaceBidAminoMsg {
  type: "/crescent.liquidamm.v1beta1.MsgPlaceBid";
  value: MsgPlaceBidAmino;
}
/** MsgPlaceBid defines a SDK message for placing a bid for a rewards auction. */
export interface MsgPlaceBidSDKType {
  sender: string;
  public_position_id: Long;
  rewards_auction_id: Long;
  share: CoinSDKType;
}
export interface MsgPlaceBidResponse {}
export interface MsgPlaceBidResponseProtoMsg {
  typeUrl: "/crescent.liquidamm.v1beta1.MsgPlaceBidResponse";
  value: Uint8Array;
}
export interface MsgPlaceBidResponseAmino {}
export interface MsgPlaceBidResponseAminoMsg {
  type: "/crescent.liquidamm.v1beta1.MsgPlaceBidResponse";
  value: MsgPlaceBidResponseAmino;
}
export interface MsgPlaceBidResponseSDKType {}