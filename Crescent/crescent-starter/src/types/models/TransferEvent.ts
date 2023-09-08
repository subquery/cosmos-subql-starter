// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type TransferEventProps = Omit<TransferEvent, NonNullable<FunctionPropertyNames<TransferEvent>>| '_name'>;

export class TransferEvent implements Entity {

    constructor(
        
            id: string,
        
            blockHeight: bigint,
        
            txHash: string,
        
            recipient: string,
        
            sender: string,
        
            amount: string,
        
    ) {
        
            this.id = id;
        
            this.blockHeight = blockHeight;
        
            this.txHash = txHash;
        
            this.recipient = recipient;
        
            this.sender = sender;
        
            this.amount = amount;
        
    }


    public id: string;

    public blockHeight: bigint;

    public txHash: string;

    public recipient: string;

    public sender: string;

    public amount: string;


    get _name(): string {
        return 'TransferEvent';
    }

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
        let entity = new this(
        
            record.id,
        
            record.blockHeight,
        
            record.txHash,
        
            record.recipient,
        
            record.sender,
        
            record.amount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
