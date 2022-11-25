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
  logger.info(JSON.stringify(event.args));
  const transaction = Transaction.create({
    id: event.transactionHash,
    value: (event.args[2]).toBigInt(),
    from: event.args[0],
    to: event.args[1],
    contractAddress: event.address,
  });

  await transaction.save();
}

export async function handleEthermintEvmCall(
  call: EthermintEvmCall<ApproveCallArgs>
): Promise<void> {
  const approval = Approval.create({
    id: call.hash,
    owner: call.from,
    value: call.args[1].toBigInt(),
    spender: call.args[0],
    contractAddress: call.to,
  });

  await approval.save();
}
