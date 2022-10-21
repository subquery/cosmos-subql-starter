import {CosmosEvent, CosmosMessage} from "@subql/types-cosmos";
import {Account} from "../types";

// messageId returns the id of the message passed or
// that of the message which generated the event passed.
export function messageId(msg: CosmosMessage | CosmosEvent): string {
  return `${msg.tx.hash}-${msg.idx}`;
}

export async function checkBalancesAccount(address: string, chainId: string) {
  let accountEntity = await Account.get(address);
  if (typeof (accountEntity) === "undefined") {
    accountEntity = Account.create({id: address, chainId});
    await accountEntity.save();
  }
}
