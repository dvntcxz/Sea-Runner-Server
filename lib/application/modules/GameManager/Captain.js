"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Captain {
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId;
        this.allianceId = data.allianceId;
        this.activeShipId = data.activeShipId;
        this.posX = data.posX;
        this.posY = data.posY;
        this.direction = data.direction;
    }
}
exports.default = Captain;
