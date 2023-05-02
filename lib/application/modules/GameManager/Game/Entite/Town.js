"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveRecord_1 = __importDefault(require("../../../ActiveRecord"));
const Types_1 = require("../../../Types");
class Town extends ActiveRecord_1.default {
    constructor(db) {
        super(db, Types_1.Tables.towns);
    }
}
exports.default = Town;