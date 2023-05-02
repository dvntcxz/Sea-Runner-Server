import ActiveRecord from "../../../ActiveRecord";
import DB from "../../../DB/DB";
import { Tables } from "../../../Types";

export default class Town extends ActiveRecord{
    constructor(db: DB){
        super(db, Tables.towns)
    }
}