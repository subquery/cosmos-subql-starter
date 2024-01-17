import { DecCoin, DecCoinAmino, DecCoinSDKType, Coin, CoinAmino, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Long } from "../../../helpers";
/**
 * PublicPlanProposal defines a public farming plan governance proposal that receives one of the following requests:
 * A request that creates a public farming plan, a request that updates the plan, and a request that deletes the plan.
 * For public plan creation, depending on which field is passed, either epoch amount or epoch ratio, it creates a fixed
 * amount plan or ratio plan.
 */
export interface PublicPlanProposal {
  /** title specifies the title of the plan */
  title: string;
  /** description specifies the description of the plan */
  description: string;
  /** add_plan_requests specifies AddPlanRequest object */
  addPlanRequests: AddPlanRequest[];
  /** modify_plan_requests specifies ModifyPlanRequest object */
  modifyPlanRequests: ModifyPlanRequest[];
  /** delete_plan_requests specifies DeletePlanRequest object */
  deletePlanRequests: DeletePlanRequest[];
}
export interface PublicPlanProposalProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.PublicPlanProposal";
  value: Uint8Array;
}
/**
 * PublicPlanProposal defines a public farming plan governance proposal that receives one of the following requests:
 * A request that creates a public farming plan, a request that updates the plan, and a request that deletes the plan.
 * For public plan creation, depending on which field is passed, either epoch amount or epoch ratio, it creates a fixed
 * amount plan or ratio plan.
 */
export interface PublicPlanProposalAmino {
  /** title specifies the title of the plan */
  title: string;
  /** description specifies the description of the plan */
  description: string;
  /** add_plan_requests specifies AddPlanRequest object */
  add_plan_requests: AddPlanRequestAmino[];
  /** modify_plan_requests specifies ModifyPlanRequest object */
  modify_plan_requests: ModifyPlanRequestAmino[];
  /** delete_plan_requests specifies DeletePlanRequest object */
  delete_plan_requests: DeletePlanRequestAmino[];
}
export interface PublicPlanProposalAminoMsg {
  type: "/crescent.farming.v1beta1.PublicPlanProposal";
  value: PublicPlanProposalAmino;
}
/**
 * PublicPlanProposal defines a public farming plan governance proposal that receives one of the following requests:
 * A request that creates a public farming plan, a request that updates the plan, and a request that deletes the plan.
 * For public plan creation, depending on which field is passed, either epoch amount or epoch ratio, it creates a fixed
 * amount plan or ratio plan.
 */
export interface PublicPlanProposalSDKType {
  title: string;
  description: string;
  add_plan_requests: AddPlanRequestSDKType[];
  modify_plan_requests: ModifyPlanRequestSDKType[];
  delete_plan_requests: DeletePlanRequestSDKType[];
}
/** AddPlanRequest details a proposal for creating a public plan. */
export interface AddPlanRequest {
  /** name specifies the plan name for display */
  name: string;
  /** farming_pool_address defines the bech32-encoded address of the farming pool */
  farmingPoolAddress: string;
  /**
   * termination_address defines the bech32-encoded address that terminates plan
   * when the plan ends after the end time, the balance of farming pool address
   * is transferred to the termination address
   */
  terminationAddress: string;
  /** staking_coin_weights specifies coin weights for the plan */
  stakingCoinWeights: DecCoin[];
  /** start_time specifies the start time of the plan */
  startTime: Date;
  /** end_time specifies the end time of the plan */
  endTime: Date;
  /** epoch_amount specifies the distributing amount for each epoch */
  epochAmount: Coin[];
  /** epoch_ratio specifies the distributing amount by ratio */
  epochRatio: string;
}
export interface AddPlanRequestProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.AddPlanRequest";
  value: Uint8Array;
}
/** AddPlanRequest details a proposal for creating a public plan. */
export interface AddPlanRequestAmino {
  /** name specifies the plan name for display */
  name: string;
  /** farming_pool_address defines the bech32-encoded address of the farming pool */
  farming_pool_address: string;
  /**
   * termination_address defines the bech32-encoded address that terminates plan
   * when the plan ends after the end time, the balance of farming pool address
   * is transferred to the termination address
   */
  termination_address: string;
  /** staking_coin_weights specifies coin weights for the plan */
  staking_coin_weights: DecCoinAmino[];
  /** start_time specifies the start time of the plan */
  start_time?: Date;
  /** end_time specifies the end time of the plan */
  end_time?: Date;
  /** epoch_amount specifies the distributing amount for each epoch */
  epoch_amount: CoinAmino[];
  /** epoch_ratio specifies the distributing amount by ratio */
  epoch_ratio: string;
}
export interface AddPlanRequestAminoMsg {
  type: "/crescent.farming.v1beta1.AddPlanRequest";
  value: AddPlanRequestAmino;
}
/** AddPlanRequest details a proposal for creating a public plan. */
export interface AddPlanRequestSDKType {
  name: string;
  farming_pool_address: string;
  termination_address: string;
  staking_coin_weights: DecCoinSDKType[];
  start_time: Date;
  end_time: Date;
  epoch_amount: CoinSDKType[];
  epoch_ratio: string;
}
/** ModifyPlanRequest details a proposal for modifying the existing public plan. */
export interface ModifyPlanRequest {
  /** plan_id specifies index of the farming plan */
  planId: Long;
  /** name specifies the plan name for display */
  name: string;
  /** farming_pool_address defines the bech32-encoded address of the farming pool */
  farmingPoolAddress: string;
  /**
   * termination_address defines the bech32-encoded address that terminates plan
   * when the plan ends after the end time, the balance of farming pool address
   * is transferred to the termination address
   */
  terminationAddress: string;
  /** staking_coin_weights specifies coin weights for the plan */
  stakingCoinWeights: DecCoin[];
  /** start_time specifies the start time of the plan */
  startTime?: Date;
  /** end_time specifies the end time of the plan */
  endTime?: Date;
  /** epoch_amount specifies the distributing amount for each epoch */
  epochAmount: Coin[];
  /** epoch_ratio specifies the distributing amount by ratio */
  epochRatio: string;
}
export interface ModifyPlanRequestProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.ModifyPlanRequest";
  value: Uint8Array;
}
/** ModifyPlanRequest details a proposal for modifying the existing public plan. */
export interface ModifyPlanRequestAmino {
  /** plan_id specifies index of the farming plan */
  plan_id: string;
  /** name specifies the plan name for display */
  name: string;
  /** farming_pool_address defines the bech32-encoded address of the farming pool */
  farming_pool_address: string;
  /**
   * termination_address defines the bech32-encoded address that terminates plan
   * when the plan ends after the end time, the balance of farming pool address
   * is transferred to the termination address
   */
  termination_address: string;
  /** staking_coin_weights specifies coin weights for the plan */
  staking_coin_weights: DecCoinAmino[];
  /** start_time specifies the start time of the plan */
  start_time?: Date;
  /** end_time specifies the end time of the plan */
  end_time?: Date;
  /** epoch_amount specifies the distributing amount for each epoch */
  epoch_amount: CoinAmino[];
  /** epoch_ratio specifies the distributing amount by ratio */
  epoch_ratio: string;
}
export interface ModifyPlanRequestAminoMsg {
  type: "/crescent.farming.v1beta1.ModifyPlanRequest";
  value: ModifyPlanRequestAmino;
}
/** ModifyPlanRequest details a proposal for modifying the existing public plan. */
export interface ModifyPlanRequestSDKType {
  plan_id: Long;
  name: string;
  farming_pool_address: string;
  termination_address: string;
  staking_coin_weights: DecCoinSDKType[];
  start_time?: Date;
  end_time?: Date;
  epoch_amount: CoinSDKType[];
  epoch_ratio: string;
}
/** DeletePlanRequest details a proposal for deleting an existing public plan. */
export interface DeletePlanRequest {
  /** plan_id specifies index of the farming plan */
  planId: Long;
}
export interface DeletePlanRequestProtoMsg {
  typeUrl: "/crescent.farming.v1beta1.DeletePlanRequest";
  value: Uint8Array;
}
/** DeletePlanRequest details a proposal for deleting an existing public plan. */
export interface DeletePlanRequestAmino {
  /** plan_id specifies index of the farming plan */
  plan_id: string;
}
export interface DeletePlanRequestAminoMsg {
  type: "/crescent.farming.v1beta1.DeletePlanRequest";
  value: DeletePlanRequestAmino;
}
/** DeletePlanRequest details a proposal for deleting an existing public plan. */
export interface DeletePlanRequestSDKType {
  plan_id: Long;
}