import { EthereumTransaction } from "@subql/types-ethereum";
import { BigNumber } from "@ethersproject/bignumber";
import { Approval, Transaction } from "../types";
import { TransferLog} from "../types/abi-interfaces/Erc20Abi";

// // Setup types from ABI
type ApproveCallArgs = [string, BigNumber] & {
  guy: string;
  wad: BigNumber;
};

export async function handleLog(
  transferLog: TransferLog
): Promise<void> {
  logger.info("transaction: " + transferLog.transactionHash);
  const transaction = Transaction.create({
    id: transferLog.transactionHash,
    value: transferLog.args.wad.toBigInt(),
    from: transferLog.args.src,
    to: transferLog.args.dst,
    contractAddress: transferLog.address,
  });

  await transaction.save();
}

export async function handleTransaction(
  approveCallTransaction: EthereumTransaction<ApproveCallArgs>
): Promise<void> {
  logger.info("approval: " + approveCallTransaction.hash);
  const approval = Approval.create({
    id: approveCallTransaction.hash,
    owner: approveCallTransaction.from,
    value: approveCallTransaction.args.wad.toBigInt(),
    spender: approveCallTransaction.args.guy,
    contractAddress: approveCallTransaction.to,
  });

  await approval.save();
}
