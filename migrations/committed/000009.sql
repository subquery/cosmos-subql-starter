--! Previous: sha1:ef021224dbd9c54944f24efa19806b596189d9b2
--! Hash: sha1:914d20d8e81f79b1e98e114302e6e48534463c27

CREATE SCHEMA IF NOT EXISTS app;
SET SCHEMA 'app';

ALTER TABLE IF EXISTS ONLY app.almanac_registrations DROP CONSTRAINT IF EXISTS almanac_registrations_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.almanac_registrations DROP CONSTRAINT IF EXISTS almanac_registrations_record_id_fkey;
ALTER TABLE IF EXISTS ONLY app.almanac_registrations DROP CONSTRAINT IF EXISTS almanac_registrations_contract_id_fkey;
ALTER TABLE IF EXISTS ONLY app.almanac_registrations DROP CONSTRAINT IF EXISTS almanac_registrations_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.almanac_registrations DROP CONSTRAINT IF EXISTS almanac_registrations_agent_id_fkey;
ALTER TABLE IF EXISTS ONLY app.almanac_records DROP CONSTRAINT IF EXISTS almanac_records_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.almanac_records DROP CONSTRAINT IF EXISTS almanac_records_block_id_fkey;
DROP INDEX IF EXISTS app.almanac_registrations_transaction_id;
DROP INDEX IF EXISTS app.almanac_registrations_record_id;
DROP INDEX IF EXISTS app.almanac_registrations_expiry_height;
DROP INDEX IF EXISTS app.almanac_registrations_contract_id;
DROP INDEX IF EXISTS app.almanac_registrations_block_id;
DROP INDEX IF EXISTS app.almanac_registrations_agent_id;
DROP INDEX IF EXISTS app.almanac_records_transaction_id;
DROP INDEX IF EXISTS app.almanac_records_service;
DROP INDEX IF EXISTS app.almanac_records_block_id;
ALTER TABLE IF EXISTS ONLY app.almanac_registrations DROP CONSTRAINT IF EXISTS almanac_registrations_pkey;
ALTER TABLE IF EXISTS ONLY app.almanac_records DROP CONSTRAINT IF EXISTS almanac_records_pkey;
ALTER TABLE IF EXISTS ONLY app.agents DROP CONSTRAINT IF EXISTS agents_pkey;
DROP TABLE IF EXISTS app.almanac_registrations;
DROP TABLE IF EXISTS app.almanac_records;
DROP TABLE IF EXISTS app.agents;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: agents; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.agents (
    id text NOT NULL
);


ALTER TABLE app.agents OWNER TO subquery;

--
-- Name: almanac_records; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.almanac_records (
                                     id text NOT NULL,
                                     service jsonb,
                                     transaction_id text NOT NULL,
                                     block_id text NOT NULL
);


ALTER TABLE app.almanac_records OWNER TO subquery;

--
-- Name: almanac_registrations; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.almanac_registrations (
                                           id text NOT NULL,
                                           expiry_height numeric NOT NULL,
                                           agent_id text NOT NULL,
                                           signature text NOT NULL,
                                           sequence integer NOT NULL,
                                           contract_id text NOT NULL,
                                           record_id text NOT NULL,
                                           transaction_id text NOT NULL,
                                           block_id text NOT NULL
);


ALTER TABLE app.almanac_registrations OWNER TO subquery;


--
-- Name: agents agents_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.agents
    ADD CONSTRAINT agents_pkey PRIMARY KEY (id);


--
-- Name: almanac_records almanac_records_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.almanac_records
    ADD CONSTRAINT almanac_records_pkey PRIMARY KEY (id);


--
-- Name: almanac_registrations almanac_registrations_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.almanac_registrations
    ADD CONSTRAINT almanac_registrations_pkey PRIMARY KEY (id);


--
-- Name: almanac_records_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX almanac_records_block_id ON app.almanac_records USING hash (block_id);


--
-- Name: almanac_records_service; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX almanac_records_service ON app.almanac_records USING gin (service);


--
-- Name: almanac_records_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX almanac_records_transaction_id ON app.almanac_records USING hash (transaction_id);


--
-- Name: almanac_registrations_agent_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX almanac_registrations_agent_id ON app.almanac_registrations USING hash (agent_id);


--
-- Name: almanac_registrations_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX almanac_registrations_block_id ON app.almanac_registrations USING hash (block_id);


--
-- Name: almanac_registrations_contract_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX almanac_registrations_contract_id ON app.almanac_registrations USING hash (contract_id);


--
-- Name: almanac_registrations_expiry_height; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX almanac_registrations_expiry_height ON app.almanac_registrations USING btree (expiry_height);


--
-- Name: almanac_registrations_record_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX almanac_registrations_record_id ON app.almanac_registrations USING hash (record_id);


--
-- Name: almanac_registrations_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX almanac_registrations_transaction_id ON app.almanac_registrations USING hash (transaction_id);


--
-- Name: almanac_records almanac_records_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.almanac_records
    ADD CONSTRAINT almanac_records_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: almanac_records almanac_records_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.almanac_records
    ADD CONSTRAINT almanac_records_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: almanac_registrations almanac_registrations_agent_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.almanac_registrations
    ADD CONSTRAINT almanac_registrations_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES app.agents(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CONSTRAINT almanac_registrations_agent_id_fkey ON almanac_registrations; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT almanac_registrations_agent_id_fkey ON app.almanac_registrations IS '@foreignFieldName almanacRegistrations';


--
-- Name: almanac_registrations almanac_registrations_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.almanac_registrations
    ADD CONSTRAINT almanac_registrations_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: almanac_registrations almanac_registrations_contract_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.almanac_registrations
    ADD CONSTRAINT almanac_registrations_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES app.contracts(id) ON UPDATE CASCADE;


--
-- Name: almanac_registrations almanac_registrations_record_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.almanac_registrations
    ADD CONSTRAINT almanac_registrations_record_id_fkey FOREIGN KEY (record_id) REFERENCES app.almanac_records(id) ON UPDATE CASCADE;


--
-- Name: almanac_registrations almanac_registrations_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.almanac_registrations
    ADD CONSTRAINT almanac_registrations_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--


DROP FUNCTION IF EXISTS plv8ify_migrationMicroAgentAlmanacRegistrations();
CREATE OR REPLACE FUNCTION plv8ify_migrationMicroAgentAlmanacRegistrations() RETURNS JSONB AS $plv8ify$
var plv8ify = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // migrations/current.ts
  var current_exports = {};
  __export(current_exports, {
    migrationMicroAgentAlmanacRegistrations: () => migrationMicroAgentAlmanacRegistrations
  });

  // migrations/src/utils.ts
  function getSelectResults(rows) {
    if (rows.length < 1) {
      return null;
    }
    return rows.map((row) => Object.entries(row).map((e) => e[1]));
  }

  // migrations/current.ts
  function registerEventIds(limit, offset) {
    const results = getSelectResults(plv8.execute(`SELECT ev.id
                                        FROM app.events ev
                                                 JOIN app.event_attributes ea ON ev.id = ea.event_id
                                        WHERE ev.type = 'wasm'
                                          AND ea.key = 'action'
                                          AND ea.value = 'register'
                                            LIMIT ${limit}
                                        OFFSET ${offset}`));
    if (results) {
      return results.map((e) => e[0]);
    }
    return null;
  }
  function registerEventData(eventIds) {
    if (eventIds.length == 0) {
      return [];
    }
    const eventIdValues = eventIds.map((e) => `'${e}'`).join(", ");
    return getSelectResults(plv8.execute(`SELECT ev.id, ev.transaction_id, ev.block_id, ea.key, ea.value
                                        FROM app.events ev
                                                 JOIN app.event_attributes ea ON ev.id = ea.event_id
                                        WHERE ev.id in (${eventIdValues})`));
  }
  function insertAgents(agents) {
    const agentIdValues = Object.values(agents).map((id) => `('${id}')`).join(", ");
    const insertAgents2 = `INSERT INTO app.agents (id)
                        VALUES ${agentIdValues}`;
    plv8.execute(insertAgents2);
  }
  function migrationMicroAgentAlmanacRegistrations() {
    plv8.execute("SET SCHEMA 'app'");
    const batchSize = 500;
    for (let i = 0; ; i++) {
      const eventIdsBatch = registerEventIds(batchSize, batchSize * i);
      if (!eventIdsBatch) {
        break;
      }
      const registerEvents = registerEventData(eventIdsBatch);
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
              const unescapedValue = value.replace(new RegExp('\\\\"', "g"), '"');
              const service = JSON.parse(unescapedValue).service;
              if (!service) {
                throw new Error("expected record to contain service key but none found");
              }
              services[eventId] = JSON.stringify(service);
            } catch (error) {
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
      const recordValues = Object.keys(eventIds).map((eventId) => {
        return "(" + [
          eventId,
          services[eventId],
          txIds[eventId],
          blockIds[eventId]
        ].map((e) => `'${e}'`).join(", ") + ")";
      }).join(", ");
      plv8.execute(`INSERT INTO app.almanac_records (id, service, transaction_id, block_id)
                  VALUES ${recordValues}`);
      const registrationValues = Object.keys(eventIds).map((eventId) => {
        return "(" + [
          eventId,
          expiryHeights[eventId],
          signatures[eventId],
          sequences[eventId],
          agents[eventId],
          eventId,
          contracts[eventId],
          txIds[eventId],
          blockIds[eventId]
        ].map((e) => `'${e}'`).join(", ") + ")";
      }).join(", ");
      const insertRegistrations = `INSERT INTO app.almanac_registrations (id, expiry_height, signature, sequence, agent_id, record_id,
                                                            contract_id, transaction_id, block_id)
                                 VALUES ${registrationValues}`;
      plv8.execute(insertRegistrations);
    }
  }
  return __toCommonJS(current_exports);
})();

return plv8ify.migrationMicroAgentAlmanacRegistrations()

$plv8ify$ LANGUAGE plv8 IMMUTABLE STRICT;
SELECT * from plv8ify_migrationMicroAgentAlmanacRegistrations();
