import Cache from "../../Cache";
import { ICaptain, IShip } from "../../Types";
import Ship from "./Ship";

export default class Captain{
    protected id;
    protected userId;
    private allianceId;
    private activeShipId;
    private posX;
    private posY;
    private direction;
    private ships = new Cache<Ship>;
    constructor(data: ICaptain){
        this.id = data.id;
        this.userId = data.userId;
        this.allianceId = data.allianceId;
        this.activeShipId = data.activeShipId;
        this.posX = data.posX;
        this.posY = data.posY;
        this.direction = data.direction;
    }

    public getId():number{
        return this.id;
    }

    public getData(){

    }

    public addShip(ship: IShip):void {
        this.ships.set(ship.id,new Ship(ship));
    }
}