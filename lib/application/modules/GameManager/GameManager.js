"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = __importDefault(require("../Cache"));
const Manager_1 = __importDefault(require("../Manager"));
const Captain_1 = __importDefault(require("./CaptainManager/Captain"));
class GameManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.captains = new Cache_1.default;
        this.loadAllShipsFromDB();
        this.loadAllCaptainsFromDB();
    }
    loadAllShipsFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const ships = yield this.db.getShips();
            ships.forEach((ship) => {
                this.captains.get(ship.captainId).addShip(ship);
            });
        });
    }
    loadAllCaptainsFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            const captains = yield this.db.getCaptains();
            captains.forEach((captain) => {
                this.captains.set(captain.id, new Captain_1.default(captain));
            });
        });
    }
    ////////////////////////////
    /////////CAPTAIN////////////
    ////////////////////////////
    addCaptain(user, allianceId) {
        const captain = {
            userId: user.id,
            allianceId,
            activeShipId: null,
            posX: 200,
            posY: 200,
            direction: 0
        };
        this.db.addCaptain(captain);
        this.loadAllCaptainsFromDB();
    }
    getCaptain(userId) {
        return this.captains.get(userId);
    }
    ////////////////////////////
    ////////////SHIP////////////
    ////////////////////////////
    speedValue(sailId) {
        return Math.random() * 5;
    }
    attackSpeedValue(cannonId) {
        return Math.random() * 5;
    }
    countCannonValue(sailId) {
        return Math.random() * 5;
    }
    gradeValue(sailId, cannonId, boardId) {
        return Math.random() * 5;
    }
    sizeInvantoryValue(sailId) {
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
    getScene() {
        const result = [];
        Object.values(this.captains.getAll()).
            forEach((captain) => result.push(captain.getData()));
    }
}
exports.default = GameManager;
