const sqlite3 = require('sqlite3');

import {TUser} from '../Types';

export default class DB {
    private db;
    constructor(options: { NAME: string }) {
        this.db = new sqlite3.Database(options.NAME);
        (async ()=> {
            const user = await this.getUser(2);
            console.log(user);
        })()
        //run UPDATE,INSERT, DELETE
        //get SELECT for только для одной
        //all SELECT for для НЕСКОЛЬКИХ
    }

    public getUser(id: number) {
        return new Promise((resolve) => {
            this.db.get('SELECT * FROM users WHERE id=?',
                [id],
                (error: any, row: any) => resolve( (error ? null : row) as TUser))
                });
    }

    

}