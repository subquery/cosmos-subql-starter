--! Previous: sha1:1ac102c5a5b3baf595ce66aac2912ad9f1090b49
--! Hash: sha1:9744879ec421a1edd39b9bc53b717a35b00e31cc

CREATE SCHEMA IF NOT EXISTS app;
SET SCHEMA 'app';

ALTER TABLE IF EXISTS ONLY app.event_attributes DROP CONSTRAINT IF EXISTS event_attributes_event_id_fkey;
DROP INDEX IF EXISTS app.event_attributes_event_id;
ALTER TABLE IF EXISTS ONLY app.event_attributes DROP CONSTRAINT IF EXISTS event_attributes_pkey;
DROP TABLE IF EXISTS app.event_attributes;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: event_attributes; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.event_attributes (
                                      id text NOT NULL,
                                      key text NOT NULL,
                                      value text NOT NULL,
                                      event_id text NOT NULL
);


ALTER TABLE app.event_attributes OWNER TO subquery;

--
-- Name: event_attributes event_attributes_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.event_attributes
    ADD CONSTRAINT event_attributes_pkey PRIMARY KEY (id);


--
-- Name: event_attributes_event_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX event_attributes_event_id ON app.event_attributes USING hash (event_id);


--
-- Name: event_attributes event_attributes_event_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.event_attributes
    ADD CONSTRAINT event_attributes_event_id_fkey FOREIGN KEY (event_id) REFERENCES app.events(id) ON UPDATE CASCADE;


--
-- Name: CONSTRAINT event_attributes_event_id_fkey ON event_attributes; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT event_attributes_event_id_fkey ON app.event_attributes IS '@foreignFieldName attributes';


DROP FUNCTION IF EXISTS plv8ify_migrationExpandEventAttributes();
CREATE OR REPLACE FUNCTION plv8ify_migrationExpandEventAttributes() RETURNS JSONB AS $plv8ify$
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
    migrationExpandEventAttributes: () => migrationExpandEventAttributes
  });

  // migrations/src/utils.ts
  function getSelectResults(rows) {
    if (rows.length < 1) {
      return null;
    }
    return rows.map((row) => Object.entries(row).map((e) => e[1]));
  }

  // migrations/current.ts
  function selectEventsBatch(limit, offset) {
    return `SELECT id, attributes FROM events LIMIT ${limit} OFFSET ${offset}`;
  }
  function insertEventAttributes(values) {
    const columns = ["id", "key", "value", "event_id"];
    return `INSERT INTO event_attributes (${columns.join(", ")}) VALUES ${values.join(",\n")}`;
  }
  function migrationExpandEventAttributes() {
    plv8.execute("SET SCHEMA 'app'");
    const batchSize = 2e3;
    for (let batch = 0; ; batch++) {
      const query = selectEventsBatch(batchSize, batchSize * batch);
      const events = getSelectResults(plv8.execute(query));
      if (!events || events.length === 0) {
        break;
      }
      const values = [];
      for (const event of events) {
        const [eventId, attributes] = event;
        for (const [i, attr] of Object.entries(attributes)) {
          const eventAttrValues = [];
          eventAttrValues.push(`'${eventId}-${i}'`);
          eventAttrValues.push(`'${attr.key}'`);
          const unQuotedValue = attr.value.substring(1, attr.value.length - 1);
          eventAttrValues.push(`'${unQuotedValue}'`);
          eventAttrValues.push(`'${eventId}'`);
          values.push(`(${eventAttrValues.join(", ")})`);
        }
      }
      plv8.execute(insertEventAttributes(values));
    }
    plv8.execute("ALTER TABLE events DROP COLUMN attributes");
  }
  return __toCommonJS(current_exports);
})();

return plv8ify.migrationExpandEventAttributes()

$plv8ify$ LANGUAGE plv8 IMMUTABLE STRICT;
SELECT * from plv8ify_migrationExpandEventAttributes();
