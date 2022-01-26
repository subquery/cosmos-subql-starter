import {StarterEntity} from "../types";
import { hashToHex } from '@terra-money/terra.js/dist/util';
import { TerraEvent, TerraBlock } from '@subql/types';

export async function handleBlock(block: TerraBlock): Promise<void> {
    let record = new StarterEntity(block.block.block.header.height);
    record.hash = hashToHex(block.block.block_id.hash);
    await record.save();
}

export async function handleEvent(event: TerraEvent): Promise<void> {
    const record = await StarterEntity.get(event.block.block.header.height);
    record.sender = event.event['transfer']['sender'];
    record.recipient = event.event['transfer']['recipient'];
    record.amount = event.event['transfer']['amount'];
    await record.save();
}
