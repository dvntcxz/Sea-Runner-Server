import DB from "../../../DB/DB";

export default class Trader{
    private priceList = {};
    constructor(private id: number, private db: DB){
    }

    public getPriceList(){
        //this.priceList = this.db.getPriceList()
    }

    public sell(){

    }

    public buy(){

    }

    public view(){

    }
}