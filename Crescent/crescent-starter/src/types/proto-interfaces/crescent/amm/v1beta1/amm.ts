import { DecCoin, DecCoinAmino, DecCoinSDKType, Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
export interface Pool {
  id: Long;
  marketId: Long;
  denom0: string;
  denom1: string;
  reserveAddress: string;
  rewardsPool: string;
  tickSpacing: number;
  minOrderQuantity: string;
  minOrderQuote: string;
}
export interface PoolProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.Pool";
  value: Uint8Array;
}
export interface PoolAmino {
  id: string;
  market_id: string;
  denom0: string;
  denom1: string;
  reserve_address: string;
  rewards_pool: string;
  tick_spacing: number;
  min_order_quantity: string;
  min_order_quote: string;
}
export interface PoolAminoMsg {
  type: "/crescent.amm.v1beta1.Pool";
  value: PoolAmino;
}
export interface PoolSDKType {
  id: Long;
  market_id: Long;
  denom0: string;
  denom1: string;
  reserve_address: string;
  rewards_pool: string;
  tick_spacing: number;
  min_order_quantity: string;
  min_order_quote: string;
}
export interface PoolState {
  currentTick: number;
  currentPrice: string;
  currentLiquidity: string;
  totalLiquidity: string;
  feeGrowthGlobal: DecCoin[];
  farmingRewardsGrowthGlobal: DecCoin[];
}
export interface PoolStateProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.PoolState";
  value: Uint8Array;
}
export interface PoolStateAmino {
  current_tick: number;
  current_price: string;
  current_liquidity: string;
  total_liquidity: string;
  fee_growth_global: DecCoinAmino[];
  farming_rewards_growth_global: DecCoinAmino[];
}
export interface PoolStateAminoMsg {
  type: "/crescent.amm.v1beta1.PoolState";
  value: PoolStateAmino;
}
export interface PoolStateSDKType {
  current_tick: number;
  current_price: string;
  current_liquidity: string;
  total_liquidity: string;
  fee_growth_global: DecCoinSDKType[];
  farming_rewards_growth_global: DecCoinSDKType[];
}
export interface Position {
  id: Long;
  poolId: Long;
  owner: string;
  lowerTick: number;
  upperTick: number;
  liquidity: string;
  lastFeeGrowthInside: DecCoin[];
  owedFee: Coin[];
  lastFarmingRewardsGrowthInside: DecCoin[];
  owedFarmingRewards: Coin[];
}
export interface PositionProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.Position";
  value: Uint8Array;
}
export interface PositionAmino {
  id: string;
  pool_id: string;
  owner: string;
  lower_tick: number;
  upper_tick: number;
  liquidity: string;
  last_fee_growth_inside: DecCoinAmino[];
  owed_fee: CoinAmino[];
  last_farming_rewards_growth_inside: DecCoinAmino[];
  owed_farming_rewards: CoinAmino[];
}
export interface PositionAminoMsg {
  type: "/crescent.amm.v1beta1.Position";
  value: PositionAmino;
}
export interface PositionSDKType {
  id: Long;
  pool_id: Long;
  owner: string;
  lower_tick: number;
  upper_tick: number;
  liquidity: string;
  last_fee_growth_inside: DecCoinSDKType[];
  owed_fee: CoinSDKType[];
  last_farming_rewards_growth_inside: DecCoinSDKType[];
  owed_farming_rewards: CoinSDKType[];
}
export interface TickInfo {
  grossLiquidity: string;
  netLiquidity: string;
  feeGrowthOutside: DecCoin[];
  farmingRewardsGrowthOutside: DecCoin[];
}
export interface TickInfoProtoMsg {
  typeUrl: "/crescent.amm.v1beta1.TickInfo";
  value: Uint8Array;
}
export interface TickInfoAmino {
  gross_liquidity: string;
  net_liquidity: string;
  fee_growth_outside: DecCoinAmino[];
  farming_rewards_growth_outside: DecCoinAmino[];
}
export interface TickInfoAminoMsg {
  type: "/crescent.amm.v1beta1.TickInfo";
  value: TickInfoAmino;
}
export interface TickInfoSDKType {
  gross_liquidity: string;
  net_liquidity: string;
  fee_growth_outside: DecCoinSDKType[];
  farming_rewards_growth_outside: DecCoinSDKType[];
}