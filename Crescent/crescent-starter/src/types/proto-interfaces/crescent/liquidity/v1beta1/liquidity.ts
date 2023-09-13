import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { Long } from "../../../helpers";
/** PoolType enumerates pool types. */
export enum PoolType {
  /** POOL_TYPE_UNSPECIFIED - POOL_TYPE_UNSPECIFIED specifies unknown pool type */
  POOL_TYPE_UNSPECIFIED = 0,
  /** POOL_TYPE_BASIC - POOL_TYPE_BASIC specifies the basic pool type */
  POOL_TYPE_BASIC = 1,
  /** POOL_TYPE_RANGED - POOL_TYPE_RANGED specifies the ranged pool type */
  POOL_TYPE_RANGED = 2,
  UNRECOGNIZED = -1,
}
export const PoolTypeSDKType = PoolType;
export const PoolTypeAmino = PoolType;
export function poolTypeFromJSON(object: any): PoolType {
  switch (object) {
    case 0:
    case "POOL_TYPE_UNSPECIFIED":
      return PoolType.POOL_TYPE_UNSPECIFIED;
    case 1:
    case "POOL_TYPE_BASIC":
      return PoolType.POOL_TYPE_BASIC;
    case 2:
    case "POOL_TYPE_RANGED":
      return PoolType.POOL_TYPE_RANGED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PoolType.UNRECOGNIZED;
  }
}
export function poolTypeToJSON(object: PoolType): string {
  switch (object) {
    case PoolType.POOL_TYPE_UNSPECIFIED:
      return "POOL_TYPE_UNSPECIFIED";
    case PoolType.POOL_TYPE_BASIC:
      return "POOL_TYPE_BASIC";
    case PoolType.POOL_TYPE_RANGED:
      return "POOL_TYPE_RANGED";
    case PoolType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** OrderType enumerates order types. */
export enum OrderType {
  /** ORDER_TYPE_UNSPECIFIED - ORDER_TYPE_UNSPECIFIED specifies unknown order type. */
  ORDER_TYPE_UNSPECIFIED = 0,
  /** ORDER_TYPE_LIMIT - ORDER_TYPE_LIMIT specifies limit order type. */
  ORDER_TYPE_LIMIT = 1,
  /** ORDER_TYPE_MARKET - ORDER_TYPE_MARKET specifies market order type. */
  ORDER_TYPE_MARKET = 2,
  /** ORDER_TYPE_MM - ORDER_TYPE_MM specifies MM(market making) order type. */
  ORDER_TYPE_MM = 3,
  UNRECOGNIZED = -1,
}
export const OrderTypeSDKType = OrderType;
export const OrderTypeAmino = OrderType;
export function orderTypeFromJSON(object: any): OrderType {
  switch (object) {
    case 0:
    case "ORDER_TYPE_UNSPECIFIED":
      return OrderType.ORDER_TYPE_UNSPECIFIED;
    case 1:
    case "ORDER_TYPE_LIMIT":
      return OrderType.ORDER_TYPE_LIMIT;
    case 2:
    case "ORDER_TYPE_MARKET":
      return OrderType.ORDER_TYPE_MARKET;
    case 3:
    case "ORDER_TYPE_MM":
      return OrderType.ORDER_TYPE_MM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderType.UNRECOGNIZED;
  }
}
export function orderTypeToJSON(object: OrderType): string {
  switch (object) {
    case OrderType.ORDER_TYPE_UNSPECIFIED:
      return "ORDER_TYPE_UNSPECIFIED";
    case OrderType.ORDER_TYPE_LIMIT:
      return "ORDER_TYPE_LIMIT";
    case OrderType.ORDER_TYPE_MARKET:
      return "ORDER_TYPE_MARKET";
    case OrderType.ORDER_TYPE_MM:
      return "ORDER_TYPE_MM";
    case OrderType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** OrderDirection enumerates order directions. */
export enum OrderDirection {
  /** ORDER_DIRECTION_UNSPECIFIED - ORDER_DIRECTION_UNSPECIFIED specifies unknown order direction */
  ORDER_DIRECTION_UNSPECIFIED = 0,
  /** ORDER_DIRECTION_BUY - ORDER_DIRECTION_BUY specifies buy(swap quote coin to base coin) order direction */
  ORDER_DIRECTION_BUY = 1,
  /** ORDER_DIRECTION_SELL - ORDER_DIRECTION_SELL specifies sell(swap base coin to quote coin) order direction */
  ORDER_DIRECTION_SELL = 2,
  UNRECOGNIZED = -1,
}
export const OrderDirectionSDKType = OrderDirection;
export const OrderDirectionAmino = OrderDirection;
export function orderDirectionFromJSON(object: any): OrderDirection {
  switch (object) {
    case 0:
    case "ORDER_DIRECTION_UNSPECIFIED":
      return OrderDirection.ORDER_DIRECTION_UNSPECIFIED;
    case 1:
    case "ORDER_DIRECTION_BUY":
      return OrderDirection.ORDER_DIRECTION_BUY;
    case 2:
    case "ORDER_DIRECTION_SELL":
      return OrderDirection.ORDER_DIRECTION_SELL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderDirection.UNRECOGNIZED;
  }
}
export function orderDirectionToJSON(object: OrderDirection): string {
  switch (object) {
    case OrderDirection.ORDER_DIRECTION_UNSPECIFIED:
      return "ORDER_DIRECTION_UNSPECIFIED";
    case OrderDirection.ORDER_DIRECTION_BUY:
      return "ORDER_DIRECTION_BUY";
    case OrderDirection.ORDER_DIRECTION_SELL:
      return "ORDER_DIRECTION_SELL";
    case OrderDirection.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** RequestStatus enumerates request statuses. */
export enum RequestStatus {
  /** REQUEST_STATUS_UNSPECIFIED - REQUEST_STATUS_UNSPECIFIED specifies unknown request status */
  REQUEST_STATUS_UNSPECIFIED = 0,
  /** REQUEST_STATUS_NOT_EXECUTED - REQUEST_STATUS_NOT_EXECUTED indicates the request is not executed yet */
  REQUEST_STATUS_NOT_EXECUTED = 1,
  /** REQUEST_STATUS_SUCCEEDED - REQUEST_STATUS_SUCCEEDED indicates the request has been succeeded */
  REQUEST_STATUS_SUCCEEDED = 2,
  /** REQUEST_STATUS_FAILED - REQUEST_STATUS_FAILED indicates the request is failed */
  REQUEST_STATUS_FAILED = 3,
  UNRECOGNIZED = -1,
}
export const RequestStatusSDKType = RequestStatus;
export const RequestStatusAmino = RequestStatus;
export function requestStatusFromJSON(object: any): RequestStatus {
  switch (object) {
    case 0:
    case "REQUEST_STATUS_UNSPECIFIED":
      return RequestStatus.REQUEST_STATUS_UNSPECIFIED;
    case 1:
    case "REQUEST_STATUS_NOT_EXECUTED":
      return RequestStatus.REQUEST_STATUS_NOT_EXECUTED;
    case 2:
    case "REQUEST_STATUS_SUCCEEDED":
      return RequestStatus.REQUEST_STATUS_SUCCEEDED;
    case 3:
    case "REQUEST_STATUS_FAILED":
      return RequestStatus.REQUEST_STATUS_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RequestStatus.UNRECOGNIZED;
  }
}
export function requestStatusToJSON(object: RequestStatus): string {
  switch (object) {
    case RequestStatus.REQUEST_STATUS_UNSPECIFIED:
      return "REQUEST_STATUS_UNSPECIFIED";
    case RequestStatus.REQUEST_STATUS_NOT_EXECUTED:
      return "REQUEST_STATUS_NOT_EXECUTED";
    case RequestStatus.REQUEST_STATUS_SUCCEEDED:
      return "REQUEST_STATUS_SUCCEEDED";
    case RequestStatus.REQUEST_STATUS_FAILED:
      return "REQUEST_STATUS_FAILED";
    case RequestStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** OrderStatus enumerates order statuses. */
export enum OrderStatus {
  /** ORDER_STATUS_UNSPECIFIED - ORDER_STATUS_UNSPECIFIED specifies unknown order status */
  ORDER_STATUS_UNSPECIFIED = 0,
  /** ORDER_STATUS_NOT_EXECUTED - ORDER_STATUS_NOT_EXECUTED indicates the order has not been executed yet */
  ORDER_STATUS_NOT_EXECUTED = 1,
  /** ORDER_STATUS_NOT_MATCHED - ORDER_STATUS_NOT_MATCHED indicates the order has been executed but has no match */
  ORDER_STATUS_NOT_MATCHED = 2,
  /** ORDER_STATUS_PARTIALLY_MATCHED - ORDER_STATUS_PARTIALLY_MATCHED indicates the order has been partially matched */
  ORDER_STATUS_PARTIALLY_MATCHED = 3,
  /** ORDER_STATUS_COMPLETED - ORDER_STATUS_COMPLETED indicates the order has been fully matched and completed */
  ORDER_STATUS_COMPLETED = 4,
  /** ORDER_STATUS_CANCELED - ORDER_STATUS_CANCELED indicates the order has been canceled */
  ORDER_STATUS_CANCELED = 5,
  /** ORDER_STATUS_EXPIRED - ORDER_STATUS_EXPIRED indicates the order has been expired */
  ORDER_STATUS_EXPIRED = 6,
  UNRECOGNIZED = -1,
}
export const OrderStatusSDKType = OrderStatus;
export const OrderStatusAmino = OrderStatus;
export function orderStatusFromJSON(object: any): OrderStatus {
  switch (object) {
    case 0:
    case "ORDER_STATUS_UNSPECIFIED":
      return OrderStatus.ORDER_STATUS_UNSPECIFIED;
    case 1:
    case "ORDER_STATUS_NOT_EXECUTED":
      return OrderStatus.ORDER_STATUS_NOT_EXECUTED;
    case 2:
    case "ORDER_STATUS_NOT_MATCHED":
      return OrderStatus.ORDER_STATUS_NOT_MATCHED;
    case 3:
    case "ORDER_STATUS_PARTIALLY_MATCHED":
      return OrderStatus.ORDER_STATUS_PARTIALLY_MATCHED;
    case 4:
    case "ORDER_STATUS_COMPLETED":
      return OrderStatus.ORDER_STATUS_COMPLETED;
    case 5:
    case "ORDER_STATUS_CANCELED":
      return OrderStatus.ORDER_STATUS_CANCELED;
    case 6:
    case "ORDER_STATUS_EXPIRED":
      return OrderStatus.ORDER_STATUS_EXPIRED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderStatus.UNRECOGNIZED;
  }
}
export function orderStatusToJSON(object: OrderStatus): string {
  switch (object) {
    case OrderStatus.ORDER_STATUS_UNSPECIFIED:
      return "ORDER_STATUS_UNSPECIFIED";
    case OrderStatus.ORDER_STATUS_NOT_EXECUTED:
      return "ORDER_STATUS_NOT_EXECUTED";
    case OrderStatus.ORDER_STATUS_NOT_MATCHED:
      return "ORDER_STATUS_NOT_MATCHED";
    case OrderStatus.ORDER_STATUS_PARTIALLY_MATCHED:
      return "ORDER_STATUS_PARTIALLY_MATCHED";
    case OrderStatus.ORDER_STATUS_COMPLETED:
      return "ORDER_STATUS_COMPLETED";
    case OrderStatus.ORDER_STATUS_CANCELED:
      return "ORDER_STATUS_CANCELED";
    case OrderStatus.ORDER_STATUS_EXPIRED:
      return "ORDER_STATUS_EXPIRED";
    case OrderStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** Params defines the parameters for the liquidity module. */
export interface Params {
  batchSize: number;
  tickPrecision: number;
  feeCollectorAddress: string;
  dustCollectorAddress: string;
  minInitialPoolCoinSupply: string;
  pairCreationFee: Coin[];
  poolCreationFee: Coin[];
  minInitialDepositAmount: string;
  maxPriceLimitRatio: string;
  maxNumMarketMakingOrderTicks: number;
  maxNumMarketMakingOrdersPerPair: number;
  maxOrderLifespan: Duration;
  swapFeeRate: string;
  withdrawFeeRate: string;
  depositExtraGas: Long;
  withdrawExtraGas: Long;
  orderExtraGas: Long;
  maxNumActivePoolsPerPair: number;
}
export interface ParamsProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the liquidity module. */
export interface ParamsAmino {
  batch_size: number;
  tick_precision: number;
  fee_collector_address: string;
  dust_collector_address: string;
  min_initial_pool_coin_supply: string;
  pair_creation_fee: CoinAmino[];
  pool_creation_fee: CoinAmino[];
  min_initial_deposit_amount: string;
  max_price_limit_ratio: string;
  max_num_market_making_order_ticks: number;
  max_num_market_making_orders_per_pair: number;
  max_order_lifespan?: DurationAmino;
  swap_fee_rate: string;
  withdraw_fee_rate: string;
  deposit_extra_gas: string;
  withdraw_extra_gas: string;
  order_extra_gas: string;
  max_num_active_pools_per_pair: number;
}
export interface ParamsAminoMsg {
  type: "/crescent.liquidity.v1beta1.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the liquidity module. */
export interface ParamsSDKType {
  batch_size: number;
  tick_precision: number;
  fee_collector_address: string;
  dust_collector_address: string;
  min_initial_pool_coin_supply: string;
  pair_creation_fee: CoinSDKType[];
  pool_creation_fee: CoinSDKType[];
  min_initial_deposit_amount: string;
  max_price_limit_ratio: string;
  max_num_market_making_order_ticks: number;
  max_num_market_making_orders_per_pair: number;
  max_order_lifespan: DurationSDKType;
  swap_fee_rate: string;
  withdraw_fee_rate: string;
  deposit_extra_gas: Long;
  withdraw_extra_gas: Long;
  order_extra_gas: Long;
  max_num_active_pools_per_pair: number;
}
/** Pair defines a coin pair. */
export interface Pair {
  id: Long;
  baseCoinDenom: string;
  quoteCoinDenom: string;
  escrowAddress: string;
  lastOrderId: Long;
  lastPrice: string;
  currentBatchId: Long;
}
export interface PairProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.Pair";
  value: Uint8Array;
}
/** Pair defines a coin pair. */
export interface PairAmino {
  id: string;
  base_coin_denom: string;
  quote_coin_denom: string;
  escrow_address: string;
  last_order_id: string;
  last_price: string;
  current_batch_id: string;
}
export interface PairAminoMsg {
  type: "/crescent.liquidity.v1beta1.Pair";
  value: PairAmino;
}
/** Pair defines a coin pair. */
export interface PairSDKType {
  id: Long;
  base_coin_denom: string;
  quote_coin_denom: string;
  escrow_address: string;
  last_order_id: Long;
  last_price: string;
  current_batch_id: Long;
}
/**
 * Pool defines generic liquidity pool object which can be either a basic pool or a
 * ranged pool.
 */
export interface Pool {
  type: PoolType;
  id: Long;
  pairId: Long;
  creator: string;
  reserveAddress: string;
  poolCoinDenom: string;
  minPrice: string;
  maxPrice: string;
  lastDepositRequestId: Long;
  lastWithdrawRequestId: Long;
  disabled: boolean;
}
export interface PoolProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.Pool";
  value: Uint8Array;
}
/**
 * Pool defines generic liquidity pool object which can be either a basic pool or a
 * ranged pool.
 */
export interface PoolAmino {
  type: PoolType;
  id: string;
  pair_id: string;
  creator: string;
  reserve_address: string;
  pool_coin_denom: string;
  min_price: string;
  max_price: string;
  last_deposit_request_id: string;
  last_withdraw_request_id: string;
  disabled: boolean;
}
export interface PoolAminoMsg {
  type: "/crescent.liquidity.v1beta1.Pool";
  value: PoolAmino;
}
/**
 * Pool defines generic liquidity pool object which can be either a basic pool or a
 * ranged pool.
 */
export interface PoolSDKType {
  type: PoolType;
  id: Long;
  pair_id: Long;
  creator: string;
  reserve_address: string;
  pool_coin_denom: string;
  min_price: string;
  max_price: string;
  last_deposit_request_id: Long;
  last_withdraw_request_id: Long;
  disabled: boolean;
}
/** DepositRequest defines a deposit request. */
export interface DepositRequest {
  /** id specifies the id for the request */
  id: Long;
  /** pool_id specifies the pool id */
  poolId: Long;
  /** msg_height specifies the block height when the request is stored for the batch execution */
  msgHeight: Long;
  /** depositor specifies the bech32-encoded address that makes a deposit to the pool */
  depositor: string;
  /** deposit_coins specifies the amount of coins to deposit. */
  depositCoins: Coin[];
  /** accepted_coins specifies the amount of coins that are accepted. */
  acceptedCoins: Coin[];
  mintedPoolCoin: Coin;
  status: RequestStatus;
}
export interface DepositRequestProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.DepositRequest";
  value: Uint8Array;
}
/** DepositRequest defines a deposit request. */
export interface DepositRequestAmino {
  /** id specifies the id for the request */
  id: string;
  /** pool_id specifies the pool id */
  pool_id: string;
  /** msg_height specifies the block height when the request is stored for the batch execution */
  msg_height: string;
  /** depositor specifies the bech32-encoded address that makes a deposit to the pool */
  depositor: string;
  /** deposit_coins specifies the amount of coins to deposit. */
  deposit_coins: CoinAmino[];
  /** accepted_coins specifies the amount of coins that are accepted. */
  accepted_coins: CoinAmino[];
  minted_pool_coin?: CoinAmino;
  status: RequestStatus;
}
export interface DepositRequestAminoMsg {
  type: "/crescent.liquidity.v1beta1.DepositRequest";
  value: DepositRequestAmino;
}
/** DepositRequest defines a deposit request. */
export interface DepositRequestSDKType {
  id: Long;
  pool_id: Long;
  msg_height: Long;
  depositor: string;
  deposit_coins: CoinSDKType[];
  accepted_coins: CoinSDKType[];
  minted_pool_coin: CoinSDKType;
  status: RequestStatus;
}
/** WithdrawRequest defines a withdraw request. */
export interface WithdrawRequest {
  /** id specifies the id for the request */
  id: Long;
  /** pool_id specifies the pool id */
  poolId: Long;
  /** msg_height specifies the block height when the request is stored for the batch execution */
  msgHeight: Long;
  /** withdrawer specifies the bech32-encoded address that withdraws pool coin from the pool */
  withdrawer: string;
  /** pool_coin specifies the pool coin that is a proof of liquidity provider for the pool */
  poolCoin: Coin;
  /** withdrawn_coins specifies the amount of coins that are withdrawn. */
  withdrawnCoins: Coin[];
  status: RequestStatus;
}
export interface WithdrawRequestProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.WithdrawRequest";
  value: Uint8Array;
}
/** WithdrawRequest defines a withdraw request. */
export interface WithdrawRequestAmino {
  /** id specifies the id for the request */
  id: string;
  /** pool_id specifies the pool id */
  pool_id: string;
  /** msg_height specifies the block height when the request is stored for the batch execution */
  msg_height: string;
  /** withdrawer specifies the bech32-encoded address that withdraws pool coin from the pool */
  withdrawer: string;
  /** pool_coin specifies the pool coin that is a proof of liquidity provider for the pool */
  pool_coin?: CoinAmino;
  /** withdrawn_coins specifies the amount of coins that are withdrawn. */
  withdrawn_coins: CoinAmino[];
  status: RequestStatus;
}
export interface WithdrawRequestAminoMsg {
  type: "/crescent.liquidity.v1beta1.WithdrawRequest";
  value: WithdrawRequestAmino;
}
/** WithdrawRequest defines a withdraw request. */
export interface WithdrawRequestSDKType {
  id: Long;
  pool_id: Long;
  msg_height: Long;
  withdrawer: string;
  pool_coin: CoinSDKType;
  withdrawn_coins: CoinSDKType[];
  status: RequestStatus;
}
/** Order defines an order. */
export interface Order {
  /** type specifies the typo of the order */
  type: OrderType;
  /** id specifies the id of the order */
  id: Long;
  /** pair_id specifies the pair id */
  pairId: Long;
  /** msg_height specifies the block height when the order is stored for the batch execution */
  msgHeight: Long;
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** direction specifies the order direction; either buy or sell */
  direction: OrderDirection;
  offerCoin: Coin;
  /** remaining_offer_coin specifies the remaining offer coin */
  remainingOfferCoin: Coin;
  /** received_coin specifies the received coin after the swap */
  receivedCoin: Coin;
  /** price specifies the price that an orderer is willing to swap */
  price: string;
  amount: string;
  openAmount: string;
  /** batch_id specifies the pair's batch id when the request is stored */
  batchId: Long;
  expireAt: Date;
  status: OrderStatus;
}
export interface OrderProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.Order";
  value: Uint8Array;
}
/** Order defines an order. */
export interface OrderAmino {
  /** type specifies the typo of the order */
  type: OrderType;
  /** id specifies the id of the order */
  id: string;
  /** pair_id specifies the pair id */
  pair_id: string;
  /** msg_height specifies the block height when the order is stored for the batch execution */
  msg_height: string;
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** direction specifies the order direction; either buy or sell */
  direction: OrderDirection;
  offer_coin?: CoinAmino;
  /** remaining_offer_coin specifies the remaining offer coin */
  remaining_offer_coin?: CoinAmino;
  /** received_coin specifies the received coin after the swap */
  received_coin?: CoinAmino;
  /** price specifies the price that an orderer is willing to swap */
  price: string;
  amount: string;
  open_amount: string;
  /** batch_id specifies the pair's batch id when the request is stored */
  batch_id: string;
  expire_at?: Date;
  status: OrderStatus;
}
export interface OrderAminoMsg {
  type: "/crescent.liquidity.v1beta1.Order";
  value: OrderAmino;
}
/** Order defines an order. */
export interface OrderSDKType {
  type: OrderType;
  id: Long;
  pair_id: Long;
  msg_height: Long;
  orderer: string;
  direction: OrderDirection;
  offer_coin: CoinSDKType;
  remaining_offer_coin: CoinSDKType;
  received_coin: CoinSDKType;
  price: string;
  amount: string;
  open_amount: string;
  batch_id: Long;
  expire_at: Date;
  status: OrderStatus;
}