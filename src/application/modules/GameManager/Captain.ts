import Cache from "../Cache";
import DB from "../DB/DB";
import { ICaptain, IShip } from "../Types";

export default class Captain{
    private id = 0;
    private userId = 0;
    private allianceId = 0;
    private activeShipId = 0;
    private x = 0;
    private y = 0;
    private direction = 0;
    constructor(private db: DB){
    }

    private async create(){

    }

    public getId():number{
        return this.id;
    }

    public getData(){

    }

    public addShip(ship: IShip):void {
        //this.ships.set(ship.id,new Ship(ship));
    }
}