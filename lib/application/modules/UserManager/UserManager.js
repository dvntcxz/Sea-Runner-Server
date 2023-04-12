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
const Cache_1 = __importDefault(require("../Cache"));
const Manager_1 = __importDefault(require("../Manager"));
const User_1 = __importDefault(require("./User"));
class UserManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.cacheUsersById = new Cache_1.default;
        this.cacheUsersByLogin = new Cache_1.default;
        const messages = [];
        //io
        if (!this.io)
            return;
        this.io.on('connection', (socket) => this.connectHandler(socket));
        //Mediator Triggers
        const { GET_USER_BY_TOKEN, GET_USER, LOG_IN, LOG_OUT, REGISTRATION, GET_ALL_USERS } = this.TRIGGERS;
        this.mediator.set(GET_USER, (id) => this.getUser(id));
        this.mediator.set(LOG_IN, (data) => this.login(data));
        this.mediator.set(REGISTRATION, (data) => this.registration(data));
        this.mediator.set(GET_ALL_USERS, () => this.getAllUsers());
        //Mediator Events
        const { USER_LOG_IN, CHANGE_USERS, CHANGE_USER } = this.EVENTS;
        this.mediator.subscribe(CHANGE_USERS, () => this.loadAllUserFromDB());
        this.mediator.subscribe(CHANGE_USER, (id) => this.updateUserData(id));
        this.mediator.subscribe(USER_LOG_IN, (socket) => this.logoutHandler(socket));
        this.loadAllUserFromDB();
    }
    connectHandler(socket) {
        this.registrationHandler(socket);
        this.loginHandler(socket);
        this.disconnectHandler(socket);
    }
    registrationHandler(socket) {
        socket.on(this.MESSAGES.REGISTRATION, (data) => {
            const result = this.registration(data);
            socket.emit(this.MESSAGES.REGISTRATION, result);
        });
    }
    loginHandler(socket) {
        socket.on(this.MESSAGES.LOG_IN, (data) => {
            const UserData = this.login(data);
            if (UserData) {
                socket.user = this.getUser(UserData.id);
                socket.join(`${UserData.id}`);
                socket.join(`online_users`);
                this.mediator.call(this.EVENTS.USER_LOG_IN, socket);
            }
            socket.emit(this.MESSAGES.LOG_IN, UserData);
        });
    }
    logoutHandler(socket) {
        socket.on(this.MESSAGES.LOG_OUT, (token) => {
            var _a;
            if ((_a = socket.user) === null || _a === void 0 ? void 0 : _a.verification(token)) {
                (this.logout(socket.user)) ? socket.emit(this.MESSAGES.LOG_OUT) : socket.emit(this.MESSAGES.LOG_OUT_ERROR);
            }
        });
    }
    disconnectHandler(socket) {
        socket.on('disconnect', () => {
            if (socket.user) {
                this.logout(socket.user);
                socket.leave('online_users');
                socket.leave(`${socket.user.id}`);
            }
        });
    }
    getUser(id) {
        return this.cacheUsersById.get(id) || null;
    }
    getUserByLogin(login) {
        return this.cacheUsersByLogin.get(login) || null;
        ;
    }
    updateCaches(user) {
        const cacheUser = new User_1.default(user);
        this.cacheUsersById.set(user.id, cacheUser);
        this.cacheUsersByLogin.set(user.login, cacheUser);
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
            if (allUsers) {
                allUsers.forEach((user) => this.updateCaches(user));
            }
        });
    }
    registration(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.db.addUser(data)) {
                this.loadAllUserFromDB();
                return true;
            }
            ;
            return false;
        });
    }
    login(data) {
        const { login, password } = data;
        const user = this.getUserByLogin(login);
        if (user) {
            const data = user.auth(password);
            if (data) {
                this.db.setUserToken(user.id, data.token);
            }
            return data;
        }
        return false;
    }
    logout(user) {
        if (user.logout()) {
            this.db.setUserToken(user.id, null);
            return true;
        }
        return false;
    }
    getAllUsers() {
        return Object.values(this.cacheUsersById).map(user => user.get());
    }
}
exports.default = UserManager;
