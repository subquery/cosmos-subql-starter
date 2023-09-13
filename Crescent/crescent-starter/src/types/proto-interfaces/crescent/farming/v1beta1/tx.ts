import { DecCoin, DecCoinAmino, DecCoinSDKType, Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
/**
 * MsgCreateFixedAmountPlan defines a SDK message for creating a new fixed
 * amount farming plan.
 */
export interface MsgCreateFixedAmountPlan {
  /** name specifies the name for the plan */
  name: string;
  /**
   * creator defines the bech32-encoded address of the creator for the private plan, termination address is also set to
   * this creator.
   */
  creator: string;
  /** staking_coin_weights specifies coins weight for the plan */
  stakingCoinWeights: DecCoin[];
  /** start_time specifies the start time of the plan */
  startTime: Date;
  /** end_time specifies the end time of the plan */
  endTime: Date;
  /** epoch_amount specifies the distributing amount for each epoch */
  epochAmount: Coin[];
}
export interface MsgCreateFixedAmountPlanProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgCreateFixedAmountPlan";
  value: Uint8Array;
}
/**
 * MsgCreateFixedAmountPlan defines a SDK message for creating a new fixed
 * amount farming plan.
 */
export interface MsgCreateFixedAmountPlanAmino {
  /** name specifies the name for the plan */
  name: string;
  /**
   * creator defines the bech32-encoded address of the creator for the private plan, termination address is also set to
   * this creator.
   */
  creator: string;
  /** staking_coin_weights specifies coins weight for the plan */
  staking_coin_weights: DecCoinAmino[];
  /** start_time specifies the start time of the plan */
  start_time?: Date;
  /** end_time specifies the end time of the plan */
  end_time?: Date;
  /** epoch_amount specifies the distributing amount for each epoch */
  epoch_amount: CoinAmino[];
}
export interface MsgCreateFixedAmountPlanAminoMsg {
  type: "/crescent.farming.v1beta1.MsgCreateFixedAmountPlan";
  value: MsgCreateFixedAmountPlanAmino;
}
/**
 * MsgCreateFixedAmountPlan defines a SDK message for creating a new fixed
 * amount farming plan.
 */
export interface MsgCreateFixedAmountPlanSDKType {
  name: string;
  creator: string;
  staking_coin_weights: DecCoinSDKType[];
  start_time: Date;
  end_time: Date;
  epoch_amount: CoinSDKType[];
}
/** MsgCreateFixedAmountPlanResponse defines the MsgCreateFixedAmountPlanResponse response type. */
export interface MsgCreateFixedAmountPlanResponse {}
export interface MsgCreateFixedAmountPlanResponseProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgCreateFixedAmountPlanResponse";
  value: Uint8Array;
}
/** MsgCreateFixedAmountPlanResponse defines the MsgCreateFixedAmountPlanResponse response type. */
export interface MsgCreateFixedAmountPlanResponseAmino {}
export interface MsgCreateFixedAmountPlanResponseAminoMsg {
  type: "/crescent.farming.v1beta1.MsgCreateFixedAmountPlanResponse";
  value: MsgCreateFixedAmountPlanResponseAmino;
}
/** MsgCreateFixedAmountPlanResponse defines the MsgCreateFixedAmountPlanResponse response type. */
export interface MsgCreateFixedAmountPlanResponseSDKType {}
/**
 * MsgCreateRatioPlan defines a SDK message for creating a new ratio farming
 * plan.
 */
export interface MsgCreateRatioPlan {
  /** name specifies the name for the plan */
  name: string;
  /**
   * creator defines the bech32-encoded address of the creator for the private plan, termination address is also set to
   * this creator.
   */
  creator: string;
  /** staking_coin_weights specifies coins weight for the plan */
  stakingCoinWeights: DecCoin[];
  /** start_time specifies the start time of the plan */
  startTime: Date;
  /** end_time specifies the end time of the plan */
  endTime: Date;
  /** epoch_ratio specifies the distributing amount by ratio */
  epochRatio: string;
}
export interface MsgCreateRatioPlanProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgCreateRatioPlan";
  value: Uint8Array;
}
/**
 * MsgCreateRatioPlan defines a SDK message for creating a new ratio farming
 * plan.
 */
export interface MsgCreateRatioPlanAmino {
  /** name specifies the name for the plan */
  name: string;
  /**
   * creator defines the bech32-encoded address of the creator for the private plan, termination address is also set to
   * this creator.
   */
  creator: string;
  /** staking_coin_weights specifies coins weight for the plan */
  staking_coin_weights: DecCoinAmino[];
  /** start_time specifies the start time of the plan */
  start_time?: Date;
  /** end_time specifies the end time of the plan */
  end_time?: Date;
  /** epoch_ratio specifies the distributing amount by ratio */
  epoch_ratio: string;
}
export interface MsgCreateRatioPlanAminoMsg {
  type: "/crescent.farming.v1beta1.MsgCreateRatioPlan";
  value: MsgCreateRatioPlanAmino;
}
/**
 * MsgCreateRatioPlan defines a SDK message for creating a new ratio farming
 * plan.
 */
export interface MsgCreateRatioPlanSDKType {
  name: string;
  creator: string;
  staking_coin_weights: DecCoinSDKType[];
  start_time: Date;
  end_time: Date;
  epoch_ratio: string;
}
/**
 * MsgCreateRatioPlanResponse  defines the Msg/MsgCreateRatioPlanResponse
 * response type.
 */
export interface MsgCreateRatioPlanResponse {}
export interface MsgCreateRatioPlanResponseProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgCreateRatioPlanResponse";
  value: Uint8Array;
}
/**
 * MsgCreateRatioPlanResponse  defines the Msg/MsgCreateRatioPlanResponse
 * response type.
 */
export interface MsgCreateRatioPlanResponseAmino {}
export interface MsgCreateRatioPlanResponseAminoMsg {
  type: "/crescent.farming.v1beta1.MsgCreateRatioPlanResponse";
  value: MsgCreateRatioPlanResponseAmino;
}
/**
 * MsgCreateRatioPlanResponse  defines the Msg/MsgCreateRatioPlanResponse
 * response type.
 */
export interface MsgCreateRatioPlanResponseSDKType {}
/** MsgStake defines a SDK message for staking coins into the farming plan. */
export interface MsgStake {
  /** farmer defines the bech32-encoded address of the farmer */
  farmer: string;
  /** staking_coins specifies coins to stake */
  stakingCoins: Coin[];
}
export interface MsgStakeProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgStake";
  value: Uint8Array;
}
/** MsgStake defines a SDK message for staking coins into the farming plan. */
export interface MsgStakeAmino {
  /** farmer defines the bech32-encoded address of the farmer */
  farmer: string;
  /** staking_coins specifies coins to stake */
  staking_coins: CoinAmino[];
}
export interface MsgStakeAminoMsg {
  type: "/crescent.farming.v1beta1.MsgStake";
  value: MsgStakeAmino;
}
/** MsgStake defines a SDK message for staking coins into the farming plan. */
export interface MsgStakeSDKType {
  farmer: string;
  staking_coins: CoinSDKType[];
}
/** MsgStakeResponse  defines the Msg/MsgStakeResponse response type. */
export interface MsgStakeResponse {}
export interface MsgStakeResponseProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgStakeResponse";
  value: Uint8Array;
}
/** MsgStakeResponse  defines the Msg/MsgStakeResponse response type. */
export interface MsgStakeResponseAmino {}
export interface MsgStakeResponseAminoMsg {
  type: "/crescent.farming.v1beta1.MsgStakeResponse";
  value: MsgStakeResponseAmino;
}
/** MsgStakeResponse  defines the Msg/MsgStakeResponse response type. */
export interface MsgStakeResponseSDKType {}
/**
 * MsgUnstake defines a SDK message for performing unstaking of coins from the
 * farming plan.
 */
export interface MsgUnstake {
  /** farmer defines the bech32-encoded address of the farmer */
  farmer: string;
  /** unstaking_coins specifies coins to stake */
  unstakingCoins: Coin[];
}
export interface MsgUnstakeProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgUnstake";
  value: Uint8Array;
}
/**
 * MsgUnstake defines a SDK message for performing unstaking of coins from the
 * farming plan.
 */
export interface MsgUnstakeAmino {
  /** farmer defines the bech32-encoded address of the farmer */
  farmer: string;
  /** unstaking_coins specifies coins to stake */
  unstaking_coins: CoinAmino[];
}
export interface MsgUnstakeAminoMsg {
  type: "/crescent.farming.v1beta1.MsgUnstake";
  value: MsgUnstakeAmino;
}
/**
 * MsgUnstake defines a SDK message for performing unstaking of coins from the
 * farming plan.
 */
export interface MsgUnstakeSDKType {
  farmer: string;
  unstaking_coins: CoinSDKType[];
}
/** MsgUnstakeResponse defines the Msg/MsgUnstakeResponse response type. */
export interface MsgUnstakeResponse {}
export interface MsgUnstakeResponseProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgUnstakeResponse";
  value: Uint8Array;
}
/** MsgUnstakeResponse defines the Msg/MsgUnstakeResponse response type. */
export interface MsgUnstakeResponseAmino {}
export interface MsgUnstakeResponseAminoMsg {
  type: "/crescent.farming.v1beta1.MsgUnstakeResponse";
  value: MsgUnstakeResponseAmino;
}
/** MsgUnstakeResponse defines the Msg/MsgUnstakeResponse response type. */
export interface MsgUnstakeResponseSDKType {}
/** MsgHarvest defines a SDK message for claiming rewards from the farming plan. */
export interface MsgHarvest {
  /** farmer defines the bech32-encoded address of the farmer */
  farmer: string;
  /**
   * staking_coin_denoms is the set of denoms of staked coins as a source of the reward for
   * harvesting
   */
  stakingCoinDenoms: string[];
}
export interface MsgHarvestProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgHarvest";
  value: Uint8Array;
}
/** MsgHarvest defines a SDK message for claiming rewards from the farming plan. */
export interface MsgHarvestAmino {
  /** farmer defines the bech32-encoded address of the farmer */
  farmer: string;
  /**
   * staking_coin_denoms is the set of denoms of staked coins as a source of the reward for
   * harvesting
   */
  staking_coin_denoms: string[];
}
export interface MsgHarvestAminoMsg {
  type: "/crescent.farming.v1beta1.MsgHarvest";
  value: MsgHarvestAmino;
}
/** MsgHarvest defines a SDK message for claiming rewards from the farming plan. */
export interface MsgHarvestSDKType {
  farmer: string;
  staking_coin_denoms: string[];
}
/** MsgHarvestResponse defines the Msg/MsgHarvestResponse response type. */
export interface MsgHarvestResponse {}
export interface MsgHarvestResponseProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgHarvestResponse";
  value: Uint8Array;
}
/** MsgHarvestResponse defines the Msg/MsgHarvestResponse response type. */
export interface MsgHarvestResponseAmino {}
export interface MsgHarvestResponseAminoMsg {
  type: "/crescent.farming.v1beta1.MsgHarvestResponse";
  value: MsgHarvestResponseAmino;
}
/** MsgHarvestResponse defines the Msg/MsgHarvestResponse response type. */
export interface MsgHarvestResponseSDKType {}
/** MsgRemovePlan defines a message for removing a terminated plan. */
export interface MsgRemovePlan {
  creator: string;
  planId: Long;
}
export interface MsgRemovePlanProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgRemovePlan";
  value: Uint8Array;
}
/** MsgRemovePlan defines a message for removing a terminated plan. */
export interface MsgRemovePlanAmino {
  creator: string;
  plan_id: string;
}
export interface MsgRemovePlanAminoMsg {
  type: "/crescent.farming.v1beta1.MsgRemovePlan";
  value: MsgRemovePlanAmino;
}
/** MsgRemovePlan defines a message for removing a terminated plan. */
export interface MsgRemovePlanSDKType {
  creator: string;
  plan_id: Long;
}
/** MsgRemovePlanResponse defines the Msg/RemovePlan response type. */
export interface MsgRemovePlanResponse {}
export interface MsgRemovePlanResponseProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgRemovePlanResponse";
  value: Uint8Array;
}
/** MsgRemovePlanResponse defines the Msg/RemovePlan response type. */
export interface MsgRemovePlanResponseAmino {}
export interface MsgRemovePlanResponseAminoMsg {
  type: "/crescent.farming.v1beta1.MsgRemovePlanResponse";
  value: MsgRemovePlanResponseAmino;
}
/** MsgRemovePlanResponse defines the Msg/RemovePlan response type. */
export interface MsgRemovePlanResponseSDKType {}
/** MsgAdvanceEpoch defines a message to advance epoch by one. */
export interface MsgAdvanceEpoch {
  /** requester defines the bech32-encoded address of the requester */
  requester: string;
}
export interface MsgAdvanceEpochProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgAdvanceEpoch";
  value: Uint8Array;
}
/** MsgAdvanceEpoch defines a message to advance epoch by one. */
export interface MsgAdvanceEpochAmino {
  /** requester defines the bech32-encoded address of the requester */
  requester: string;
}
export interface MsgAdvanceEpochAminoMsg {
  type: "/crescent.farming.v1beta1.MsgAdvanceEpoch";
  value: MsgAdvanceEpochAmino;
}
/** MsgAdvanceEpoch defines a message to advance epoch by one. */
export interface MsgAdvanceEpochSDKType {
  requester: string;
}
/** MsgAdvanceEpochResponse defines the Msg/AdvanceEpoch response type. */
export interface MsgAdvanceEpochResponse {}
export interface MsgAdvanceEpochResponseProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.MsgAdvanceEpochResponse";
  value: Uint8Array;
}
/** MsgAdvanceEpochResponse defines the Msg/AdvanceEpoch response type. */
export interface MsgAdvanceEpochResponseAmino {}
export interface MsgAdvanceEpochResponseAminoMsg {
  type: "/crescent.farming.v1beta1.MsgAdvanceEpochResponse";
  value: MsgAdvanceEpochResponseAmino;
}
/** MsgAdvanceEpochResponse defines the Msg/AdvanceEpoch response type. */
export interface MsgAdvanceEpochResponseSDKType {}