import { Transfers, Approval, Transaction } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";
import assert from "assert";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";

export async function handleEVMLog(transferLog: TransferLog): Promise<void> {
  logger.info("transaction: " + transferLog.transactionHash);
  assert(transferLog.args, "Expected args to exist");
  const transaction = Transaction.create({
    id: transferLog.transactionHash,
    value: transferLog.args.value.toBigInt(),
    from: transferLog.args.from,
    to: transferLog.args.to,
    contractAddress: transferLog.address,
  });

  await transaction.save();
}

export async function handleEVMTransaction(
  approveCallTransaction: ApproveTransaction
): Promise<void> {
  logger.info("approval: " + approveCallTransaction.hash);
  assert(approveCallTransaction.args, "Expected args to exist");
  const approval = Approval.create({
    id: approveCallTransaction.hash,
    owner: approveCallTransaction.from,
    value: BigInt((await approveCallTransaction.args[1]).toString()),
    spender: (await approveCallTransaction.args[0]).toString(),
    contractAddress: approveCallTransaction.to,
  });

  await approval.save();
}

export async function handleCosmosEvent(event: CosmosEvent): Promise<void> {
  logger.info(`New transfer event at block ${event.block.block.header.height}`);

  const newTransfers = Transfers.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    fromAddress: event.msg.msg.decodedMsg.fromAddress,
    toAddress: event.msg.msg.decodedMsg.toAddress,
    amount: event.msg.msg.decodedMsg.amount[0].amount,
    denomination: event.msg.msg.decodedMsg.amount[0].denom,
  });

  await newTransfers.save();
}
