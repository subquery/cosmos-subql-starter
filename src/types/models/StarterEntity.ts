// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class StarterEntity implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public hash: string;

    public sender?: string[];

    public recipient?: string[];

    public amount?: string[];


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save StarterEntity entity without an ID");
        await store.set('StarterEntity', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove StarterEntity entity without an ID");
        await store.remove('StarterEntity', id.toString());
    }

    static async get(id:string): Promise<StarterEntity | undefined>{
        assert((id !== null && id !== undefined), "Cannot get StarterEntity entity without an ID");
        const record = await store.get('StarterEntity', id.toString());
        if (record){
            return StarterEntity.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<StarterEntity, FunctionPropertyNames<StarterEntity>>> & Entity): StarterEntity {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new StarterEntity(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
