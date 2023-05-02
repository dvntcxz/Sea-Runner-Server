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
        console.log(HOST, PORT, NAME, USER, PASS);
        this.db = new pg_1.Client({
            host: HOST,
            port: PORT,
            database: NAME,
            user: USER,
            password: PASS
        });
        this.orm = new ORM_1.default(this.db);
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this.connect(initCb);
            /*const query = 'SELECT * FROM users WHERE id=$1::integer';
            const users = await this.db.query(query, [1]).rows?.[0];
            console.log(users);*/
        }))();
    }
    connect(initCb) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db) {
                yield this.db.connect();
                initCb();
            }
        });
    }
    destructor() {
        if (this.db) {
            this.db.end();
            this.db = null;
        }
    }
    find(table, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orm.select(table).where({ id: id }).run();
        });
    }
    updateRecord(table, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orm.update(table, data).where({ id: id }).run();
        });
    }
    addRecord(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orm.insert(table, [Object.assign({}, data)]).run();
        });
    }
    ////////////////////////////
    //////////USER//////////////
    ////////////////////////////
    getUserByLogin(login) {
        return this.orm.select('users').where({ login }).run();
    }
    addUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orm.insert('users', [data]).run();
        });
    }
    setUserToken(userId, token) {
        //return this.orm.update('users', userId, { token });
    }
    updateUser(id, field) {
        return __awaiter(this, void 0, void 0, function* () {
            //return this.orm.update('users', id, field);
        });
    }
    ////////////////////////////
    //////////CAPTAIN///////////
    ////////////////////////////
    addCaptain(captain) {
        //return this.orm.insert('captains', [captain]).run();
    }
    getCaptain(userId) {
        //return this.orm.get<ICaptain>('captains', userId);
    }
    getCaptains() {
        //return this.orm.all('captains').all<TCaptains>();
    }
    updateCaptain(userId, captain) {
        //return this.orm.update('captains', userId, captain);
    }
    ////////////////////////////
    //////////SHIP//////////////
    ////////////////////////////
    addShip(ship) {
        //return this.orm.insert('ships', [ship]).run();
    }
    updateShip(userId) {
        //return this.orm.update('ships', userId, { name });
    }
    getShips() {
        //return this.orm.all('ships').all<TShips>();
    }
    ////////
    //Chat//
    ////////
    getMessages(roomGuid) {
        /*return new Promise<TMessages>((resolve) => {
            this.db.all('SELECT messages.userIdFrom, users.name, messages.message, rooms.type FROM messages,users, rooms WHERE users.id = messages.userIdFrom AND rooms.guid = messages.roomGuid AND messages.roomGuid=? ',
                [roomGuid],
                (error: any, rows: any) => resolve((error ? [] : rows)))
        });*/
    }
    getRoom(guid) {
        //return this.orm.get<TRoom>('rooms', { guid });
    }
    addRoom(guid, type) {
        //return this.orm.insert('rooms', [{ guid, type }]).run()
    }
    addUserToRoom(roomGuid, userId) {
        //return this.orm.insert('roomsUsers', [{ roomGuid, userId }]).run()
    }
    getRoomUserById(roomGuid, userId) {
        //return this.orm.get<string>('roomsUsers', { roomGuid, userId });
    }
    getPrivateRoom(userId_1, userId_2) {
        //return 1;
    }
    addMessage(roomGuid, userIdFrom, message) {
        //return this.orm.insert('messages', [{ roomGuid, userIdFrom, message }]).run();
    }
    editMessage(id, message) {
        //return this.orm.update('messages', id, { message });
    }
    deleteMessages(id) {
        //return this.orm.delete('messages', id)
    }
    deleteUser(id) {
        //return this.orm.delete('users', id);
    }
    /////////////////////////////
    /////////////ITEMS///////////
    /////////////////////////////
    addNewItem(guid, typeId) {
        //return this.orm.insert('items', [{ guid, typeId }])
    }
    getItem(guid) {
        //return this.orm.get('items', { guid });
    }
    addItemTo(ownerId, cellNumber, guid) {
        //return this.orm.insert('items', [{ ownerId, cellNumber, guid }])
    }
    getTypesItems() {
        //return this.orm.all('typesItems');
    }
    /////////////////////////////
    /////////////TOWNS///////////
    /////////////////////////////
    getTowns() {
        //return this.orm.all('towns');
    }
    /////////////////////////////
    /////////////PORTS///////////
    /////////////////////////////
    getPorts() {
        //return this.orm.all('ports');
    }
    /////////////////////////////
    /////////////FORTS///////////
    /////////////////////////////
    getForts() {
        //return this.orm.all('forts');
    }
    //typesItems и alliances
    /////////////////////////////
    /////////////ALLIANCES///////////
    /////////////////////////////
    getAlliances() {
        //return this.orm.all('alliances');
    }
}
exports.default = DB;
