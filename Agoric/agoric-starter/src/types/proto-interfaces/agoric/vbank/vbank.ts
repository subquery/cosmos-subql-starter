import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin";
import { Long } from "../../helpers";
/** The module governance/configuration parameters. */
export interface Params {
  /**
   * reward_epoch_duration_blocks is the length of a reward epoch, in blocks.
   * A value of zero has the same meaning as a value of one:
   * the full reward buffer should be distributed immediately.
   */
  rewardEpochDurationBlocks: Long;
  /**
   * per_epoch_reward_fraction is a fraction of the reward pool to distrubute
   * once every reward epoch.  If less than zero, use approximately continuous
   * per-block distribution.
   */
  perEpochRewardFraction: string;
  /**
   * reward_smoothing_blocks is the number of blocks over which to distribute
   * an epoch's rewards.  If zero, use the same value as
   * reward_epoch_duration_blocks.
   */
  rewardSmoothingBlocks: Long;
}
export interface ParamsProtoMsg {
  typeUrl: "/agoric.vbank.Params";
  value: Uint8Array;
}
/** The module governance/configuration parameters. */
export interface ParamsAmino {
  /**
   * reward_epoch_duration_blocks is the length of a reward epoch, in blocks.
   * A value of zero has the same meaning as a value of one:
   * the full reward buffer should be distributed immediately.
   */
  reward_epoch_duration_blocks: string;
  /**
   * per_epoch_reward_fraction is a fraction of the reward pool to distrubute
   * once every reward epoch.  If less than zero, use approximately continuous
   * per-block distribution.
   */
  per_epoch_reward_fraction: string;
  /**
   * reward_smoothing_blocks is the number of blocks over which to distribute
   * an epoch's rewards.  If zero, use the same value as
   * reward_epoch_duration_blocks.
   */
  reward_smoothing_blocks: string;
}
export interface ParamsAminoMsg {
  type: "/agoric.vbank.Params";
  value: ParamsAmino;
}
/** The module governance/configuration parameters. */
export interface ParamsSDKType {
  reward_epoch_duration_blocks: Long;
  per_epoch_reward_fraction: string;
  reward_smoothing_blocks: Long;
}
/** The current state of the module. */
export interface State {
  /**
   * rewardPool is the current balance of rewards in the module account.
   * NOTE: Tracking manually since there is no bank call for getting a
   * module account balance by name.
   */
  rewardPool: Coin[];
  /**
   * reward_block_amount is the amount of reward, if available, to send to the
   * fee collector module on every block.
   */
  rewardBlockAmount: Coin[];
  /** last_sequence is a sequence number for communicating with the VM. */
  lastSequence: Long;
  lastRewardDistributionBlock: Long;
}
export interface StateProtoMsg {
  typeUrl: "/agoric.vbank.State";
  value: Uint8Array;
}
/** The current state of the module. */
export interface StateAmino {
  /**
   * rewardPool is the current balance of rewards in the module account.
   * NOTE: Tracking manually since there is no bank call for getting a
   * module account balance by name.
   */
  reward_pool: CoinAmino[];
  /**
   * reward_block_amount is the amount of reward, if available, to send to the
   * fee collector module on every block.
   */
  reward_block_amount: CoinAmino[];
  /** last_sequence is a sequence number for communicating with the VM. */
  last_sequence: string;
  last_reward_distribution_block: string;
}
export interface StateAminoMsg {
  type: "/agoric.vbank.State";
  value: StateAmino;
}
/** The current state of the module. */
export interface StateSDKType {
  reward_pool: CoinSDKType[];
  reward_block_amount: CoinSDKType[];
  last_sequence: Long;
  last_reward_distribution_block: Long;
}