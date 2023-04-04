"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ORM {
    constructor(db) {
        this.db = db;
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
    get(table, conditions, fields = '*', operand = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const query = `SELECT ${fields} FROM ${table} WHERE ${params}`;
        return new Promise((resolve) => this.db.run(query, values, (error, row) => resolve(error ? null : row)));
    }
    allTable(table, fields = '*') {
        const query = `SELECT ${fields} FROM ${table}`;
        return new Promise((resolve) => this.db.all(query, (error, rows) => resolve(error ? [] : rows)));
    }
    all(table, conditions, fields = '*', operand = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const query = `SELECT ${fields} FROM ${table} WHERE ${params}`;
        return new Promise((resolve) => this.db.all(query, values, (error, rows) => resolve(error ? [] : rows)));
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
    isGeneratorFunction() {
    }
    delete(table, conditions, operand = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const query = `DELETE FROM ${table} WHERE ${params}`;
        return new Promise((resolve) => this.db.run(query, values, (error) => resolve(!error)));
    }
}
exports.default = ORM;
