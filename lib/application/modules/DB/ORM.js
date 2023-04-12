"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SQLQuery_1 = __importDefault(require("./SQLQuery"));
class ORM {
    constructor(db) {
        this.db = db;
        this.db = db;
        this.sqlQueryManager = new SQLQuery_1.default(this.db);
    }
    getValuesParams(conditions, operand) {
        let params;
        let values;
        if (typeof conditions === 'number') {
            params = ' id=? ';
            values = [conditions];
        }
        else {
            params = Object.keys(conditions).map(key => ` ${key}=? `).join(operand);
            values = Object.values(conditions);
        }
        return { values, params };
    }
    getValuesAndNameFields(fields) {
        const fieldsNames = Object.keys(fields[0]);
        const fieldsValues = `(${fieldsNames.map(() => '?').join(', ')})`;
        let values = [];
        const valuesMask = [];
        fields.forEach((obj) => {
            values = [...values, ...Object.values(obj)];
            valuesMask.push(fieldsValues);
        });
        return { values, fieldsNames, valuesMask };
    }
    get(table, conditions, fields = '*', operand = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const query = `SELECT ${fields} FROM ${table} WHERE ${params}`;
        return new Promise((resolve) => this.db.run(query, values, (error, row) => resolve(error ? null : row)));
    }
    all(table, fields = '*') {
        const { db, orderBy, limit, offset, conditions, all } = this.sqlQueryManager;
        const query = `SELECT ${fields} FROM ${table}`;
        return { db, query, values: [], orderBy, limit, offset, conditions, do: all };
    }
    update(table, conditions, fields, operand = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const valuefields = Object.values(fields);
        const argums = Object.keys(fields).map(key => `${key}=?`).join(', ');
        const query = `UPDATE ${table} SET ${argums} WHERE${params}`;
        return new Promise((resolve) => {
            this.db.run(query, valuefields.concat(values), (error) => resolve(!error));
        });
    }
    insert(table, fields) {
        const { db, run } = this.sqlQueryManager;
        const { fieldsNames, values, valuesMask } = this.getValuesAndNameFields(fields);
        let query = `INSERT INTO ${table} (${fieldsNames.join(', ')}) VALUES ${valuesMask.join(', ')}`;
        return { db, query, values, do: run };
    }
    delete(table, conditions, operand = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const query = `DELETE FROM ${table} WHERE ${params}`;
        return new Promise((resolve) => this.db.run(query, values, (error) => resolve(!error)));
    }
}
exports.default = ORM;
