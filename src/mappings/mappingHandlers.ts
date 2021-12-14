import {StarterEntity} from "../types";
//import {Balance} from "@polkadot/types/interfaces";
import { Block, BlockID, BlockInfo, EventsByType, hashToHex } from '@terra-money/terra.js';

export async function handleBlock(block: BlockInfo): Promise<void> {
    //Create a new starterEntity with ID using block hash
    //throw new Error('here');
    let record = new StarterEntity(hashToHex(block.block_id.hash));
    //Record block number
    record.height = +block.block.header.height;
    await record.save();
}

export async function handleEvent(event: EventsByType, block_id: BlockID): Promise<void> {
    if('transfer' in event){
        const record = await StarterEntity.get(hashToHex(block_id["hash"]));
        record.sender = event['transfer']['sender'];
        record.recipient = event['transfer']['recipient'];
        record.amount = event['transfer']['amount'];
        await record.save();
    }
}


