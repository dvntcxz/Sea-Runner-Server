"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Trader {
    constructor(id, db) {
        this.id = id;
        this.db = db;
        this.priceList = {};
    }
    getPriceList() {
        //this.priceList = this.db.getPriceList()
    }
    sell() {
    }
    buy() {
    }
    view() {
    }
}
exports.default = Trader;
