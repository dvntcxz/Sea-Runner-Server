"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = __importDefault(require("../../Cache"));
const Ship_1 = __importDefault(require("./Ship"));
class Captain {
    constructor(data) {
        this.ships = new Cache_1.default;
        this.id = data.id;
        this.userId = data.userId;
        this.allianceId = data.allianceId;
        this.activeShipId = data.activeShipId;
        this.posX = data.posX;
        this.posY = data.posY;
        this.direction = data.direction;
    }
    getId() {
        return this.id;
    }
    getData() {
    }
    addShip(ship) {
        this.ships.set(ship.id, new Ship_1.default(ship));
    }
}
exports.default = Captain;
