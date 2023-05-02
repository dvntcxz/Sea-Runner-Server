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
        this.users = new Cache_1.default;
        const { LOG_IN, LOG_OUT, REGISTRATION } = this.MESSAGES;
        //io
        if (!this.io)
            return;
        this.io.on('connection', (socket) => {
            socket.on(LOG_IN, (login, password, cbLogin) => this.login(socket, login, password, cbLogin));
            socket.on(REGISTRATION, (login, password, name, cbRegistration) => this.registration(socket, login, password, name, cbRegistration));
            socket.on(LOG_OUT, (token, cbLogout) => this.logout(socket, token, cbLogout));
            socket.on('disconnect', () => this.disconnect(socket));
        });
        //Mediator Triggers
        const { GET_USER } = this.TRIGGERS;
        this.mediator.set(GET_USER, (socketId) => this.getUser(socketId));
        //Mediator Events
    }
    login(socket, login, password, cbLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default(socket.id, this.db);
            if (yield user.auth(login, password)) {
                const userData = user.getClientData();
                this.users.set(socket.id, user);
                cbLogin(userData);
            }
            else
                cbLogin(null);
        });
    }
    userOffline(user) {
        this.mediator.call(this.EVENTS.USER_LOG_OUT, user);
        this.users.remove(user.getSocketId());
        user.logout();
    }
    disconnect(socket) {
        const user = this.getUser(socket.id);
        if (user)
            this.userOffline(user);
    }
    getUser(socketId) {
        return this.users.get(socketId) || null;
    }
    registration(socket, login, password, name, cbRegistration) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default(socket.id, this.db);
            cbRegistration(yield user.registration(login, password, name));
        });
    }
    logout(socket, token, cbLogout) {
        let result = false;
        if (token) {
            const user = this.getUser(socket.id);
            if (user === null || user === void 0 ? void 0 : user.verification(token)) {
                this.userOffline(user);
                result = true;
            }
        }
        cbLogout();
    }
}
exports.default = UserManager;
