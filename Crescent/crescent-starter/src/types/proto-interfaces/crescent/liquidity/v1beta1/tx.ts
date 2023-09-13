import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { OrderDirection } from "./liquidity";
import { Duration, DurationAmino, DurationSDKType } from "../../../google/protobuf/duration";
import { Long } from "../../../helpers";
/** MsgCreatePair defines an SDK message for creating a pair. */
export interface MsgCreatePair {
  /** creator specifies the bech32-encoded address that is the pair creator. */
  creator: string;
  /** base_coin_denom specifies the base coin denom of the pair. */
  baseCoinDenom: string;
  /** quote_coin_denom specifies the quote coin denom of the pair. */
  quoteCoinDenom: string;
}
export interface MsgCreatePairProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgCreatePair";
  value: Uint8Array;
}
/** MsgCreatePair defines an SDK message for creating a pair. */
export interface MsgCreatePairAmino {
  /** creator specifies the bech32-encoded address that is the pair creator. */
  creator: string;
  /** base_coin_denom specifies the base coin denom of the pair. */
  base_coin_denom: string;
  /** quote_coin_denom specifies the quote coin denom of the pair. */
  quote_coin_denom: string;
}
export interface MsgCreatePairAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgCreatePair";
  value: MsgCreatePairAmino;
}
/** MsgCreatePair defines an SDK message for creating a pair. */
export interface MsgCreatePairSDKType {
  creator: string;
  base_coin_denom: string;
  quote_coin_denom: string;
}
export interface MsgCreatePairResponse {}
export interface MsgCreatePairResponseProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgCreatePairResponse";
  value: Uint8Array;
}
export interface MsgCreatePairResponseAmino {}
export interface MsgCreatePairResponseAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgCreatePairResponse";
  value: MsgCreatePairResponseAmino;
}
export interface MsgCreatePairResponseSDKType {}
/** MsgCreatePool defines an SDK message for creating a pool. */
export interface MsgCreatePool {
  /** creator specifies the bech32-encoded address that is the pool creator */
  creator: string;
  /** pair_id specifies the pair id. */
  pairId: Long;
  /** deposit_coins specifies the amount of coins to deposit. */
  depositCoins: Coin[];
}
export interface MsgCreatePoolProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgCreatePool";
  value: Uint8Array;
}
/** MsgCreatePool defines an SDK message for creating a pool. */
export interface MsgCreatePoolAmino {
  /** creator specifies the bech32-encoded address that is the pool creator */
  creator: string;
  /** pair_id specifies the pair id. */
  pair_id: string;
  /** deposit_coins specifies the amount of coins to deposit. */
  deposit_coins: CoinAmino[];
}
export interface MsgCreatePoolAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgCreatePool";
  value: MsgCreatePoolAmino;
}
/** MsgCreatePool defines an SDK message for creating a pool. */
export interface MsgCreatePoolSDKType {
  creator: string;
  pair_id: Long;
  deposit_coins: CoinSDKType[];
}
/** MsgCreatePoolResponse defines the Msg/CreatePool response type. */
export interface MsgCreatePoolResponse {}
export interface MsgCreatePoolResponseProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgCreatePoolResponse";
  value: Uint8Array;
}
/** MsgCreatePoolResponse defines the Msg/CreatePool response type. */
export interface MsgCreatePoolResponseAmino {}
export interface MsgCreatePoolResponseAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgCreatePoolResponse";
  value: MsgCreatePoolResponseAmino;
}
/** MsgCreatePoolResponse defines the Msg/CreatePool response type. */
export interface MsgCreatePoolResponseSDKType {}
/** MsgCreateRangedPool defines an SDK message for creating a ranged pool. */
export interface MsgCreateRangedPool {
  /** creator specifies the bech32-encoded address that is the pool creator */
  creator: string;
  /** pair_id specifies the pair id. */
  pairId: Long;
  /** deposit_coins specifies the amount of coins to deposit. */
  depositCoins: Coin[];
  minPrice: string;
  maxPrice: string;
  initialPrice: string;
}
export interface MsgCreateRangedPoolProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgCreateRangedPool";
  value: Uint8Array;
}
/** MsgCreateRangedPool defines an SDK message for creating a ranged pool. */
export interface MsgCreateRangedPoolAmino {
  /** creator specifies the bech32-encoded address that is the pool creator */
  creator: string;
  /** pair_id specifies the pair id. */
  pair_id: string;
  /** deposit_coins specifies the amount of coins to deposit. */
  deposit_coins: CoinAmino[];
  min_price: string;
  max_price: string;
  initial_price: string;
}
export interface MsgCreateRangedPoolAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgCreateRangedPool";
  value: MsgCreateRangedPoolAmino;
}
/** MsgCreateRangedPool defines an SDK message for creating a ranged pool. */
export interface MsgCreateRangedPoolSDKType {
  creator: string;
  pair_id: Long;
  deposit_coins: CoinSDKType[];
  min_price: string;
  max_price: string;
  initial_price: string;
}
/** MsgCreateRangedPoolResponse defines the Msg/CreateRangedPool response type. */
export interface MsgCreateRangedPoolResponse {}
export interface MsgCreateRangedPoolResponseProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgCreateRangedPoolResponse";
  value: Uint8Array;
}
/** MsgCreateRangedPoolResponse defines the Msg/CreateRangedPool response type. */
export interface MsgCreateRangedPoolResponseAmino {}
export interface MsgCreateRangedPoolResponseAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgCreateRangedPoolResponse";
  value: MsgCreateRangedPoolResponseAmino;
}
/** MsgCreateRangedPoolResponse defines the Msg/CreateRangedPool response type. */
export interface MsgCreateRangedPoolResponseSDKType {}
/** MsgDeposit defines an SDK message for depositing coins to the pool */
export interface MsgDeposit {
  /** depositor specifies the bech32-encoded address that makes a deposit to the pool */
  depositor: string;
  /** pool_id specifies the pool id */
  poolId: Long;
  /** deposit_coins specifies the amount of coins to deposit. */
  depositCoins: Coin[];
}
export interface MsgDepositProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgDeposit";
  value: Uint8Array;
}
/** MsgDeposit defines an SDK message for depositing coins to the pool */
export interface MsgDepositAmino {
  /** depositor specifies the bech32-encoded address that makes a deposit to the pool */
  depositor: string;
  /** pool_id specifies the pool id */
  pool_id: string;
  /** deposit_coins specifies the amount of coins to deposit. */
  deposit_coins: CoinAmino[];
}
export interface MsgDepositAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgDeposit";
  value: MsgDepositAmino;
}
/** MsgDeposit defines an SDK message for depositing coins to the pool */
export interface MsgDepositSDKType {
  depositor: string;
  pool_id: Long;
  deposit_coins: CoinSDKType[];
}
/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponse {}
export interface MsgDepositResponseProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgDepositResponse";
  value: Uint8Array;
}
/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponseAmino {}
export interface MsgDepositResponseAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgDepositResponse";
  value: MsgDepositResponseAmino;
}
/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponseSDKType {}
/** MsgWithdraw defines an SDK message for withdrawing pool coin from the pool */
export interface MsgWithdraw {
  /** withdrawer specifies the bech32-encoded address that withdraws pool coin from the pool */
  withdrawer: string;
  /** pool_id specifies the pool id */
  poolId: Long;
  /** pool_coin specifies the pool coin that is a proof of liquidity provider for the pool */
  poolCoin: Coin;
}
export interface MsgWithdrawProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgWithdraw";
  value: Uint8Array;
}
/** MsgWithdraw defines an SDK message for withdrawing pool coin from the pool */
export interface MsgWithdrawAmino {
  /** withdrawer specifies the bech32-encoded address that withdraws pool coin from the pool */
  withdrawer: string;
  /** pool_id specifies the pool id */
  pool_id: string;
  /** pool_coin specifies the pool coin that is a proof of liquidity provider for the pool */
  pool_coin?: CoinAmino;
}
export interface MsgWithdrawAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgWithdraw";
  value: MsgWithdrawAmino;
}
/** MsgWithdraw defines an SDK message for withdrawing pool coin from the pool */
export interface MsgWithdrawSDKType {
  withdrawer: string;
  pool_id: Long;
  pool_coin: CoinSDKType;
}
/** MsgWithdrawResponse defines the Msg/Withdraw response type. */
export interface MsgWithdrawResponse {}
export interface MsgWithdrawResponseProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgWithdrawResponse";
  value: Uint8Array;
}
/** MsgWithdrawResponse defines the Msg/Withdraw response type. */
export interface MsgWithdrawResponseAmino {}
export interface MsgWithdrawResponseAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgWithdrawResponse";
  value: MsgWithdrawResponseAmino;
}
/** MsgWithdrawResponse defines the Msg/Withdraw response type. */
export interface MsgWithdrawResponseSDKType {}
/** MsgLimitOrder defines an SDK message for making a limit order */
export interface MsgLimitOrder {
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** pair_id specifies the pair id */
  pairId: Long;
  /** direction specifies the order direction(buy or sell) */
  direction: OrderDirection;
  /** offer_coin specifies the amount of coin the orderer offers */
  offerCoin: Coin;
  /** demand_coin_denom specifies the demand coin denom */
  demandCoinDenom: string;
  /** price specifies the order price */
  price: string;
  /** amount specifies the amount of base coin the orderer wants to buy or sell */
  amount: string;
  /** order_lifespan specifies the order lifespan */
  orderLifespan: Duration;
}
export interface MsgLimitOrderProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgLimitOrder";
  value: Uint8Array;
}
/** MsgLimitOrder defines an SDK message for making a limit order */
export interface MsgLimitOrderAmino {
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** pair_id specifies the pair id */
  pair_id: string;
  /** direction specifies the order direction(buy or sell) */
  direction: OrderDirection;
  /** offer_coin specifies the amount of coin the orderer offers */
  offer_coin?: CoinAmino;
  /** demand_coin_denom specifies the demand coin denom */
  demand_coin_denom: string;
  /** price specifies the order price */
  price: string;
  /** amount specifies the amount of base coin the orderer wants to buy or sell */
  amount: string;
  /** order_lifespan specifies the order lifespan */
  order_lifespan?: DurationAmino;
}
export interface MsgLimitOrderAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgLimitOrder";
  value: MsgLimitOrderAmino;
}
/** MsgLimitOrder defines an SDK message for making a limit order */
export interface MsgLimitOrderSDKType {
  orderer: string;
  pair_id: Long;
  direction: OrderDirection;
  offer_coin: CoinSDKType;
  demand_coin_denom: string;
  price: string;
  amount: string;
  order_lifespan: DurationSDKType;
}
/** MsgLimitOrderResponse defines the Msg/LimitOrder response type. */
export interface MsgLimitOrderResponse {}
export interface MsgLimitOrderResponseProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgLimitOrderResponse";
  value: Uint8Array;
}
/** MsgLimitOrderResponse defines the Msg/LimitOrder response type. */
export interface MsgLimitOrderResponseAmino {}
export interface MsgLimitOrderResponseAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgLimitOrderResponse";
  value: MsgLimitOrderResponseAmino;
}
/** MsgLimitOrderResponse defines the Msg/LimitOrder response type. */
export interface MsgLimitOrderResponseSDKType {}
/** MsgMarketOrder defines an SDK message for making a market order */
export interface MsgMarketOrder {
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** pair_id specifies the pair id */
  pairId: Long;
  /** direction specifies the order direction(buy or sell) */
  direction: OrderDirection;
  /** offer_coin specifies the amount of coin the orderer offers */
  offerCoin: Coin;
  /** demand_coin_denom specifies the demand coin denom */
  demandCoinDenom: string;
  /** amount specifies the amount of base coin the orderer wants to buy or sell */
  amount: string;
  /** order_lifespan specifies the order lifespan */
  orderLifespan: Duration;
}
export interface MsgMarketOrderProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgMarketOrder";
  value: Uint8Array;
}
/** MsgMarketOrder defines an SDK message for making a market order */
export interface MsgMarketOrderAmino {
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** pair_id specifies the pair id */
  pair_id: string;
  /** direction specifies the order direction(buy or sell) */
  direction: OrderDirection;
  /** offer_coin specifies the amount of coin the orderer offers */
  offer_coin?: CoinAmino;
  /** demand_coin_denom specifies the demand coin denom */
  demand_coin_denom: string;
  /** amount specifies the amount of base coin the orderer wants to buy or sell */
  amount: string;
  /** order_lifespan specifies the order lifespan */
  order_lifespan?: DurationAmino;
}
export interface MsgMarketOrderAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgMarketOrder";
  value: MsgMarketOrderAmino;
}
/** MsgMarketOrder defines an SDK message for making a market order */
export interface MsgMarketOrderSDKType {
  orderer: string;
  pair_id: Long;
  direction: OrderDirection;
  offer_coin: CoinSDKType;
  demand_coin_denom: string;
  amount: string;
  order_lifespan: DurationSDKType;
}
/** MsgMarketOrderResponse defines the Msg/MarketOrder response type. */
export interface MsgMarketOrderResponse {}
export interface MsgMarketOrderResponseProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgMarketOrderResponse";
  value: Uint8Array;
}
/** MsgMarketOrderResponse defines the Msg/MarketOrder response type. */
export interface MsgMarketOrderResponseAmino {}
export interface MsgMarketOrderResponseAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgMarketOrderResponse";
  value: MsgMarketOrderResponseAmino;
}
/** MsgMarketOrderResponse defines the Msg/MarketOrder response type. */
export interface MsgMarketOrderResponseSDKType {}
/** MsgMMOrder defines an SDK message for making a MM(market making) order. */
export interface MsgMMOrder {
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** pair_id specifies the pair id */
  pairId: Long;
  /** direction specifies the order direction(buy or sell) */
  direction: OrderDirection;
  /** offer_coin specifies the amount of coin the orderer offers */
  offerCoin: Coin;
  /** demand_coin_denom specifies the demand coin denom */
  demandCoinDenom: string;
  /** price specifies the order price */
  price: string;
  /** amount specifies the amount of base coin the orderer wants to buy or sell */
  amount: string;
  /** order_lifespan specifies the order lifespan */
  orderLifespan: Duration;
}
export interface MsgMMOrderProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgMMOrder";
  value: Uint8Array;
}
/** MsgMMOrder defines an SDK message for making a MM(market making) order. */
export interface MsgMMOrderAmino {
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** pair_id specifies the pair id */
  pair_id: string;
  /** direction specifies the order direction(buy or sell) */
  direction: OrderDirection;
  /** offer_coin specifies the amount of coin the orderer offers */
  offer_coin?: CoinAmino;
  /** demand_coin_denom specifies the demand coin denom */
  demand_coin_denom: string;
  /** price specifies the order price */
  price: string;
  /** amount specifies the amount of base coin the orderer wants to buy or sell */
  amount: string;
  /** order_lifespan specifies the order lifespan */
  order_lifespan?: DurationAmino;
}
export interface MsgMMOrderAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgMMOrder";
  value: MsgMMOrderAmino;
}
/** MsgMMOrder defines an SDK message for making a MM(market making) order. */
export interface MsgMMOrderSDKType {
  orderer: string;
  pair_id: Long;
  direction: OrderDirection;
  offer_coin: CoinSDKType;
  demand_coin_denom: string;
  price: string;
  amount: string;
  order_lifespan: DurationSDKType;
}
/** MsgMMOrderResponse defines the Msg/MMOrder response type. */
export interface MsgMMOrderResponse {}
export interface MsgMMOrderResponseProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgMMOrderResponse";
  value: Uint8Array;
}
/** MsgMMOrderResponse defines the Msg/MMOrder response type. */
export interface MsgMMOrderResponseAmino {}
export interface MsgMMOrderResponseAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgMMOrderResponse";
  value: MsgMMOrderResponseAmino;
}
/** MsgMMOrderResponse defines the Msg/MMOrder response type. */
export interface MsgMMOrderResponseSDKType {}
/** MsgCancelOrder defines an SDK message for cancelling an order */
export interface MsgCancelOrder {
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** pair_id specifies the pair id */
  pairId: Long;
  /** order_id specifies the order id */
  orderId: Long;
}
export interface MsgCancelOrderProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgCancelOrder";
  value: Uint8Array;
}
/** MsgCancelOrder defines an SDK message for cancelling an order */
export interface MsgCancelOrderAmino {
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** pair_id specifies the pair id */
  pair_id: string;
  /** order_id specifies the order id */
  order_id: string;
}
export interface MsgCancelOrderAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgCancelOrder";
  value: MsgCancelOrderAmino;
}
/** MsgCancelOrder defines an SDK message for cancelling an order */
export interface MsgCancelOrderSDKType {
  orderer: string;
  pair_id: Long;
  order_id: Long;
}
/** MsgCancelOrderResponse defines the Msg/CancelOrder response type. */
export interface MsgCancelOrderResponse {}
export interface MsgCancelOrderResponseProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgCancelOrderResponse";
  value: Uint8Array;
}
/** MsgCancelOrderResponse defines the Msg/CancelOrder response type. */
export interface MsgCancelOrderResponseAmino {}
export interface MsgCancelOrderResponseAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgCancelOrderResponse";
  value: MsgCancelOrderResponseAmino;
}
/** MsgCancelOrderResponse defines the Msg/CancelOrder response type. */
export interface MsgCancelOrderResponseSDKType {}
/** MsgCancelAllOrders defines an SDK message for cancelling all orders */
export interface MsgCancelAllOrders {
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** pair_ids specifies pair ids to cancel orders */
  pairIds: Long[];
}
export interface MsgCancelAllOrdersProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgCancelAllOrders";
  value: Uint8Array;
}
/** MsgCancelAllOrders defines an SDK message for cancelling all orders */
export interface MsgCancelAllOrdersAmino {
  /** orderer specifies the bech32-encoded address that makes an order */
  orderer: string;
  /** pair_ids specifies pair ids to cancel orders */
  pair_ids: string[];
}
export interface MsgCancelAllOrdersAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgCancelAllOrders";
  value: MsgCancelAllOrdersAmino;
}
/** MsgCancelAllOrders defines an SDK message for cancelling all orders */
export interface MsgCancelAllOrdersSDKType {
  orderer: string;
  pair_ids: Long[];
}
/** MsgCancelAllOrdersResponse defines the Msg/CancelAllOrders response type. */
export interface MsgCancelAllOrdersResponse {}
export interface MsgCancelAllOrdersResponseProtoMsg {
  typeUrl: "/crescent.liquidity.v1beta1.MsgCancelAllOrdersResponse";
  value: Uint8Array;
}
/** MsgCancelAllOrdersResponse defines the Msg/CancelAllOrders response type. */
export interface MsgCancelAllOrdersResponseAmino {}
export interface MsgCancelAllOrdersResponseAminoMsg {
  type: "/crescent.liquidity.v1beta1.MsgCancelAllOrdersResponse";
  value: MsgCancelAllOrdersResponseAmino;
}
/** MsgCancelAllOrdersResponse defines the Msg/CancelAllOrders response type. */
export interface MsgCancelAllOrdersResponseSDKType {}