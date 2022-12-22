// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type TransferEventProps = Omit<TransferEvent, NonNullable<FunctionPropertyNames<TransferEvent>>>;

export class TransferEvent implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockHeight: bigint;

    public txHash: string;

    public recipient: string;

    public sender: string;

    public amount: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save TransferEvent entity without an ID");
        await store.set('TransferEvent', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove TransferEvent entity without an ID");
        await store.remove('TransferEvent', id.toString());
    }

    static async get(id:string): Promise<TransferEvent | undefined>{
        assert((id !== null && id !== undefined), "Cannot get TransferEvent entity without an ID");
        const record = await store.get('TransferEvent', id.toString());
        if (record){
            return this.create(record as TransferEventProps);
        }else{
            return;
        }
    }



    static create(record: TransferEventProps): TransferEvent {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
