import { isKeyObject } from "util/types";
import DB from "./DB/DB";
import { Tables } from "./Types";

export default class ActiveRecord{
    protected id!: number;
    constructor(readonly db: DB, readonly table: Tables){
    }

    protected reload(data: object){
    }

    protected async refresh(){
        if (this.id) {
            const data = await this.db.find(this.table, this.id);
            if (data){
            }
        };
    }

    protected async create(data: object){
        const record = await this.db.addRecord(this.table, data);
        if (record) this.reload(record);
    }

    protected save(data: object){
        if (this.id) this.db.updateRecord(this.table, this.id, data);
    }
}