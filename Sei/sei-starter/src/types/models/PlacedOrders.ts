// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type PlacedOrdersProps = Omit<PlacedOrders, NonNullable<FunctionPropertyNames<PlacedOrders>>>;

export class PlacedOrders implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockHeight?: bigint;

    public txHash?: string;

    public status?: string;

    public account?: string;

    public contractAddr?: string;

    public price?: bigint;

    public quantity?: string;

    public priceDenom?: string;

    public assetDenom?: string;

    public orderType?: string;

    public positionDirection?: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save PlacedOrders entity without an ID");
        await store.set('PlacedOrders', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove PlacedOrders entity without an ID");
        await store.remove('PlacedOrders', id.toString());
    }

    static async get(id:string): Promise<PlacedOrders | undefined>{
        assert((id !== null && id !== undefined), "Cannot get PlacedOrders entity without an ID");
        const record = await store.get('PlacedOrders', id.toString());
        if (record){
            return this.create(record as PlacedOrdersProps);
        }else{
            return;
        }
    }



    static create(record: PlacedOrdersProps): PlacedOrders {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
