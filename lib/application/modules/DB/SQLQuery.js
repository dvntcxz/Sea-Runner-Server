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
class SQLQuery {
    constructor(db, query = '', values = []) {
        this.db = db;
        this.query = query;
        this.values = values;
    }
    conditions(conditions, operand = 'AND') {
        const params = Object.keys(conditions).map(key => ` ${key}=? `).join(operand);
        const values = Object.values(conditions);
        this.query = `${this.query} WHERE ${params}`;
        this.values = [...this.values, ...values];
        return this;
    }
    limit(value) {
        this.query = `${this.query} LIMIT ${value}`;
        this.values.push(value);
        return this;
    }
    offset(value) {
        this.query = `${this.query} OFFSET ${value}`;
        this.values.push(value);
        return this;
    }
    orderBy(field) {
        this.query = `${this.query} ORDER BY ${field}`;
        this.values.push(field);
        return this;
    }
    // all<T>(){
    //     return new Promise<T>((resolve) => {
    //         this.db.all(this.query,this.values,
    //             (error: Error, rows: any) => resolve(error ? [] : rows))
    //     });
    // }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield this.db.query(this.query, this.values);
                return rows;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
    // get<T>(){
    //     return new Promise<T | null>((resolve) => {
    //         this.db.get(this.query,this.values,
    //             (error: Error, row: any) => resolve(error ? null : row))
    //     });
    // }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield this.db.query(this.query, this.values);
                return rows;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
    // run(){
    //     return new Promise<boolean>((resolve) => {
    //         this.db.run(this.query,this.values,
    //             (error: Error) => resolve(!error))
    //     });
    // }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield this.db.query(this.query, this.values);
                return rows;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
}
exports.default = SQLQuery;
