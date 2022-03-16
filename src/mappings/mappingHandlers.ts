import { StarterBlock, StarterTransfer } from "../types";
import { hashToHex } from "@terra-money/terra.js/dist/util";
import { TerraEvent, TerraBlock } from "@subql/types-terra";

export async function handleBlock(block: TerraBlock): Promise<void> {
  const starterBlock = new StarterBlock(hashToHex(block.block.block_id.hash));
  starterBlock.height = block.block.block.header.height;
  await starterBlock.save();
}

export async function handleTransferEvent(event: TerraEvent): Promise<void> {
  const {
    event: {
      transfer: { sender, recipient, amount },
    },
  } = event;

  //logger.info(JSON.stringify(event.eventransfer));

  if (sender && recipient && amount) {
    for (let i = 0; i < sender.length; i++) {
      const starterTransfer = new StarterTransfer(
        hashToHex(event.block.block_id.hash) + "-" + i
      );
      starterTransfer.blockId = hashToHex(event.block.block_id.hash);
      starterTransfer.sender = sender[i];
      starterTransfer.recipient = recipient[i];
      starterTransfer.amount = amount[i];
      await starterTransfer.save();
    }
  }
}
