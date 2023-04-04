import { TUser, TUsers, TCaptain, TShip, TUserRegistrationData, TMessages, TNewMessage } from '../Types';
import { Database } from "sqlite3";
export default class ORM {
    private db;

    constructor(db: Database) {
        this.db = db;
    }

    private getValuesParams(conditions: object | number, operand: string) {
        let params: string;
        let values: any[];
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

    get<T>(table: string, conditions: object | number, fields: string = '*', operand: string = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const query = `SELECT ${fields} FROM ${table} WHERE ${params}`;
        return new Promise<T | null>((resolve) =>
            this.db.run(query, values, (error: Error, row: any) => resolve(error ? null : row)));
    }

    allTable<T>(table: string, fields: string = '*') { //limit offset order 
        const query = `SELECT ${fields} FROM ${table}`;
        return new Promise<T>((resolve) =>
            this.db.all(query, (error: Error, rows: any) => resolve(error ? [] : rows)));
    }

    all<T>(table: string, conditions: object, fields: string = '*', operand: string = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const query = `SELECT ${fields} FROM ${table} WHERE ${params}`;
        return new Promise<T>((resolve) =>
            this.db.all(query, values, (error: Error, rows: any) => resolve(error ? [] : rows)));
    }

    update(table: string, conditions: object | number, fields: object, operand: string = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const valuefields = Object.values(fields);
        const argums = Object.keys(fields).map(key => `${key}=?`).join(', ');
        const query = `UPDATE ${table} SET ${argums} WHERE${params}`;
        return new Promise<boolean>((resolve) => {
            this.db.run(query, valuefields.concat(values), (error: Error) => resolve(!error))
        });
    }

    isGeneratorFunction() {

    }
    delete(table: string, conditions: object | number, operand: string = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const query = `DELETE FROM ${table} WHERE ${params}`;
        return new Promise<boolean>((resolve) =>
            this.db.run(query, values, (error: Error) => resolve(!error)));
    }
}