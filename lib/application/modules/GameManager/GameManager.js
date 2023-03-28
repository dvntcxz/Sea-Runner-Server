"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Manager_1 = __importDefault(require("../Manager"));
class GameManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.ships = [];
        this.loadAllShipsFromDB();
    }
    loadAllShipsFromDB() {
    }
    addShip(userId) {
        this.db.addShip();
        this.loadAllShipsFromDB();
    }
    addCaptain(user, allianceId) {
        this.db.addCaptain(user.id, allianceId);
        this.addShip(user.id);
    }
}
exports.default = GameManager;
