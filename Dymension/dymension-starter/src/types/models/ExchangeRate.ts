// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type ExchangeRateProps = Omit<ExchangeRate, NonNullable<FunctionPropertyNames<ExchangeRate>>| '_name'>;

export class ExchangeRate implements Entity {

    constructor(
        
            id: string,
        
            blockHeight: bigint,
        
            timestamp: Date,
        
            txHash: string,
        
            contractAddress: string,
        
        
        
        
        
        
        
    ) {
        
            this.id = id;
        
            this.blockHeight = blockHeight;
        
            this.timestamp = timestamp;
        
            this.txHash = txHash;
        
            this.contractAddress = contractAddress;
        
    }


    public id: string;

    public blockHeight: bigint;

    public timestamp: Date;

    public txHash: string;

    public contractAddress: string;

    public priceNotional?: number;

    public priceUSD?: number;

    public longRate?: number;

    public shortRate?: number;

    public contractName?: string;

    public contractVersion?: string;


    get _name(): string {
        return 'ExchangeRate';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save ExchangeRate entity without an ID");
        await store.set('ExchangeRate', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove ExchangeRate entity without an ID");
        await store.remove('ExchangeRate', id.toString());
    }

    static async get(id:string): Promise<ExchangeRate | undefined>{
        assert((id !== null && id !== undefined), "Cannot get ExchangeRate entity without an ID");
        const record = await store.get('ExchangeRate', id.toString());
        if (record){
            return this.create(record as ExchangeRateProps);
        }else{
            return;
        }
    }



    static create(record: ExchangeRateProps): ExchangeRate {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.blockHeight,
        
            record.timestamp,
        
            record.txHash,
        
            record.contractAddress,
        );
        Object.assign(entity,record);
        return entity;
    }
}
