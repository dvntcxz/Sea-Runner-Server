const sqlite3 = require('sqlite3');

export default class DB {
    private db;
    constructor({ NAME: string }) {
        this.db = new sqlite3.Database(NAME);
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
                (error, row) => {
                    console.log(error);
                    resolve = row;
                })
        })
    }

}