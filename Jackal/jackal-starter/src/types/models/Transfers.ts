// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression} from "@subql/types-core";
import assert from 'assert';



export type TransfersProps = Omit<Transfers, NonNullable<FunctionPropertyNames<Transfers>>| '_name'>;

export class Transfers implements Entity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public blockHeight?: bigint;
    public txHash?: string;
    public fromAddress?: string;
    public toAddress?: string;
    public amount?: string;
    public denomination?: string;
    

    get _name(): string {
        return 'Transfers';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Transfers entity without an ID");
        await store.set('Transfers', id.toString(), this);
    }

    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Transfers entity without an ID");
        await store.remove('Transfers', id.toString());
    }

    static async get(id:string): Promise<Transfers | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Transfers entity without an ID");
        const record = await store.get('Transfers', id.toString());
        if (record) {
            return this.create(record as TransfersProps);
        } else {
            return;
        }
    }

    static async getByFields(filter: FieldsExpression<TransfersProps>[], options?: { offset?: number, limit?: number}): Promise<Transfers[]> {
        const records = await store.getByFields('Transfers', filter, options);
        return records.map(record => this.create(record as TransfersProps));
    }

    static create(record: TransfersProps): Transfers {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
