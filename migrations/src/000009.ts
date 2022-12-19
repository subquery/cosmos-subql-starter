import {getSelectResults} from "./src/utils";

function registerEventIds(limit: number, offset: number): string[] {
  // NB: collect all contract execution event IDs with related "register" action attribute.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const results = getSelectResults(plv8.execute(`SELECT ev.id
                                        FROM app.events ev
                                                 JOIN app.event_attributes ea ON ev.id = ea.event_id
                                        WHERE ev.type = 'wasm'
                                          AND ea.key = 'action'
                                          AND ea.value = 'register'
                                            LIMIT ${limit}
                                        OFFSET ${offset}`));
  if (results) {
    return results.map(e => e[0]);
  }
  return null;
}

function registerEventData(eventIds: string[]): string[][] {
  if (eventIds.length == 0) {
    return [];
  }

  const eventIdValues = eventIds.map(e => `'${e}'`).join(", ");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return getSelectResults(plv8.execute(`SELECT ev.id, ev.transaction_id, ev.block_id, ea.key, ea.value
                                        FROM app.events ev
                                                 JOIN app.event_attributes ea ON ev.id = ea.event_id
                                        WHERE ev.id in (${eventIdValues})`));
}

function insertAgents(agents: Record<string, string>) {
  // NB: bulk insert agents
  const agentIdValues = Object.values(agents).map(id => `('${id}')`).join(", ");
  const insertAgents = `INSERT INTO app.agents (id)
                        VALUES ${agentIdValues}`;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  plv8.execute(insertAgents);
}

export function migrationMicroAgentAlmanacRegistrations() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  plv8.execute("SET SCHEMA 'app'");

  const batchSize = 500;
  for (let i = 0; ; i++) {
    const eventIdsBatch = registerEventIds(batchSize, batchSize * i);
    if (!eventIdsBatch) {
      // NB: no more register events to process.
      break;
    }

    const registerEvents = registerEventData(eventIdsBatch);

    // NB: organize register event data
    const eventIds = {};
    const agents = {};
    const services = {};
    const expiryHeights = {};
    const signatures = {};
    const sequences = {};
    const contracts = {};
    const txIds = {};
    const blockIds = {};
    for (const record of registerEvents) {
      if (record.length < 5) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        plv8.elog(WARNING, `unable to migrate registration event; event ID: ${record[0]}`);
        continue;
      }

      const [eventId, txId, blockId, key, value] = record;
      eventIds[eventId] = null;

      if (!txIds[eventId]) {
        txIds[eventId] = txId;
      }

      if (!blockIds[eventId]) {
        blockIds[eventId] = blockId;
      }

      switch (key) {
      case "_contract_address":
        contracts[eventId] = value;
        break;
      case "agent_address":
        agents[eventId] = value;
        break;
      case "record":
        try {
          // NB: replaces all instances of \" with ".
          const unescapedValue = value.replace(new RegExp("\\\\\"", "g"), "\"");
          const service = JSON.parse(unescapedValue).service;
          if (!service) {
            throw new Error("expected record to contain service key but none found");
          }

          services[eventId] = JSON.stringify(service);
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          plv8.elog(WARNING, `unable to parse expected JSON value "${value}": ${error.toString()}`);
          continue;
        }
        break;
      case "signature":
        signatures[eventId] = value;
        break;
      case "sequence":
        sequences[eventId] = value;
        break;
      case "expiry_height":
        expiryHeights[eventId] = value;
        break;
      }
    }

    insertAgents(agents);

    // NB: bulk insert records
    const recordValues = Object.keys(eventIds).map(eventId => {
      return "(" + [
        eventId,
        services[eventId],
        txIds[eventId],
        blockIds[eventId],
      ].map(e => `'${e}'`).join(", ") + ")";
    }).join(", ");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    plv8.execute(`INSERT INTO app.almanac_records (id, service, transaction_id, block_id)
                  VALUES ${recordValues}`);

    // NB: bulk insert registrations
    const registrationValues = Object.keys(eventIds).map(eventId => {
      return "(" + [
        eventId,
        expiryHeights[eventId],
        signatures[eventId],
        sequences[eventId],
        agents[eventId],
        eventId,
        contracts[eventId],
        txIds[eventId],
        blockIds[eventId],
      ].map(e => `'${e}'`).join(", ") + ")";
    }).join(", ");

    const insertRegistrations = `INSERT INTO app.almanac_registrations (id, expiry_height, signature, sequence, agent_id, record_id,
                                                            contract_id, transaction_id, block_id)
                                 VALUES ${registrationValues}`;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    plv8.execute(insertRegistrations);
  }
}
