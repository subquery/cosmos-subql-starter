import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
/** Params defines the parameters for the budget module. */
export interface Params {
  /**
   * The universal epoch length in number of blocks
   * A collection of budgets is executed with this epoch_blocks parameter
   */
  epochBlocks: number;
  /**
   * Budgets parameter can be added, modified, and deleted through
   * parameter change governance proposal
   */
  budgets: Budget[];
}
export interface ParamsProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the budget module. */
export interface ParamsAmino {
  /**
   * The universal epoch length in number of blocks
   * A collection of budgets is executed with this epoch_blocks parameter
   */
  epoch_blocks: number;
  /**
   * Budgets parameter can be added, modified, and deleted through
   * parameter change governance proposal
   */
  budgets: BudgetAmino[];
}
export interface ParamsAminoMsg {
  type: "cosmos-sdk/Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the budget module. */
export interface ParamsSDKType {
  epoch_blocks: number;
  budgets: BudgetSDKType[];
}
/** Budget defines a budget object. */
export interface Budget {
  /** name defines the name of the budget */
  name: string;
  /** rate specifies the distributing amount by ratio of total budget source */
  rate: string;
  /** source_address defines the bech32-encoded address that source of the budget */
  sourceAddress: string;
  /** destination_address defines the bech32-encoded address of the budget pool to distribute */
  destinationAddress: string;
  /** start_time specifies the start time of the budget */
  startTime: Date;
  /** end_time specifies the end time of the budget */
  endTime: Date;
}
export interface BudgetProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.Budget";
  value: Uint8Array;
}
/** Budget defines a budget object. */
export interface BudgetAmino {
  /** name defines the name of the budget */
  name: string;
  /** rate specifies the distributing amount by ratio of total budget source */
  rate: string;
  /** source_address defines the bech32-encoded address that source of the budget */
  source_address: string;
  /** destination_address defines the bech32-encoded address of the budget pool to distribute */
  destination_address: string;
  /** start_time specifies the start time of the budget */
  start_time?: Date;
  /** end_time specifies the end time of the budget */
  end_time?: Date;
}
export interface BudgetAminoMsg {
  type: "cosmos-sdk/Budget";
  value: BudgetAmino;
}
/** Budget defines a budget object. */
export interface BudgetSDKType {
  name: string;
  rate: string;
  source_address: string;
  destination_address: string;
  start_time: Date;
  end_time: Date;
}
/** TotalCollectedCoins defines total collected coins with relevant metadata. */
export interface TotalCollectedCoins {
  /** total_collected_coins specifies the total collected coins in a budget ever since the budget is created */
  totalCollectedCoins: Coin[];
}
export interface TotalCollectedCoinsProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.TotalCollectedCoins";
  value: Uint8Array;
}
/** TotalCollectedCoins defines total collected coins with relevant metadata. */
export interface TotalCollectedCoinsAmino {
  /** total_collected_coins specifies the total collected coins in a budget ever since the budget is created */
  total_collected_coins: CoinAmino[];
}
export interface TotalCollectedCoinsAminoMsg {
  type: "cosmos-sdk/TotalCollectedCoins";
  value: TotalCollectedCoinsAmino;
}
/** TotalCollectedCoins defines total collected coins with relevant metadata. */
export interface TotalCollectedCoinsSDKType {
  total_collected_coins: CoinSDKType[];
}