import { Approval, Transaction } from "../types";
import {
  EthermintEvmEvent,
  EthermintEvmCall,
} from "@subql/ethermint-evm-processor";
import { BigNumber } from "ethers";

// Setup types from ABI
type TransferEventArgs = [string, string, BigNumber] & {
  src: string;
  dst: string;
  wad: BigNumber;
};

type ApproveCallArgs = [string, BigNumber] & {
  guy: string;
  wad: BigNumber;
};

export async function handleEthermintEvmEvent(
  event: EthermintEvmEvent<TransferEventArgs>
): Promise<void> {
  logger.info("transaction: " + event.transactionHash);
  const transaction = Transaction.create({
    id: event.transactionHash,
    value: event.args.wad.toBigInt(),
    from: event.args.src,
    to: event.args.dst,
    contractAddress: event.address,
  });

  await transaction.save();
}

export async function handleEthermintEvmCall(
  call: EthermintEvmCall<ApproveCallArgs>
): Promise<void> {
  logger.info("approval: " + call.hash);
  const approval = Approval.create({
    id: call.hash,
    owner: call.from,
    value: call.args.wad.toBigInt(),
    spender: call.args.guy,
    contractAddress: call.to,
  });

  await approval.save();
}
