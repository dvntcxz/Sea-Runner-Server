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
////IMPORT//////
////Modules/////
const ActiveRecord_1 = __importDefault(require("../ActiveRecord"));
const md5_1 = __importDefault(require("md5"));
////Types/////
const Types_1 = require("../Types");
class User extends ActiveRecord_1.default {
    constructor(socketId, db) {
        super(db, Types_1.Tables.users);
        this.socketId = socketId;
    }
    getSocketId() {
        return this.socketId;
    }
    verification(token) {
        return (this.get('token') === token);
    }
    getClientData() {
        return {
            id: this.get('id'),
            name: this.get('name'),
            token: this.get('token')
        };
    }
    registration(login, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (login && password && name) {
                if (!(yield this.db.getUserByLogin(login))) {
                    return yield this.create({ login, password, name });
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
                    this.reload(user);
                    this.attributes.token = (0, md5_1.default)(Math.random().toString());
                    yield this.db.setUserToken(this.getId(), this.get('token'));
                    return true;
                }
            }
            return false;
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.setUserToken(this.getId(), null);
            this.attributes = {};
        });
    }
}
exports.default = User;
