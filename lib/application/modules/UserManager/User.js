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
const md5_1 = __importDefault(require("md5"));
class User {
    constructor(socketId, db) {
        this.socketId = socketId;
        this.db = db;
        this.token = null;
        this.id = 0;
        this.login = '';
        this.name = '';
    }
    get() {
        return {
            id: this.id,
            name: this.name
        };
    }
    getSocketId() {
        return this.socketId;
    }
    getId() {
        return this.id;
    }
    verification(token) {
        return (this.token === token);
    }
    registration(login, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (login && password && name) {
                if (!(yield this.db.getUserByLogin(login))) {
                    return yield this.db.addUser({ login, password, name });
                }
            }
            return false;
        });
    }
    auth(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (login && password) {
                const user = yield this.db.getUserByLogin(login);
                if (user && password === user.password) {
                    this.id = user.id;
                    this.login = user.login;
                    this.name = user.name;
                    this.token = (0, md5_1.default)(Math.random().toString());
                    yield this.db.setUserToken(this.id, this.token);
                    return true;
                }
            }
            return false;
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.setUserToken(this.id, null);
        });
    }
}
exports.default = User;
