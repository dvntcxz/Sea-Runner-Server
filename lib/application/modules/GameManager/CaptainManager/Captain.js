"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Captain {
    //private ships = new Cache<Ship>;
    constructor(data) {
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
        //this.ships.set(ship.id,new Ship(ship));
    }
}
exports.default = Captain;
