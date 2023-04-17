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
const md5_1 = __importDefault(require("md5"));
class Item {
    constructor(typeId, db) {
        this.typeId = typeId;
        this.db = db;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            let guid = (0, md5_1.default)(Math.random().toString());
            while (!this.db.getItem(guid))
                guid = (0, md5_1.default)(Math.random().toString());
            yield this.db.addNewItem(guid, this.typeId);
            return guid;
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = Item;
