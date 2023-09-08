import { Approval, Transaction } from "../types";
import {ApproveTransaction, TransferLog} from "../types/abi-interfaces/Erc20Abi";

export async function handleLog(
  transferLog: TransferLog
): Promise<void> {
  logger.info("transaction: " + transferLog.transactionHash);
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
  approveCallTransaction: ApproveTransaction
): Promise<void> {
  logger.info("approval: " + approveCallTransaction.hash);
  const approval = Approval.create({
    id: approveCallTransaction.hash,
    owner: approveCallTransaction.from,
    value: BigInt((await approveCallTransaction.args[1]).toString()),
    spender: (await approveCallTransaction.args[0]).toString(),
    contractAddress: approveCallTransaction.to,
  });

  await approval.save();
}
