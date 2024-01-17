import { Params, ParamsAmino, ParamsSDKType, MarketMaker, MarketMakerAmino, MarketMakerSDKType, Incentive, IncentiveAmino, IncentiveSDKType, DepositRecord, DepositRecordAmino, DepositRecordSDKType } from "./marketmaker";
/** GenesisState defines the marketmaker module's genesis state. */
export interface GenesisState {
  /** params defines all the parameters for the marketmaker module */
  params: Params;
  marketMakers: MarketMaker[];
  incentives: Incentive[];
  depositRecords: DepositRecord[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/crescent.marketmaker.v1beta1.GenesisState";
  value: Uint8Array;
}
/** GenesisState defines the marketmaker module's genesis state. */
export interface GenesisStateAmino {
  /** params defines all the parameters for the marketmaker module */
  params?: ParamsAmino;
  market_makers: MarketMakerAmino[];
  incentives: IncentiveAmino[];
  deposit_records: DepositRecordAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/crescent.marketmaker.v1beta1.GenesisState";
  value: GenesisStateAmino;
}
/** GenesisState defines the marketmaker module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  market_makers: MarketMakerSDKType[];
  incentives: IncentiveSDKType[];
  deposit_records: DepositRecordSDKType[];
}