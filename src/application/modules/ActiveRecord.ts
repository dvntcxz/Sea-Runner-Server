import { TAttributes, Tables} from "./Types";

import DB from "./DB/DB";
import getFieldsName from "./getFieldsNames";

export default class ActiveRecord{
    protected primaryKey = 'id';
    protected fields: string [] = [];
    protected attributes: TAttributes = {};
    constructor(readonly db: DB, readonly table: Tables){
        this.fields = getFieldsName(table);
    }

    protected getData(): object{
        const attributes: TAttributes = {};
        this.fields.forEach((field: string) => {
            const value = this.get(field);
            if (field !== this.primaryKey) attributes[field] = value;
        })
        return attributes;
    }

    protected reload(attributes: TAttributes){
        this.fields.forEach((field: string) => {
            const value = this.get(field);
            this.attributes[field] = attributes[field];
        })
    }

    protected get(key: string){
        return this.attributes[key];
    }

    protected async refresh(){
        if (this.attributes.id) {
            const data = await this.db.find(this.table, this.attributes[this.primaryKey]);
            if (data) this.reload(data);
        };
    }

    protected async create(data: object): Promise<boolean>{
        const record = await this.db.addRecord(this.table, {...data});
        if (record) {
            this.reload(record);
            return true;
        }
        return false;
    }

    protected save(){
        this.db.updateRecord(this.table, this.attributes[this.primaryKey], this.getData());
    }
}