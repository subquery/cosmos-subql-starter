import {messageId} from "../utils";
import {AuthzExecMsg} from "../types";
import {CosmosMessage} from "@subql/types-cosmos";

import {AuthzExec, AuthzExecMessage, Message} from "../../types";
import allModuleTypes from "../../cosmjs/proto";

export async function handleAuthzExec(msg: CosmosMessage<AuthzExecMsg>): Promise<void> {
  logger.info(`[handleAuthzExec] (tx ${msg.tx.hash}): indexing message ${msg.idx + 1} / ${msg.tx.decodedTx.body.messages.length}`);
  logger.debug(`[handleAuthzExec] (msg.msg): ${JSON.stringify(msg.msg, null, 2)}`);

  /* NB: Intentionally NOT checking for tx success status to be consistent with
     the behavior of `handleMessage` (i.e. messages in failed txs will be indexed)
   */

  const authzExecId = messageId(msg);
  const typeUrl = msg.msg.typeUrl;
  const decodedAuthzMsg = msg.msg.decodedMsg;
  const grantee = decodedAuthzMsg.grantee;
  const msgs = decodedAuthzMsg.msgs;

  await Message.create({
    id: authzExecId,
    typeUrl,
    json: JSON.stringify(msg.msg.decodedMsg),
    transactionId: msg.tx.hash,
    blockId: msg.block.block.id,
  }).save();

  await AuthzExec.create({
    id: authzExecId,
    grantee,
    messageId: authzExecId,
    transactionId: msg.tx.hash,
    blockId: msg.block.block.id,
  }).save();

  for (const [i, encodedMsg] of msgs.entries()) {
    for (const [typeUrl, msgType] of allModuleTypes) {
      let decodedMsg: unknown;

      if (typeUrl === encodedMsg.typeUrl) {
        const bytes = new Uint8Array(Object.values(encodedMsg.value));
        decodedMsg = msgType.decode(bytes);

        const subMsgId = `${authzExecId}-${i}`;

        // Create primitive message entity for sub-message
        await Message.create({
          id: subMsgId,
          typeUrl,
          json: JSON.stringify(decodedMsg),
          transactionId: msg.tx.hash,
          blockId: msg.block.block.id,
        }).save();

        /* NB: Create AuthzExecMessage entity to join AuthzExec and Messages
               without requiring a foreign key in Message type.
         */
        await AuthzExecMessage.create({
          id: subMsgId,
          authzExecId,
          messageId: subMsgId,
        }).save();
      }
    }
  }
}
