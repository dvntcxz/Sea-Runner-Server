const sqlite3 = require('sqlite3');
import {Database} from 'sqlite3';
import Ship from '../GameManager/Ship';
import {TUser, TUsers, TCaptain, TShip, TUserRegistrationData} from '../Types';

export default class DB {
    private db;
    constructor(options: { NAME: string }) {
        console.log(options.NAME);
        this.db = new Database(options.NAME);
        (async ()=> {
            const user = await this.getUser(2);
            console.log(user);
        })()
        //run UPDATE,INSERT, DELETE
        //get SELECT for только для одной
        //all SELECT for для НЕСКОЛЬКИХ
    }

    public getUser(id: number) {
        return new Promise<TUser | null>((resolve) => {
            this.db.get('SELECT * FROM users WHERE id=?',
                [id],
                (error: any, row: any) => resolve(error ? null : row))
                });
    }

    public getAllUsers() {
        return new Promise<TUsers>((resolve) => {
            this.db.all('SELECT * FROM users',
                (error: any, rows: any) => resolve(error ? [] : rows))
                });
    }

    public addUser(data: TUserRegistrationData) {
        const {login, password, name} = data;
        this.db.run('INSERT INTO users(login,password,name) VALUES(?,?,?)',[login,password,name]);
    }

    public addCaptain(userId: number, allianceId: number) {
        this.db.run('INSERT INTO captains(userId,allianceId) VALUES(?,?)',[userId,allianceId]);
    }

    public getCaptain(userId:number) {
        return new Promise<TCaptain>((resolve) => {
            this.db.get('SELECT * FROM captains WHERE userId=?',
                [userId],
                (error: any, row: any) => resolve(error ? null : row))
                });
    }

    public addShip(){
        this.db.run('INSERT INTO ships() VALUES(?,?)',[])
    }
}