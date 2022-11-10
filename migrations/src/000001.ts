/*
 * Migration: add authz support
 * (see: https://github.com/fetchai/ledger-subquery/issues/82)
 *
 * This migration requires modifying the plv8 function source in the SQL output of plv8ify.
 * Add the following after the `var require_buffer` definition:
 * ```
 * var global = {Buffer: require_buffer()};
 * ```
 */

import Buffer from "buffer";
import allModuleTypes from "../src/cosmjs/proto";
import {getSelectResults} from "./src/utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ = Buffer;

export interface EncodedMessage {
  typeUrl: string;
  value: Uint8Array;
}

interface AuthzMessage {
  grantee: string;
  msgs: EncodedMessage[];
}

function decode(msg: EncodedMessage) {
  for (const [typeUrl, msgType] of allModuleTypes) {
    if (typeUrl === msg.typeUrl) {
      const bytes = new Uint8Array(Object.values(msg.value));
      return msgType.decode(bytes);
    }
  }
  throw new Error("message type_url not found in protobuf type registry");
}

export function migrationAddAuthzSupport() {
  // @ts-ignore
  plv8.execute("SET SCHEMA 'app'");
  const authzExecSelect = "SELECT (m.id, m.type_url, json, m.transaction_id, m.block_id, t.id) FROM app.messages m JOIN app.transactions t ON m.transaction_id = t.id WHERE m.type_url = '/cosmos.authz.v1beta1.MsgExec'";

  // @ts-ignore
  const messagesSelectResults = getSelectResults(plv8.execute(authzExecSelect));
  if (messagesSelectResults === null) {
    return;
  }

  // @ts-ignore
  for (const [id, type_url, json, transaction_id, block_id] of messagesSelectResults) {
    const {grantee, msgs}: AuthzMessage = JSON.parse(json);

    // @ts-ignore
    plv8.execute("INSERT INTO app.authz_execs (id, grantee, message_id, transaction_id, block_id) VALUES ($1, $2, $3, $4, $5)",
      [id, grantee, id, transaction_id, block_id]);

    for (const [i, subMsg] of Object.entries(msgs)) {
      const subMsgId = `${id}-${i}`;
      const decodedMsg = decode(subMsg);

      // @ts-ignore
      plv8.execute("INSERT INTO app.messages (id, type_url, json, transaction_id, block_id) VALUES ($1, $2, $3, $4, $5)",
        [subMsgId, type_url, JSON.stringify(decodedMsg), transaction_id, block_id]);

      // @ts-ignore
      plv8.execute("INSERT INTO app.authz_exec_messages (id, authz_exec_id, message_id) VALUES ($1, $2, $3)",
        [subMsgId, id, subMsgId]);
    }
  }
}
