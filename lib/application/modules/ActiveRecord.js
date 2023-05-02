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
const getFieldsNames_1 = __importDefault(require("./getFieldsNames"));
class ActiveRecord {
    constructor(db, table) {
        this.db = db;
        this.table = table;
        this.primaryKey = 'id';
        this.fields = [];
        this.attributes = {};
        this.fields = (0, getFieldsNames_1.default)(table);
    }
    getData() {
        const attributes = {};
        this.fields.forEach((field) => {
            const value = this.get(field);
            if (field !== this.primaryKey)
                attributes[field] = value;
        });
        return attributes;
    }
    reload(attributes) {
        this.fields.forEach((field) => {
            const value = this.get(field);
            this.attributes[field] = attributes[field];
        });
    }
    get(key) {
        return this.attributes[key];
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.attributes.id) {
                const data = yield this.db.find(this.table, this.attributes[this.primaryKey]);
                if (data)
                    this.reload(data);
            }
            ;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.db.addRecord(this.table, Object.assign({}, data));
            console.log(record);
            if (record) {
                this.reload(record);
                return true;
            }
            return false;
        });
    }
    save() {
        this.db.updateRecord(this.table, this.attributes[this.primaryKey], this.getData());
    }
}
exports.default = ActiveRecord;
