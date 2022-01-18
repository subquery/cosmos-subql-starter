import {StarterEntity} from "../types";
import { Block, BlockID, BlockInfo, EventsByType, hashToHex } from '@terra-money/terra.js';

export async function handleBlock(block: BlockInfo): Promise<void> {
    let record = new StarterEntity(block.block.header.height);
    record.hash = hashToHex(block.block_id.hash);
    await record.save();
}

export async function handleEvent(event: EventsByType, block: BlockInfo): Promise<void> {
    const record = await StarterEntity.get(block.block.header.height);
    record.sender = event['transfer']['sender'];
    record.recipient = event['transfer']['recipient'];
    record.amount = event['transfer']['amount'];
    await record.save();
}
