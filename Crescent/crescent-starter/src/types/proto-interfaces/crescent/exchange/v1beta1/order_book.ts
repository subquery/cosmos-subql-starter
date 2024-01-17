export interface OrderBook {
  priceInterval: string;
  sells: OrderBookPriceLevel[];
  buys: OrderBookPriceLevel[];
}
export interface OrderBookProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.OrderBook";
  value: Uint8Array;
}
export interface OrderBookAmino {
  price_interval: string;
  sells: OrderBookPriceLevelAmino[];
  buys: OrderBookPriceLevelAmino[];
}
export interface OrderBookAminoMsg {
  type: "/crescent.exchange.v1beta1.OrderBook";
  value: OrderBookAmino;
}
export interface OrderBookSDKType {
  price_interval: string;
  sells: OrderBookPriceLevelSDKType[];
  buys: OrderBookPriceLevelSDKType[];
}
export interface OrderBookPriceLevel {
  /** p denotes price */
  p: string;
  /** q denotes quantity */
  q: string;
}
export interface OrderBookPriceLevelProtoMsg {
  typeUrl: "/crescent.exchange.v1beta1.OrderBookPriceLevel";
  value: Uint8Array;
}
export interface OrderBookPriceLevelAmino {
  /** p denotes price */
  p: string;
  /** q denotes quantity */
  q: string;
}
export interface OrderBookPriceLevelAminoMsg {
  type: "/crescent.exchange.v1beta1.OrderBookPriceLevel";
  value: OrderBookPriceLevelAmino;
}
export interface OrderBookPriceLevelSDKType {
  p: string;
  q: string;
}