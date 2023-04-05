import Cache from "../Cache";
import Manager, { IManager } from "../Manager"
import { ICaptain, IShip } from "../Types";
import User from "../UserManager/User"
import Captain from "./CaptainManager/Captain";

export default class GameManager extends Manager {
    private captains = new Cache<Captain>;
    constructor(options: IManager) {
        super(options)
        this.loadAllShipsFromDB();
        this.loadAllCaptainsFromDB();
    }

    private async loadAllShipsFromDB() {
        const ships = await this.db.getShips();
        ships.forEach((ship: IShip) => {
            this.captains.get(ship.captainId).addShip(ship);
        })
    }

    private async loadAllCaptainsFromDB() {
        const captains = await this.db.getCaptains();
        captains.forEach((captain: ICaptain) => {
            this.captains.set(captain.id, new Captain(captain));
        })
    }

    ////////////////////////////
    /////////CAPTAIN////////////
    ////////////////////////////

    public addCaptain(user: User, allianceId: number) {
        const captain = {
            userId: user.id,
            allianceId,
            activeShipId: null,
            posX: 200,
            posY: 200,
            direction: 0
        }
        this.db.addCaptain(captain);
        this.loadAllCaptainsFromDB();
    }

    public getCaptain(userId: number): Captain {
        return this.captains.get(userId);
    }

    ////////////////////////////
    ////////////SHIP////////////
    ////////////////////////////

    private speedValue(sailId: number): number {
        return Math.random() * 5;
    }

    private attackSpeedValue(cannonId: number): number {
        return Math.random() * 5;
    }

    private countCannonValue(sailId: number): number {
        return Math.random() * 5;
    }

    private gradeValue(sailId: number, cannonId: number, boardId: number): number {
        return Math.random() * 5;
    }

    private sizeInvantoryValue(sailId: number): number {
        return Math.random() * 5;
    }

    /*private randomShip(sailId: number, cannonId: number, boardId: number): TNewShipData {
        return {
            speed: this.speedValue(sailId),
            attackSpeed: this.attackSpeedValue(cannonId),
            countCannonValue: this.countCannonValue(cannonId),
            grade: this.gradeValue(sailId, cannonId, boardId),
            sizeInventory: this.sizeInvantoryValue(boardId)
        }
    }*/

    /*private async addShip(captain: Captain, ship: object) {
        await this.db.addShip()
    }*/

    /*public createShip(captain: Captain) {
        const ship = this.randomShip(1, 1, 1);
        this.addShip(captain, ship);
    }*/

    public getScene() {
        const result = [];
        Object.values(this.captains.getAll()).
            forEach((captain: Captain) => result.push(captain.getData()))
    }
}