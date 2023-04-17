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
Object.defineProperty(exports, "__esModule", { value: true });
class Captain {
    constructor(db) {
        this.db = db;
        this.id = 0;
        this.userId = 0;
        this.allianceId = 0;
        this.activeShipId = 0;
        this.x = 0;
        this.y = 0;
        this.direction = 0;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
        });
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
