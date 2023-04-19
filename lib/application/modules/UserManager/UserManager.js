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
        const messages = [];
        const { LOG_IN, LOG_OUT, REGISTRATION } = this.MESSAGES;
        //io
        if (!this.io)
            return;
        this.io.on('connection', (socket) => {
            socket.on(LOG_IN, (login, password) => this.login(socket, login, password));
            socket.on(REGISTRATION, (login, password, name) => this.registration(socket, login, password, name));
            socket.on(LOG_OUT, (token) => this.logout(socket, token));
            socket.on('disconnect', () => this.disconnect(socket));
        });
        //Mediator Triggers
        const { GET_USER } = this.TRIGGERS;
        this.mediator.set(GET_USER, (socketId) => this.getUser(socketId));
        //Mediator Events
        const { USER_LOG_IN } = this.EVENTS;
    }
    login(socket, login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default(socket.id, this.db);
            console.log(login, password);
            if (yield user.auth(login, password)) {
                const userData = user.get();
                this.users.set(socket.id, user);
                socket.emit(this.MESSAGES.LOG_IN, userData);
            }
            socket.emit(this.MESSAGES.LOG_IN, false);
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
    registration(socket, login, password, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.default(socket.id, this.db);
            socket.emit(this.MESSAGES.REGISTRATION, yield user.registration(login, password, name));
        });
    }
    logout(socket, token) {
        let result = false;
        if (token) {
            const user = this.getUser(socket.id);
            if (user === null || user === void 0 ? void 0 : user.verification(token)) {
                this.userOffline(user);
                result = true;
            }
        }
        socket.emit(this.MESSAGES.LOG_OUT, result);
    }
}
exports.default = UserManager;
