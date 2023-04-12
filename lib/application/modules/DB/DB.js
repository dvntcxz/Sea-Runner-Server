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
    ////////////////////////////
    //////////USER//////////////
    ////////////////////////////
    getUser(id) {
        return this.orm.get('users', id);
    }
    getAllUsers() {
        return this.orm.all('users').do();
    }
    addUser(data) {
        return this.orm.insert('users', [data]).do();
    }
    setUserToken(userId, token) {
        return this.orm.update('users', userId, { token });
    }
    updateUser(id, field) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orm.update('users', id, field);
        });
    }
    ////////////////////////////
    //////////CAPTAIN///////////
    ////////////////////////////
    addCaptain(captain) {
        return this.orm.insert('captains', [captain]).do();
    }
    getCaptain(userId) {
        return this.orm.get('captains', userId);
    }
    getCaptains() {
        return this.orm.all('captains').do();
    }
    updateCaptain(userId, captain) {
        return this.orm.update('captains', userId, captain);
    }
    ////////////////////////////
    //////////SHIP//////////////
    ////////////////////////////
    addShip(ship) {
        return this.orm.insert('ships', [ship]).do();
    }
    updateShip(userId) {
        return this.orm.update('ships', userId, { name });
    }
    getShips() {
        return this.orm.all('ships').do();
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
        return this.orm.insert('messages', [newMessage]).do();
    }
    editMessage(id, message) {
        return this.orm.update('messages', id, { message });
    }
    deleteMessages(id) {
        return this.orm.delete('messages', id);
    }
    deleteUser(id) {
        return this.orm.delete('users', id);
    }
}
exports.default = DB;
