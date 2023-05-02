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
class ORM {
    constructor(db) {
        this.db = db;
    }
    sqlQuery(query, values = []) {
        const sqlQuery = {
            query: query,
            values: values,
            where: (conditions) => this.where(sqlQuery, conditions),
            run: () => this.run(sqlQuery.query, sqlQuery.values)
        };
        return sqlQuery;
    }
    run(query, values) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.db.query(query, values);
                return (result.rows[0]) ? (result.rowCount === 1) ? result.rows[0] : result.rows : null;
            }
            catch (error) {
                return null;
            }
        });
    }
    where(sqlQuery, conditions) {
        const { values, params } = this.getValuesParams(conditions, 'AND', sqlQuery.values.length);
        sqlQuery.query += ` WHERE ${params}`;
        sqlQuery.values = sqlQuery.values.concat(values);
        return sqlQuery;
    }
    select(table, fields = '*') {
        const query = `SELECT ${fields} FROM ${table}`;
        return this.sqlQuery(query);
    }
    update(table, fields) {
        let i = 0;
        const values = Object.values(fields);
        const argums = Object.keys(fields).map(key => {
            i++;
            return `${key}=$${i}`;
        }).join(', ');
        const query = `UPDATE ${table} SET ${argums}`;
        return this.sqlQuery(query, values);
    }
    delete(table) {
        const query = `DELETE FROM ${table}`;
        return this.sqlQuery(query);
    }
    insert(table, records) {
        const { fieldsNames, values, valuesMask } = this.getValuesAndNameFields(records);
        let query = `INSERT INTO ${table} (${fieldsNames.join(', ')}) VALUES ${valuesMask.join(', ')} RETURNING *`;
        return { run: () => this.run(query, values) };
    }
    getValuesParams(conditions, operand, index = 0) {
        let params;
        let values;
        let i = index;
        params = Object.keys(conditions).map(key => {
            i++;
            return ` ${key}=$${i} `;
        }).join(operand);
        values = Object.values(conditions);
        return { values, params };
    }
    getValuesAndNameFields(fields) {
        const fieldsNames = Object.keys(fields[0]);
        let i = 0;
        let values = [];
        const valuesMask = [];
        fields.forEach((obj) => {
            const fieldsValues = `(${fieldsNames.map(() => {
                i++;
                return `$${i}`;
            }).join(', ')})`;
            values = [...values, ...Object.values(obj)];
            valuesMask.push(fieldsValues);
        });
        return { values, fieldsNames, valuesMask };
    }
}
exports.default = ORM;
