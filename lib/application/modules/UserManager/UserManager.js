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
class UserManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.users = {};
        //Mediator Triggers
        const { GET_USER_BY_TOKEN, GET_USER, LOG_IN, LOG_OUT, REGISTRATION } = this.TRIGGERS;
        this.mediator.set(GET_USER_BY_TOKEN, (id, token) => this.getUserByToken(id, token));
        this.mediator.set(GET_USER, (id) => this.getUser(id));
        this.mediator.set(LOG_IN, (data) => this.login(data));
        this.mediator.set(LOG_OUT, (id, token) => this.logout(id, token));
        this.mediator.set(REGISTRATION, (data) => this.registration(data));
        //Mediator Events
        const { CHANGE_USERS, CHANGE_USER } = this.EVENTS;
        this.mediator.subscribe('CHANGE_USERS', () => this.loadAllUserFromDB());
        this.mediator.subscribe('CHANGE_USER', (id) => this.updateUserData(id));
        this.loadAllUserFromDB();
    }
    getUserByToken(id, token) {
        const user = this.users[id];
        return (user.verification(token)) ? user : null;
    }
    getUser(id) {
        return this.users[id];
    }
    getUserByLogin(login) {
        return Object.values(this.users).find((user) => user.login === login);
    }
    updateUserData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db.getUser(id);
            if (data)
                this.users[id].updateData(data);
        });
    }
    loadAllUserFromDB() {
        return __awaiter(this, void 0, void 0, function* () {
            let allUsers = yield this.db.getAllUsers();
            allUsers.forEach((user) => {
                this.users[user.id] = new User_1.default(user);
            });
        });
    }
    registration(data) {
        this.db.addUser(data);
        return true;
    }
    login(data) {
        const { login, password } = data;
        const user = this.getUserByLogin(login);
        if (user)
            return user.auth(password);
        return false;
    }
    logout(id, token) {
        const user = this.getUserByToken(id, token);
        if (user) {
            return user.logout();
        }
        return false;
    }
}
exports.default = UserManager;
