import { Database } from "sqlite3";
export default class ORM {
    private db;

    constructor(db: Database) {
        this.db = db;
    }

    //table
    //conditions
    //fields = '*'
    //SELECT fields FROM table WHERE conditions

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
    all() { //limit offset order 

    }
    update() {

    }
    isGeneratorFunction() {

    }
    delete(table: string, conditions: object | number, operand: string = 'AND') {
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
        const query = `DELETE FROM ${table} WHERE ${params}`;
        return new Promise<boolean>((resolve) =>
            this.db.run(query, values, (error: Error) => resolve(!error)));
    }
}