"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require('sqlite3');
const sqlite3_1 = require("sqlite3");
class DB {
    constructor(options) {
        console.log(options.NAME);
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
        this.db.run('INSERT INTO users(login,password,name) VALUES(?,?,?)', [login, password, name]);
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
    allMessagesThisUser(id) {
        return new Promise((resolve) => {
            this.db.all('SELECT * FROM messages WHERE userIdTo=?', [id], (error, rows) => resolve((error ? null : rows)));
        });
    }
    getMessagesToAll() {
        return new Promise((resolve) => {
            this.db.all('SELECT * FROM messages WHERE userIdTo is NULL', (error, rows) => resolve((error ? null : rows)));
        });
    }
    editMessage(id, message) {
        new Promise((resolve) => {
            this.db.run('UPDATE messages SET message=? WHERE id=?', [message, id], (error, row) => resolve((error ? null : row)));
        });
        return true;
    }
}
exports.default = DB;
