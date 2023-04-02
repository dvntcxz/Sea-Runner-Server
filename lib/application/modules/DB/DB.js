"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const ORM_1 = __importDefault(require("./ORM"));
class DB {
    constructor(options) {
        this.db = new sqlite3_1.Database(options.NAME);
        //run UPDATE,INSERT, DELETE
        //get SELECT for только для одной
        //all SELECT for для НЕСКОЛЬКИХ
        this.orm = new ORM_1.default(this.db);
        this.orm.delete('messages', { userIdFrom: 123, userIdTo: 312 });
    }
    getUser(id) {
        return this.orm.get('users', id);
    }
    getAllUsers() {
        return new Promise((resolve) => {
            this.db.all('SELECT * FROM users', (error, rows) => resolve(error ? [] : rows));
        });
    }
    addUser(data) {
        const { login, password, name } = data;
        return new Promise((resolve) => {
            this.db.run('INSERT INTO users(login,password,name) VALUES(?,?,?)', [login, password, name], (error) => resolve((error) ? false : true));
        });
    }
    setUserToken(userId, token) {
        return new Promise((resolve) => {
            this.db.run('UPDATE users SET token=? where id = ?', [token, userId], (error) => resolve((error) ? false : true));
        });
    }
    addCaptain(userId, allianceId) {
        this.db.run('INSERT INTO captains(userId,allianceId) VALUES(?,?)', [userId, allianceId]);
    }
    getCaptain(userId) {
        return this.orm.get('captains', userId);
    }
    addShip() {
        this.db.run('INSERT INTO ships() VALUES(?,?)', []);
    }
    ////////
    //Chat//
    ////////
    getMessagesToUser(userId) {
        return new Promise((resolve) => {
            this.db.all('SELECT * FROM messages WHERE userIdTo=? or (userIdFrom=? AND userIdTo is NOT NULL)', [userId], (error, rows) => resolve((error ? [] : rows)));
        });
    }
    getMessagesToAll() {
        return new Promise((resolve) => {
            this.db.all('SELECT * FROM messages WHERE userIdTo is NULL', (error, rows) => resolve((error ? [] : rows)));
        });
    }
    addMessage(newMessage) {
        const { userIdFrom, userIdTo, message } = newMessage;
        return new Promise((resolve) => {
            this.db.run('INSERT INTO messages(userIdFrom, userIdTo, message) VALUES (?,?,?)', [userIdFrom, userIdTo, message], (error) => resolve(!error));
        });
    }
    editMessage(id, message) {
        return new Promise((resolve) => {
            this.db.run('UPDATE messages SET message=? WHERE id=?', [message, id], (error) => resolve((error ? false : true)));
        });
    }
    deleteMessages(userIdFrom = null, userIdTo = null) {
        return this.orm.delete('messages', { userIdFrom, userIdTo });
    }
    deleteUser(id) {
        return this.orm.delete('users', id);
    }
}
exports.default = DB;
