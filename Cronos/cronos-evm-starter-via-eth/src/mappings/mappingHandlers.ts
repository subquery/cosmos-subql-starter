import { EthereumTransaction, EthereumLog } from "@subql/types-ethereum";
import { BigNumber } from "@ethersproject/bignumber";
import { Approval, Transaction } from "../types";

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

export async function handleLog(
  transferLog: EthereumLog<TransferEventArgs>
): Promise<void> {
  // logger.info("transaction: " + transferLog.transactionHash);
  const transaction = Transaction.create({
    id: transferLog.transactionHash,
    value: transferLog.args.value.toBigInt(),
    from: transferLog.args.from,
    to: transferLog.args.to,
    contractAddress: transferLog.address,
  });

  await transaction.save();
}

export async function handleTransaction(
  approveCallTransaction: EthereumTransaction<ApproveCallArgs>
): Promise<void> {
  // logger.info("approval: " + approveCallTransaction.hash);
  const approval = Approval.create({
    id: approveCallTransaction.hash,
    owner: approveCallTransaction.from,
    value: approveCallTransaction.args._value.toBigInt(),
    spender: approveCallTransaction.args._spender,
    contractAddress: approveCallTransaction.to,
  });

  await approval.save();
}
