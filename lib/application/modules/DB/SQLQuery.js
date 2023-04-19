"use strict";
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
    all() {
        return new Promise((resolve) => {
            this.db.all(this.query, this.values, (error, rows) => resolve(error ? [] : rows));
        });
    }
    get() {
        return new Promise((resolve) => {
            this.db.get(this.query, this.values, (error, row) => resolve(error ? null : row));
        });
    }
    run() {
        return new Promise((resolve) => {
            this.db.run(this.query, this.values, (error) => resolve(!error));
        });
    }
}
exports.default = SQLQuery;
