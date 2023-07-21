// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type DelegatorProps = Omit<Delegator, NonNullable<FunctionPropertyNames<Delegator>>| '_name'>;

export class Delegator implements Entity {

    constructor(
        
            id: string,
        
            rewardsList: bigint[],
        
            totalRewards: bigint,
        
    ) {
        
            this.id = id;
        
            this.rewardsList = rewardsList;
        
            this.totalRewards = totalRewards;
        
    }


    public id: string;

    public rewardsList: bigint[];

    public totalRewards: bigint;


    get _name(): string {
        return 'Delegator';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Delegator entity without an ID");
        await store.set('Delegator', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Delegator entity without an ID");
        await store.remove('Delegator', id.toString());
    }

    static async get(id:string): Promise<Delegator | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Delegator entity without an ID");
        const record = await store.get('Delegator', id.toString());
        if (record){
            return this.create(record as DelegatorProps);
        }else{
            return;
        }
    }



    static create(record: DelegatorProps): Delegator {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.rewardsList,
        
            record.totalRewards,
        );
        Object.assign(entity,record);
        return entity;
    }
}
