import { StarterBlock, StarterTransfer } from "../types";
import { hashToHex } from "@terra-money/terra.js/dist/util";
import { TerraEvent, TerraBlock } from "@subql/types-terra";

export async function handleBlock(block: TerraBlock): Promise<void> {
  const starterBlock = new StarterBlock(hashToHex(block.block.block_id.hash));
  starterBlock.height = block.block.block.header.height;
  await starterBlock.save();
}

export async function handleTransferEvent(event: TerraEvent): Promise<void> {
  const starterTransfer = await StarterTransfer.get(
    event.block.block.header.height
  );
  // logger.info(JSON.stringify(event.event.transfer));
  const {
    event: {
      transfer: { sender, recipient, amount },
    },
  } = event;
  starterTransfer.blockId = hashToHex(event.block.block_id.hash);
  starterTransfer.sender = sender[0];
  starterTransfer.recipient = recipient[0];
  starterTransfer.amount = amount[0];
  await starterTransfer.save();
}
