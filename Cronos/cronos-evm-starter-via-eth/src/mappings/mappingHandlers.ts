// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
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
  event: EthereumLog<TransferEventArgs>
): Promise<void> {
  logger.info("transaction");
  const transaction = Transaction.create({
    id: event.transactionHash,
    value: event.args.value.toBigInt(),
    from: event.args.from,
    to: event.args.to,
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
    value: event.args._value.toBigInt(),
    spender: event.args._spender,
    contractAddress: event.to,
  });

  await approval.save();
}
