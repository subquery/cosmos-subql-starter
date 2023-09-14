import { Params, ParamsAmino, ParamsSDKType, State, StateAmino, StateSDKType } from "./swingset";
/** The initial or exported state. */
export interface GenesisState {
  params: Params;
  state: State;
  swingStoreExportData: SwingStoreExportDataEntry[];
}
export interface GenesisStateProtoMsg {
  typeUrl: "/agoric.swingset.GenesisState";
  value: Uint8Array;
}
/** The initial or exported state. */
export interface GenesisStateAmino {
  params?: ParamsAmino;
  state?: StateAmino;
  swing_store_export_data: SwingStoreExportDataEntryAmino[];
}
export interface GenesisStateAminoMsg {
  type: "/agoric.swingset.GenesisState";
  value: GenesisStateAmino;
}
/** The initial or exported state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  state: StateSDKType;
  swing_store_export_data: SwingStoreExportDataEntrySDKType[];
}
/** A SwingStore "export data" entry. */
export interface SwingStoreExportDataEntry {
  key: string;
  value: string;
}
export interface SwingStoreExportDataEntryProtoMsg {
  typeUrl: "/agoric.swingset.SwingStoreExportDataEntry";
  value: Uint8Array;
}
/** A SwingStore "export data" entry. */
export interface SwingStoreExportDataEntryAmino {
  key: string;
  value: string;
}
export interface SwingStoreExportDataEntryAminoMsg {
  type: "/agoric.swingset.SwingStoreExportDataEntry";
  value: SwingStoreExportDataEntryAmino;
}
/** A SwingStore "export data" entry. */
export interface SwingStoreExportDataEntrySDKType {
  key: string;
  value: string;
}