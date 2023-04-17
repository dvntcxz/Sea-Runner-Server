import md5 from "md5";
import DB from "../../../DB/DB";

export default class Item{
    constructor(private typeId: number, private db: DB){
    }

    public async create(){
        let guid = md5(Math.random().toString());
        while(!this.db.getItem(guid)) guid = md5(Math.random().toString());
        await this.db.addNewItem(guid,this.typeId);
        return guid;
    }

    private async load(){
    }
}