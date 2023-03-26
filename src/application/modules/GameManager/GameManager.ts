import Manager, { IManager } from "../Manager"
import User from "../UserManager/User"
import Ship from "./Ship";

export default class GameManager extends Manager{
    private ships: Ship[] = []
    constructor(options: IManager){
        super(options)
        this.loadAllShipsFromDB();
    }

    private loadAllShipsFromDB(){
    }

    public addShip(userId: number){
        this.db.addShip();
        this.loadAllShipsFromDB()
    }

    public addCaptain(user: User, allianceId: number){
        this.db.addCaptain(user.id, allianceId);
        this.addShip(user.id);
    }
}