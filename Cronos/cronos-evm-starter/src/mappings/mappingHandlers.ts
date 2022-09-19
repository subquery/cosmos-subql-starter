import { Approval, Transaction } from "../types";
import {
  EthermintEvmEvent,
  EthermintEvmCall,
} from "@subql/ethermint-evm-processor";
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  from: string;
  to: string;
  value: BigNumber;
};

type ApproveCallArgs = [string, BigNumber] & {
  _spender: string;
  _value: BigNumber;
};

export async function handleEthermintEvmEvent(
  event: EthermintEvmEvent<TransferEventArgs>
): Promise<void> {
  const transaction = new Transaction(event.transactionHash);

  transaction.value = event.args[2].toBigInt();
  transaction.from = event.args[0];
  transaction.to = event.args[1];
  transaction.contractAddress = event.address;

  await transaction.save();
}

export async function handleEthermintEvmCall(
  event: EthermintEvmCall<ApproveCallArgs>
): Promise<void> {
  const approval = new Approval(event.hash);
  approval.owner = event.from;
  approval.value = event.args[1].toBigInt();
  approval.spender = event.args[0];
  approval.contractAddress = event.to;

  await approval.save();
}
