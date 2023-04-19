import { Database } from "sqlite3";
import SQLQuery from "./SQLQuery";
export default class ORM {
    constructor(private db: Database) {
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

    private getValuesAndNameFields(fields: object []){
            const fieldsNames = Object.keys(fields[0]);
            const fieldsValues = `(${fieldsNames.map(() => '?').join(', ')})`
            let values: any[] = [];
            const valuesMask: string [] = [];
            fields.forEach((obj:object) => {
                values = [...values, ...Object.values(obj)];
                valuesMask.push(fieldsValues);
            })
            return {values, fieldsNames, valuesMask};
    }

    get<T>(table: string, conditions: object | number, fields: string = '*', operand: string = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const query = `SELECT ${fields} FROM ${table} WHERE${params}`;
        return new Promise<T | null>((resolve) =>
            this.db.get(query, values, (error: Error, row: any) => resolve(error ? null : row)));
    }

    all(table: string, fields: string = '*'){
        const query = `SELECT ${fields} FROM ${table}`;
        return new SQLQuery(this.db, query);
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

    insert(table: string, fields: object []) {
        const {fieldsNames, values, valuesMask} = this.getValuesAndNameFields(fields);
        let query:string = `INSERT INTO ${table} (${fieldsNames.join(', ')}) VALUES ${valuesMask.join(', ')}`;
        return new SQLQuery(this.db, query,values)
    }

    delete(table: string, conditions: object | number, operand: string = 'AND') {
        const { values, params } = this.getValuesParams(conditions, operand);
        const query = `DELETE FROM ${table} WHERE ${params}`;
        return new Promise<boolean>((resolve) =>
            this.db.run(query, values, (error: Error) => resolve(!error)));
    }
}