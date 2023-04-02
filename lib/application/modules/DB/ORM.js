"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ORM {
    constructor(db) {
        this.db = db;
    }
    //table
    //conditions
    //fields = '*'
    //SELECT fields FROM table WHERE conditions
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
    all() {
    }
    update() {
    }
    isGeneratorFunction() {
    }
    delete(table, conditions, operand = 'AND') {
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
        const query = `DELETE FROM ${table} WHERE ${params}`;
        return new Promise((resolve) => this.db.run(query, values, (error) => resolve(!error)));
    }
}
exports.default = ORM;
