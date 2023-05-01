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
const pg_1 = require("pg");
const ORM_1 = __importDefault(require("./ORM"));
class DB {
    constructor(options) {
        const { HOST, PORT, NAME, USER, PASS, initCb = () => { } } = options;
        this.db = new pg_1.Client({
            host: HOST,
            port: PORT,
            databaase: NAME,
            user: USER,
            passsword: PASS
        });
        //run UPDATE,INSERT, DELETE
        //get SELECT for только для одной
        //all SELECT for для НЕСКОЛЬКИХ
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this.db.connect();
            this.orm = new ORM_1.default(this.db);
            initCb();
            /*const query = 'SELECT * FROM users WHERE id=$1::integer';
            const users = await this.db.query(query, [1]).rows?.[0];
            console.log(users);*/
            try {
                const query = 'INSERT INTO users (login, password) VALUES ($1, $2)';
                const result = yield this.db.query(query, ['masha2', '3212']);
                console.log('result', result);
            }
            catch (e) {
                console.log(e.code);
            }
        }))();
    }
    destructor() {
        if (this.db) {
            this.db.end();
            this.db = null;
        }
    }
    ////////////////////////////
    //////////USER//////////////
    ////////////////////////////
    getUser(id) {
        return this.orm.get('users', id);
    }
    getUserByLogin(login) {
        return this.orm.get('users', { login });
    }
    addUser(data) {
        return this.orm.insert('users', [data]).run();
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
        return this.orm.insert('captains', [captain]).run();
    }
    getCaptain(userId) {
        return this.orm.get('captains', userId);
    }
    getCaptains() {
        return this.orm.all('captains').all();
    }
    updateCaptain(userId, captain) {
        return this.orm.update('captains', userId, captain);
    }
    ////////////////////////////
    //////////SHIP//////////////
    ////////////////////////////
    addShip(ship) {
        return this.orm.insert('ships', [ship]).run();
    }
    updateShip(userId) {
        return this.orm.update('ships', userId, { name });
    }
    getShips() {
        return this.orm.all('ships').all();
    }
    ////////
    //Chat//
    ////////
    getMessages(roomGuid) {
        return new Promise((resolve) => {
            this.db.all('SELECT messages.userIdFrom, users.name, messages.message, rooms.type FROM messages,users, rooms WHERE users.id = messages.userIdFrom AND rooms.guid = messages.roomGuid AND messages.roomGuid=? ', [roomGuid], (error, rows) => resolve((error ? [] : rows)));
        });
    }
    getRoom(guid) {
        return this.orm.get('rooms', { guid });
    }
    addRoom(guid, type) {
        return this.orm.insert('rooms', [{ guid, type }]).run();
    }
    addUserToRoom(roomGuid, userId) {
        return this.orm.insert('roomsUsers', [{ roomGuid, userId }]).run();
    }
    getRoomUserById(roomGuid, userId) {
        return this.orm.get('roomsUsers', { roomGuid, userId });
    }
    getPrivateRoom(userId_1, userId_2) {
        return 1;
    }
    addMessage(roomGuid, userIdFrom, message) {
        return this.orm.insert('messages', [{ roomGuid, userIdFrom, message }]).run();
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
    /////////////////////////////
    /////////////ITEMS///////////
    /////////////////////////////
    addNewItem(guid, typeId) {
        return this.orm.insert('items', [{ guid, typeId }]);
    }
    getItem(guid) {
        return this.orm.get('items', { guid });
    }
    addItemTo(ownerId, cellNumber, guid) {
        return this.orm.insert('items', [{ ownerId, cellNumber, guid }]);
    }
    getTypesItems() {
        return this.orm.all('typesItems');
    }
    /////////////////////////////
    /////////////TOWNS///////////
    /////////////////////////////
    getTowns() {
        return this.orm.all('towns');
    }
    /////////////////////////////
    /////////////PORTS///////////
    /////////////////////////////
    getPorts() {
        return this.orm.all('ports');
    }
    /////////////////////////////
    /////////////FORTS///////////
    /////////////////////////////
    getForts() {
        return this.orm.all('forts');
    }
    //typesItems и alliances
    /////////////////////////////
    /////////////ALLIANCES///////////
    /////////////////////////////
    getAlliances() {
        return this.orm.all('alliances');
    }
}
exports.default = DB;
