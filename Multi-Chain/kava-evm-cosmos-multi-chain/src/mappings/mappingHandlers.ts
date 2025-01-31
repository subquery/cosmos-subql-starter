import { EVMTransfers, CosmosTransfers, Address } from "../types";
import { CosmosEvent } from "@subql/types-cosmos";
import { ethers } from "ethers";
import bech32 from "bech32";
import assert from "assert";
import {
  ApproveTransaction,
  TransferLog,
} from "../types/abi-interfaces/Erc20Abi";

function kavaToEthAddress(kavaAddress: string) {
  return ethers.utils.getAddress(
    ethers.utils.hexlify(bech32.fromWords(bech32.decode(kavaAddress).words)),
  );
}

function ethToKavaAddress(ethereumAddress: string) {
  return bech32.encode(
    "kava",
    bech32.toWords(
      ethers.utils.arrayify(ethers.utils.getAddress(ethereumAddress)),
    ),
  );
}

async function checkGetUserAddress(
  cosmosAddress: string,
  evmAddress: string,
): Promise<Address> {
  let addressId = `${cosmosAddress}-${evmAddress}`;
  let userRecord = await Address.get(addressId);
  if (!userRecord) {
    userRecord = Address.create({
      id: addressId,
      cosmosAddress: cosmosAddress,
      evmAddress: evmAddress,
    });
    await userRecord.save();
  }
  return userRecord;
}

export async function handleEVMLog(transferLog: TransferLog): Promise<void> {
  logger.info("transaction: " + transferLog.transactionHash);
  let from = transferLog.transaction.from.toString();
  let to = transferLog.transaction.to.toString();
  let contractAddress = transferLog.address;
  assert(transferLog.args, "Expected args to exist");
  const transaction = EVMTransfers.create({
    id: transferLog.transactionHash,
    value: transferLog.args.value.toBigInt(),
    fromId: (
      await checkGetUserAddress(ethToKavaAddress(from), from)
    ).id.toString(),
    toId: (await checkGetUserAddress(ethToKavaAddress(to), to)).id.toString(),
    contractAddressId: (
      await checkGetUserAddress(
        ethToKavaAddress(contractAddress),
        contractAddress,
      )
    ).id.toString(),
  });

  await transaction.save();
}

export async function handleCosmosEvent(event: CosmosEvent): Promise<void> {
  logger.info(`New transfer event at block ${event.block.block.header.height}`);
  let from = event.msg.msg.decodedMsg.fromAddress;
  let to = event.msg.msg.decodedMsg.toAddress;
  const newTransfers = CosmosTransfers.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    fromAddressId: (
      await checkGetUserAddress(from, kavaToEthAddress(from))
    ).id.toString(),
    toAddressId: (
      await checkGetUserAddress(to, kavaToEthAddress(to))
    ).id.toString(),
    amount: event.msg.msg.decodedMsg.amount[0].amount,
    denomination: event.msg.msg.decodedMsg.amount[0].denom,
  });

  await newTransfers.save();
}
