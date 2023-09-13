import { Params, ParamsAmino, ParamsSDKType } from "./budget";
import { Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
/** GenesisState defines the budget module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters for the budget module */
  params: Params;
  /** budget_records defines the budget records used for genesis state */
  budgetRecords: BudgetRecord[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the budget module's genesis state. */
export interface GenesisStateAmino {
  /** params defines all the parameters for the budget module */
  params?: ParamsAmino;
  /** budget_records defines the budget records used for genesis state */
  budget_records: BudgetRecordAmino[];
}
export interface GenesisStateAminoMsg {
  type: "cosmos-sdk/GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the budget module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  budget_records: BudgetRecordSDKType[];
}
/** BudgetRecord records the state of each budget after genesis import or export. */
export interface BudgetRecord {
  /** name defines the name of the budget */
  name: string;
  /** total_collected_coins specifies the total collected coins in a budget ever since the budget is created */
  totalCollectedCoins: Coin[];
}
export interface BudgetRecordProtoMsg {
  typeUrl: "/cosmos.budget.v1beta1.BudgetRecord";
  value: Uint8Array;
}
/** BudgetRecord records the state of each budget after genesis import or export. */
export interface BudgetRecordAmino {
  /** name defines the name of the budget */
  name: string;
  /** total_collected_coins specifies the total collected coins in a budget ever since the budget is created */
  total_collected_coins: CoinAmino[];
}
export interface BudgetRecordAminoMsg {
  type: "cosmos-sdk/BudgetRecord";
  value: BudgetRecordAmino;
}
/** BudgetRecord records the state of each budget after genesis import or export. */
export interface BudgetRecordSDKType {
  name: string;
  total_collected_coins: CoinSDKType[];
}