import Cache from "../../Cache";
import DB from "../../DB/DB";
import Mediator from "../../Mediator";
import Item from "./Entite/Item";
import Town from "./Entite/Town";
import Updater from "./Updater";

export default class Game{
    private Towns = new Cache<Town>;
    private Trader = new Cache<Item>;
    private timer?: NodeJS.Timer;
    private updater = new Updater();
    private wind = {
        speed: 7,
        direction: 0
    }
    private EVENTS;
    constructor(private db: DB, private mediator: Mediator){
        this.EVENTS = this.mediator.getEventsNames();
        this.timer = setInterval(() => this.updater.update());
        this.mediator.subscribe(this.EVENTS.DB_CONNECT, async () => await this.init())
    }

    private async init(){
        this.loadTowns();
        this.mediator.call(this.EVENTS.INIT_GAME);
    }

    private loadTowns(){

    }

    async createItem(ownerId: number, typeId: number){
        const item = new Item(typeId, this.db);
        await item.create();
        if (item){
            //this.getTrader(ownerId)
        }
    }

    craftShip(){

    }
}