// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type DailyAggregationProps = Omit<DailyAggregation, NonNullable<FunctionPropertyNames<DailyAggregation>>| '_name'>;

export class DailyAggregation implements Entity {

    constructor(
        
            id: string,
        
            openPriceUSD: number,
        
            closePriceUSD: number,
        
            highPriceUSD: number,
        
            lowPriceUSD: number,
        
    ) {
        
            this.id = id;
        
            this.openPriceUSD = openPriceUSD;
        
            this.closePriceUSD = closePriceUSD;
        
            this.highPriceUSD = highPriceUSD;
        
            this.lowPriceUSD = lowPriceUSD;
        
    }


    public id: string;

    public openPriceUSD: number;

    public closePriceUSD: number;

    public highPriceUSD: number;

    public lowPriceUSD: number;


    get _name(): string {
        return 'DailyAggregation';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DailyAggregation entity without an ID");
        await store.set('DailyAggregation', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DailyAggregation entity without an ID");
        await store.remove('DailyAggregation', id.toString());
    }

    static async get(id:string): Promise<DailyAggregation | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DailyAggregation entity without an ID");
        const record = await store.get('DailyAggregation', id.toString());
        if (record){
            return this.create(record as DailyAggregationProps);
        }else{
            return;
        }
    }



    static create(record: DailyAggregationProps): DailyAggregation {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.openPriceUSD,
        
            record.closePriceUSD,
        
            record.highPriceUSD,
        
            record.lowPriceUSD,
        );
        Object.assign(entity,record);
        return entity;
    }
}
