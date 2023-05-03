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
const ActiveRecord_1 = __importDefault(require("../../../ActiveRecord"));
const Types_1 = require("../../../Types");
const Trader_1 = __importDefault(require("./Trader"));
class Town extends ActiveRecord_1.default {
    constructor(db) {
        super(db, Types_1.Tables.towns);
    }
    init(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                this.attributes.id = id;
                if (yield this.refresh()) {
                    this.Trader = new Trader_1.default(this.db);
                    //await this.Trader.init();
                    return true;
                }
                return false;
            }
            return false;
        });
    }
}
exports.default = Town;
