import { CosmosEvent } from "@subql/types-cosmos";
import { User, CosmosToOsmosisBridge } from "../types";

interface EssentialValues {
  sender?: string;
  amount?: number;
  receiver?: string;
  sequence?: string;
}

async function checkGetUser(user: string): Promise<User> {
  let userRecord = await User.get(user.toLowerCase());
  if (!userRecord) {
    userRecord = User.create({
      id: user.toLowerCase(),
    });
    await userRecord.save();
  }
  return userRecord;
}

async function getEssensialValues(
  event: CosmosEvent
): Promise<EssentialValues> {
  let sender;
  let amount;
  let receiver;
  let sequence;
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "packet_data":
        sender = JSON.parse(attr.value)["sender"];
        receiver = JSON.parse(attr.value)["receiver"];
        amount = JSON.parse(attr.value)["amount"];
        break;
      case "packet_sequence":
        sequence = attr.value;
        break;
      default:
        break;
    }
  }
  return { sender, amount, receiver, sequence };
}

async function populateValuesFromSource(
  sender: string,
  amount: string,
  receiver: string,
  sequence: string,
  event: CosmosEvent
) {
  let bridgeTransactionRecord = await CosmosToOsmosisBridge.get(sequence);
  if (!bridgeTransactionRecord) {
    bridgeTransactionRecord = CosmosToOsmosisBridge.create({
      id: sequence,
      senderId: (await checkGetUser(sender)).id,
      receiverId: (await checkGetUser(receiver)).id,
      sourceChain: event.block.header.chainId,
      sourceChainTransaction: event.tx.hash.toString(),
      amount: BigInt(amount),
    });
  } else {
    bridgeTransactionRecord.sourceChain = event.block.header.chainId;
    bridgeTransactionRecord.sourceChainTransaction = event.tx.hash.toString();
  }
  await bridgeTransactionRecord.save();
}

async function populateValuesFromDestination(
  sender: string,
  amount: string,
  receiver: string,
  sequence: string,
  event: CosmosEvent
) {
  let bridgeTransactionRecord = await CosmosToOsmosisBridge.get(sequence);
  if (!bridgeTransactionRecord) {
    bridgeTransactionRecord = CosmosToOsmosisBridge.create({
      id: sequence,
      senderId: (await checkGetUser(sender)).id,
      receiverId: (await checkGetUser(receiver)).id,
      destinationChain: event.block.header.chainId,
      destinationChainTransaction: event.tx.hash.toString(),
      amount: BigInt(amount),
    });
  } else {
    bridgeTransactionRecord.destinationChain = event.block.header.chainId;
    bridgeTransactionRecord.destinationChainTransaction =
      event.tx.hash.toString();
  }
  await bridgeTransactionRecord.save();
}

export async function handleOsmosisReceiveEvent(
  event: CosmosEvent
): Promise<void> {
  logger.info(
    `Handling an incoming transfer event on Osmosis from ${event.tx.hash.toString()}`
  );

  const { sender, amount, receiver, sequence } = await getEssensialValues(
    event
  );
  logger.info(sender);
  logger.info(sequence);
  logger.info(receiver);
  logger.info(amount);
  if (sequence && sender && receiver && amount) {
    populateValuesFromDestination(
      sender,
      amount.toString(),
      receiver,
      sequence,
      event
    );
  }
}

export async function handleCosmosHubReceiveEvent(
  event: CosmosEvent
): Promise<void> {
  logger.info(
    `Handling an incoming transfer event on Cosmos Hub from ${event.tx.hash.toString()}`
  );

  const { sender, amount, receiver, sequence } = await getEssensialValues(
    event
  );
  if (sequence && sender && receiver && amount) {
    populateValuesFromDestination(
      sender,
      amount.toString(),
      receiver,
      sequence,
      event
    );
  }
}

export async function handleCosmosHubSendEvent(
  event: CosmosEvent
): Promise<void> {
  logger.info(
    `Handling an outgoing transfer event on Cosmos Hub from ${event.tx.hash.toString()}`
  );

  const { sender, amount, receiver, sequence } = await getEssensialValues(
    event
  );

  if (sequence && sender && receiver && amount) {
    populateValuesFromSource(
      sender,
      amount.toString(),
      receiver,
      sequence,
      event
    );
  }
}

export async function handleOsmosisSendEvent(
  event: CosmosEvent
): Promise<void> {
  logger.info(
    `Handling an outgoing transfer event on Osmosis from ${event.tx.hash.toString()}`
  );

  const { sender, amount, receiver, sequence } = await getEssensialValues(
    event
  );

  if (sequence && sender && receiver && amount) {
    populateValuesFromSource(
      sender,
      amount.toString(),
      receiver,
      sequence,
      event
    );
  }
}
