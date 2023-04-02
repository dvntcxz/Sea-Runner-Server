import { Database } from 'sqlite3';
import ORM from './ORM';
import { TUser, TUsers, TCaptain, TShip, TUserRegistrationData, TMessages, TNewMessage } from '../Types';

export default class DB {
    private db;
    private orm;
    constructor(options: { NAME: string }) {
        this.db = new Database(options.NAME);
        //run UPDATE,INSERT, DELETE
        //get SELECT for только для одной
        //all SELECT for для НЕСКОЛЬКИХ
        this.orm = new ORM(this.db);

        this.orm.delete('messages', { userIdFrom: 123, userIdTo: 312 });
    }

    public getUser(id: number) {
        return this.orm.get<TUser>('users', id);
    }

    public getAllUsers() {
        return new Promise<TUsers>((resolve) => {
            this.db.all('SELECT * FROM users',
                (error: Error, rows: any) => resolve(error ? [] : rows))
        });
    }

    public addUser(data: TUserRegistrationData) {
        const { login, password, name } = data;
        return new Promise<boolean>((resolve) => {
            this.db.run('INSERT INTO users(login,password,name) VALUES(?,?,?)', [login, password, name],
                (error: Error) => resolve((error) ? false : true))
        });
    }

    public setUserToken(userId: number, token: string | null) {
        return new Promise<boolean>((resolve) => {
            this.db.run('UPDATE users SET token=? where id = ?', [token, userId],
                (error: Error) => resolve((error) ? false : true))
        });
    }

    public async updateUser(id: number, name: TUsers): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => { 
          const sql = `UPDATE users SET name = ? WHERE id = ?`; 
          this.db.run(sql, [name, id], (err: any) => resolve(err ? false : true)
          );
        });
      }

    public addCaptain(userId: number, allianceId: number) {
        this.db.run('INSERT INTO captains(userId,allianceId) VALUES(?,?)', [userId, allianceId]);
    }

    public getCaptain(userId: number) {
        return this.orm.get<TCaptain>('captains', userId);
    }

    public addShip() {
        this.db.run('INSERT INTO ships() VALUES(?,?)', [])
    }


    ////////
    //Chat//
    ////////

    public getMessagesToUser(userId: number) {
        return new Promise<TMessages>((resolve) => {
            this.db.all('SELECT * FROM messages WHERE userIdTo=? or (userIdFrom=? AND userIdTo is NOT NULL)',
                [userId],
                (error: any, rows: any) => resolve((error ? [] : rows)))
        });
    }

    public getMessagesToAll() {
        return new Promise<TMessages>((resolve) => {
            this.db.all('SELECT * FROM messages WHERE userIdTo is NULL',
                (error: any, rows: any) => resolve((error ? [] : rows)))
        });
    }

    public addMessage(newMessage: TNewMessage) {
        const { userIdFrom, userIdTo, message } = newMessage;
        return new Promise<boolean>((resolve) => {
            this.db.run('INSERT INTO messages(userIdFrom, userIdTo, message) VALUES (?,?,?)',
                [userIdFrom, userIdTo, message],
                (error: Error) => resolve(!error))
        });
    }

    public editMessage(id: number, message: string) {
        return new Promise<boolean>((resolve) => {
            this.db.run('UPDATE messages SET message=? WHERE id=?',
                [message, id],
                (error: Error) => resolve((error ? false : true)))
        });
    }

    deleteMessages(userIdFrom = null, userIdTo = null) {
        return this.orm.delete('messages', { userIdFrom, userIdTo })
    }

    deleteUser(id: number) {
        return this.orm.delete('users', id);
    }
}