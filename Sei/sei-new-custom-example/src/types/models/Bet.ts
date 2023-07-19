// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type BetProps = Omit<Bet, NonNullable<FunctionPropertyNames<Bet>>| '_name'>;

export class Bet implements Entity {

    constructor(
        
            id: string,
        
            blockHeight: bigint,
        
            timestamp: Date,
        
            betType: string,
        
            bettorAddress: string,
        
            betSize: bigint,
        
    ) {
        
            this.id = id;
        
            this.blockHeight = blockHeight;
        
            this.timestamp = timestamp;
        
            this.betType = betType;
        
            this.bettorAddress = bettorAddress;
        
            this.betSize = betSize;
        
    }


    public id: string;

    public blockHeight: bigint;

    public timestamp: Date;

    public betType: string;

    public bettorAddress: string;

    public betSize: bigint;


    get _name(): string {
        return 'Bet';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Bet entity without an ID");
        await store.set('Bet', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Bet entity without an ID");
        await store.remove('Bet', id.toString());
    }

    static async get(id:string): Promise<Bet | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Bet entity without an ID");
        const record = await store.get('Bet', id.toString());
        if (record){
            return this.create(record as BetProps);
        }else{
            return;
        }
    }



    static create(record: BetProps): Bet {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.blockHeight,
        
            record.timestamp,
        
            record.betType,
        
            record.bettorAddress,
        
            record.betSize,
        );
        Object.assign(entity,record);
        return entity;
    }
}
