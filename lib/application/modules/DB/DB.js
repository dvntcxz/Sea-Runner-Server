"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
class DB {
    constructor(options) {
        this.db = new sqlite3_1.Database(options.NAME);
        //run UPDATE,INSERT, DELETE
        //get SELECT for только для одной
        //all SELECT for для НЕСКОЛЬКИХ
    }
    getUser(id) {
        return new Promise((resolve) => {
            this.db.get('SELECT * FROM users WHERE id=?', [id], (error, row) => resolve(error ? null : row));
        });
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
        return new Promise((resolve) => {
            this.db.get('SELECT * FROM captains WHERE userId=?', [userId], (error, row) => resolve(error ? null : row));
        });
    }
    addShip() {
        this.db.run('INSERT INTO ships() VALUES(?,?)', []);
    }
    ////////
    //Chat//
    ////////
    getMessagesToUser(userId) {
        return new Promise((resolve) => {
            this.db.all('SELECT * FROM messages WHERE userIdTo=? or (userIdFrom=? AND userIdTo is NOT NULL)', [userId], (error, rows) => resolve((error ? null : rows)));
        });
    }
    getMessagesToAll() {
        return new Promise((resolve) => {
            this.db.all('SELECT * FROM messages WHERE userIdTo is NULL', (error, rows) => resolve((error ? null : rows)));
        });
    }
    addMessage(newMessage) {
        const { userIdFrom, userIdTo, message } = newMessage;
        return new Promise((resolve) => {
            this.db.run('INSERT INTO messages(userIdFrom, userIdTo, message) VALUES (?,?,?)', [userIdFrom, userIdTo, message], (error) => resolve((error ? false : true)));
        });
    }
    editMessage(id, message) {
        return new Promise((resolve) => {
            this.db.run('UPDATE messages SET message=? WHERE id=?', [message, id], (error) => resolve((error ? false : true)));
        });
    }
}
exports.default = DB;
