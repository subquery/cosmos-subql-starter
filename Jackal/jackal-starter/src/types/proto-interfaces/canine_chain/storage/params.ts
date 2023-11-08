import { Long } from "../../helpers";
/** Params defines the parameters for the module. */
export interface Params {
  depositAccount: string;
  proofWindow: Long;
  /**
   * Chunk size of a file is divided into
   * The value cannot be smaller than 1 to avoid zero division
   */
  chunkSize: Long;
  missesToBurn: Long;
  priceFeed: string;
  /** Life span of a contract in blocks */
  maxContractAgeInBlocks: Long;
  pricePerTbPerMonth: Long;
  attestFormSize: Long;
  attestMinToPass: Long;
  collateralPrice: Long;
}
export interface ParamsProtoMsg {
  typeUrl: "/canine_chain.storage.Params";
  value: Uint8Array;
}
/** Params defines the parameters for the module. */
export interface ParamsAmino {
  deposit_account: string;
  proof_window: string;
  /**
   * Chunk size of a file is divided into
   * The value cannot be smaller than 1 to avoid zero division
   */
  chunk_size: string;
  misses_to_burn: string;
  price_feed: string;
  /** Life span of a contract in blocks */
  max_contract_age_in_blocks: string;
  price_per_tb_per_month: string;
  attestFormSize: string;
  attestMinToPass: string;
  collateralPrice: string;
}
export interface ParamsAminoMsg {
  type: "/canine_chain.storage.Params";
  value: ParamsAmino;
}
/** Params defines the parameters for the module. */
export interface ParamsSDKType {
  deposit_account: string;
  proof_window: Long;
  chunk_size: Long;
  misses_to_burn: Long;
  price_feed: string;
  max_contract_age_in_blocks: Long;
  price_per_tb_per_month: Long;
  attestFormSize: Long;
  attestMinToPass: Long;
  collateralPrice: Long;
}