import { Params, ParamsAmino, ParamsSDKType, State, StateAmino, StateSDKType } from "./vbank";
/** The initial and exported module state. */
export interface GenesisState {
  /** parms defines all the parameters of the module. */
  params: Params;
  /** state is the current operation state. */
  state: State;
}
export interface GenesisStateProtoMsg {
  typeUrl: "/agoric.vbank.GenesisState";
  value: Uint8Array;
}
/** The initial and exported module state. */
export interface GenesisStateAmino {
  /** parms defines all the parameters of the module. */
  params?: ParamsAmino;
  /** state is the current operation state. */
  state?: StateAmino;
}
export interface GenesisStateAminoMsg {
  type: "/agoric.vbank.GenesisState";
  value: GenesisStateAmino;
}
/** The initial and exported module state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  state: StateSDKType;
}