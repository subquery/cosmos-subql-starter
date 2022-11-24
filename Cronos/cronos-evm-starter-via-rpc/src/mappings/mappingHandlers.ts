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
  logger.info(JSON.stringify(event.args.value));
  const transaction = Transaction.create({
    id: event.transactionHash,
    value: event.args.value.toBigInt(),
    from: event.args.from,
    to: event.args.to,
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
    value: call.args._value.toBigInt(),
    spender: call.args._spender,
    contractAddress: call.to,
  });

  await approval.save();
}
