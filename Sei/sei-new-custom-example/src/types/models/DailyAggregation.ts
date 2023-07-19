// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type DailyAggregationProps = Omit<DailyAggregation, NonNullable<FunctionPropertyNames<DailyAggregation>>| '_name'>;

export class DailyAggregation implements Entity {

    constructor(
        
            id: string,
        
            bullBets: bigint,
        
            bearBets: bigint,
        
            bullBetSize: bigint,
        
            bearBetSize: bigint,
        
            totalSize: bigint,
        
    ) {
        
            this.id = id;
        
            this.bullBets = bullBets;
        
            this.bearBets = bearBets;
        
            this.bullBetSize = bullBetSize;
        
            this.bearBetSize = bearBetSize;
        
            this.totalSize = totalSize;
        
    }


    public id: string;

    public bullBets: bigint;

    public bearBets: bigint;

    public bullBetSize: bigint;

    public bearBetSize: bigint;

    public totalSize: bigint;


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
        
            record.bullBets,
        
            record.bearBets,
        
            record.bullBetSize,
        
            record.bearBetSize,
        
            record.totalSize,
        );
        Object.assign(entity,record);
        return entity;
    }
}
