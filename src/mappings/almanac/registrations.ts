import {
  attemptHandling,
  messageId,
  parseAttributes,
  unprocessedEventHandler,
  WasmdEventAttributesI
} from "../utils";
import {CosmosEvent} from "@subql/types-cosmos";
import {Agent, AlmanacRecord, AlmanacRegistration, Contract} from "../../types";

export async function handleAlmanacRegistration(event: CosmosEvent): Promise<void> {
  await attemptHandling(event, _handleAlmanacRegistration, unprocessedEventHandler);
}

export interface RegisterAttributes extends WasmdEventAttributesI {
  expiry_height?: string,
  sequence?: number;
  signature?: string;
  agent_address?: string;
  record?: string,
}

async function _handleAlmanacRegistration(event: CosmosEvent): Promise<void> {
  const id = messageId(event);
  logger.info(`[handleAlmanacRegistration] (tx ${event.tx.hash}): indexing AlmanacRegistration ${id}`);
  logger.debug(`[handleAlmanacRegistration] (event.log.log): ${JSON.stringify(event.log.log, null, 2)}`);

  /* NB: signature verification is handled by the almanac contract!
   *  This handler assumes that the contract will only emit events
   *  with valid signatures corresponding to the agent address.
   */

  const {
    _contract_address,
    agent_address,
    expiry_height,
    sequence,
    signature,
    record: recordStr,
  } = parseAttributes<RegisterAttributes>(event.event.attributes);

  if (!agent_address) {
    logger.warn("[handleAlmanacRegistration]: missing address");
    return;
  }

  if (!signature) {
    logger.warn("[handleAlmanacRegistration]: missing signature");
    return;
  }

  if (!sequence) {
    logger.warn("[handleAlmanacRegistration]: missing sequence");
    return;
  }

  if (!expiry_height) {
    logger.warn("[handleAlmanacRegistration]: missing expiry_height");
    return;
  }

  if (!recordStr) {
    logger.warn("[handleAlmanacRegistration]: missing record");
    return;
  }

  const record = JSON.parse(recordStr);
  if (!record || !record.service) {
    logger.warn("[handleAlmanacRegistration]: missing record service");
    return;
  }

  // NB: ensure agent exists
  const agent = await Agent.get(agent_address);
  if (!agent) {
    await Agent.create({
      id: agent_address,
    }).save();
  }

  // NB: ensure contract exists
  const contract = await Contract.get(_contract_address);
  if (!contract) {
    logger.warn(`[handleAlmanacRegistration]: unable to find contract with address: ${_contract_address}`);
    return;
  }

  const recordEntity = AlmanacRecord.create({
    id,
    service: record.service,
    // eventId: id,
    transactionId: event.tx.hash,
    blockId: event.block.block.id,
  });
  await recordEntity.save();

  const registrationEntity = AlmanacRegistration.create({
    id,
    expiryHeight: BigInt(expiry_height),
    signature,
    sequence,
    agentId: agent_address,
    recordId: id,
    contractId: _contract_address,
    // eventId: id,
    transactionId: event.tx.hash,
    blockId: event.block.block.id,
  });
  await registrationEntity.save();
}
