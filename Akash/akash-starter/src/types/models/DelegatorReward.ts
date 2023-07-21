// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type DelegatorRewardProps = Omit<DelegatorReward, NonNullable<FunctionPropertyNames<DelegatorReward>>| '_name'>;

export class DelegatorReward implements Entity {

    constructor(
        
            id: string,
        
        
        
        
        
            rewardAmount: string,
        
        
        
    ) {
        
            this.id = id;
        
            this.rewardAmount = rewardAmount;
        
    }


    public id: string;

    public blockHeight?: bigint;

    public txHash?: string;

    public feeDenomination?: string;

    public feeAmount?: string;

    public rewardAmount: string;

    public delegatorAddress?: string;

    public validatorAddress?: string;


    get _name(): string {
        return 'DelegatorReward';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save DelegatorReward entity without an ID");
        await store.set('DelegatorReward', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove DelegatorReward entity without an ID");
        await store.remove('DelegatorReward', id.toString());
    }

    static async get(id:string): Promise<DelegatorReward | undefined>{
        assert((id !== null && id !== undefined), "Cannot get DelegatorReward entity without an ID");
        const record = await store.get('DelegatorReward', id.toString());
        if (record){
            return this.create(record as DelegatorRewardProps);
        }else{
            return;
        }
    }



    static create(record: DelegatorRewardProps): DelegatorReward {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.rewardAmount,
        );
        Object.assign(entity,record);
        return entity;
    }
}
