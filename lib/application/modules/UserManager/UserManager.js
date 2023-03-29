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
const Manager_1 = __importDefault(require("../Manager"));
const User_1 = __importDefault(require("./User"));
var hash = require('md5');
class UserManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.cacheUsersById = {};
        this.cacheUsersByToken = {};
        this.cacheUsersByLogin = {};
        //Mediator Triggers
        const { GET_USER_BY_TOKEN, GET_USER, LOG_IN, LOG_OUT, REGISTRATION } = this.TRIGGERS;
        this.mediator.set(GET_USER_BY_TOKEN, (token) => this.getUserByToken(token));
        this.mediator.set(GET_USER, (id) => this.getUser(id));
        this.mediator.set(LOG_IN, (data) => this.login(data));
        this.mediator.set(LOG_OUT, (token) => this.logout(token));
        this.mediator.set(REGISTRATION, (data) => this.registration(data));
        //Mediator Events
        const { CHANGE_USERS, CHANGE_USER } = this.EVENTS;
        this.mediator.subscribe('CHANGE_USERS', () => this.loadAllUserFromDB());
        this.mediator.subscribe('CHANGE_USER', (id) => this.updateUserData(id));
        this.loadAllUserFromDB();
    }
    getUserByToken(token) {
        return this.cacheUsersByToken[token] || null;
    }
    getUser(id) {
        return this.cacheUsersById[id] || null;
    }
    getUserByLogin(login) {
        return this.cacheUsersByLogin[login] || null;
        ;
    }
    updateCaches(user) {
        const cacheUser = new User_1.default(user);
        this.cacheUsersById[user.id] = cacheUser;
        this.cacheUsersByLogin[user.login] = cacheUser;
        if (user.token)
            this.cacheUsersByToken[user.token] = cacheUser;
    }
    updateUserData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.getUser(id);
            if (user)
                this.updateCaches(user);
        });
    }
    loadAllUserFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            let allUsers = yield this.db.getAllUsers();
            this.cacheUsersByToken = {};
            allUsers.forEach((user) => this.updateCaches(user));
        });
    }
    registration(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.db.addUser(data))
                this.loadAllUserFromDB();
            return true;
        });
    }
    login(data) {
        const { login, password } = data;
        const user = this.getUserByLogin(login);
        if (user) {
            const data = user.auth(password);
            if (data) {
                this.db.setUserToken(user.id, hash(Math.random()));
                this.updateUserData(user.id);
            }
            return data;
        }
        return false;
    }
    logout(token) {
        const user = this.getUserByToken(token);
        if (user) {
            if (user.logout()) {
                delete (this.cacheUsersByToken[token]);
                this.db.setUserToken(user.id, null);
                this.updateUserData(user.id);
                return true;
            }
        }
        return false;
    }
}
exports.default = UserManager;
