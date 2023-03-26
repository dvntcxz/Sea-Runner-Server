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
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require('sqlite3');
const sqlite3_1 = require("sqlite3");
class DB {
    constructor(options) {
        console.log(options.NAME);
        this.db = new sqlite3_1.Database(options.NAME);
        (() => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(2);
            console.log(user);
        }))();
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
    addShip(ship) {
        this.db.run('INSERT INTO ships() VALUES(?,?)', [ship]);
    }
}
exports.default = DB;
