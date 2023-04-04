"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        //return this.orm.update('users', userId, { token: token });
    }
    updateUser(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const sql = `UPDATE users SET name = ? WHERE id = ?`;
                this.db.run(sql, [name, id], (err) => resolve(err ? false : true));
            });
            //return this.orm.update('users', id, { name: name });
        });
    }
    addCaptain(userId, allianceId) {
        this.db.run('INSERT INTO captains(userId,allianceId) VALUES(?,?)', [userId, allianceId]);
    }
    getCaptain(userId) {
        return this.orm.get('captains', userId);
    }
    updateCaptain(userId) {
        return this.orm.update('captains', userId, { name: name });
    }
    updateShip(userId) {
        return this.orm.update('ships', userId, { name: name });
    }
    addShip() {
        this.db.run('INSERT INTO ships() VALUES(?,?)', []);
    }
    getShips() {
        return new Promise((resolve) => {
            this.db.all('SELECT * FROM ships', (error, rows) => resolve(error ? [] : rows));
        });
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
        return this.orm.update('messages', id, { message: message });
    }
    deleteMessages(userIdFrom = null, userIdTo = null) {
        return this.orm.delete('messages', { userIdFrom, userIdTo });
    }
    deleteUser(id) {
        return this.orm.delete('users', id);
    }
}
exports.default = DB;
