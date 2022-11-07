// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { EthereumTransaction, EthereumLog } from "@subql/types-ethereum";
import { BigNumber } from "@ethersproject/bignumber";

import { Approval, Transaction } from "../types";

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

export async function handleLog(
  event: EthereumLog<TransferEventArgs>
): Promise<void> {
  logger.info("transaction");
  const transaction = Transaction.create({
    id: event.transactionHash,
    value: event.args.wad.toBigInt(),
    from: event.args.src,
    to: event.args.dst,
    contractAddress: event.address,
  });

  await transaction.save();
}

export async function handleTransaction(
  event: EthereumTransaction<ApproveCallArgs>
): Promise<void> {
  logger.info("approval");
  const approval = Approval.create({
    id: event.hash,
    owner: event.from,
    value: event.args.wad.toBigInt(),
    spender: event.args.guy,
    contractAddress: event.to,
  });

  await approval.save();
}
