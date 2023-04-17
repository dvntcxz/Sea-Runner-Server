import Cache from "../../Cache";
import DB from "../../DB/DB";
import Item from "./Entite/Item";
import Updater from "./Updater";

export default class Game{
    private Trader = new Cache<Item>;
    private timer?: NodeJS.Timer;
    private updater = new Updater();
    private wind = {
        speed: 7,
        direction: 0
    }
    constructor(private db: DB){
        this.timer = setInterval(() => this.updater.update());
    }

    async createItem(ownerId: number, typeId: number){
        const item = new Item(typeId, this.db);
        const guid = await item.create();
        if (guid){
            //this.getTrader(ownerId)
        }
    }

    craftShip(){

    }
}