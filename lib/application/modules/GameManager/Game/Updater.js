"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const List_1 = __importDefault(require("./List"));
class Updater {
    constructor() {
        this.updateList = new List_1.default;
    }
    add(func, delta = null, addTime = 0) {
        let time = Number(Date.now()) + addTime;
        this.updateList.add(this.updateList.newList(func, time, delta));
    }
    update() {
        let update = this.updateList.get();
        const time = Number(Date.now());
        while (update && update.time <= time) {
            update = this.updateList.pop();
        }
    }
}
exports.default = Updater;
