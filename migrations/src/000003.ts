import {getSelectResults} from "./src/utils";

interface Attribute {
  key: string;
  value: string;
}

function selectEventsBatch (limit: number, offset: number) {
  return `SELECT id, attributes FROM events LIMIT ${limit} OFFSET ${offset}`;
}

function insertEventAttributes(values) {
  const columns = ["id", "key", "value", "event_id"];
  return `INSERT INTO event_attributes (${columns.join(", ")}) VALUES ${values.join(",\n")}`;
}

export function migrationExpandEventAttributes() {
  // @ts-ignore
  plv8.execute("SET SCHEMA 'app'");

  const batchSize = 2000;

  // NB: batch operations to reduce memory footprint
  for (let batch = 0;; batch++) {
    const query = selectEventsBatch(batchSize, batchSize * batch);
    // @ts-ignore
    const events = getSelectResults(plv8.execute(query));

    if (!events || events.length === 0) {
      // NB: no more events
      break;
    }

    // NB: process batch; `eventValues` order MUST match `columns`
    const values = [];
    for (const event of events) {
      const [eventId, attributes] = event;
      for (const [i, attr] of Object.entries(attributes as Attribute[])) {
        const eventAttrValues = [];
        // NB: must single quote values for proper SQL interpolation.
        // attr.value already contains escaped quotes from
        // JSON stringification in event handler.
        eventAttrValues.push(`'${eventId}-${i}'`);
        // TODO: check attr value "sanitization" func in event handler
        eventAttrValues.push(`'${attr.key}'`);
        const unQuotedValue = attr.value.substring(1, attr.value.length - 1);
        eventAttrValues.push(`'${unQuotedValue}'`);
        eventAttrValues.push(`'${eventId}'`);
        values.push(`(${eventAttrValues.join(", ")})`);
      }
    }
    // @ts-ignore
    plv8.execute(insertEventAttributes(values));
  }

  // NB: remove now unused attributes column
  // @ts-ignore
  plv8.execute("ALTER TABLE events DROP COLUMN attributes");
}
