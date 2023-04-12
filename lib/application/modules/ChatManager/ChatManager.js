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
class ChatManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.cacheUserMessages = {};
        this.cacheAllMessages = [];
        if (!this.io)
            return;
        const { GET_MESSAGES_ALL, GET_MESSAGES, GET_CHAT_HASH, ADD_MESSAGE } = this.mediator.getTriggersNames();
        this.mediator.set(GET_MESSAGES, (id) => this.getAllMessagesToUser(id));
        this.mediator.set(ADD_MESSAGE, (newMessage) => this.addMessage(newMessage));
        this.mediator.set(GET_CHAT_HASH, () => this.getChatHash());
        this.mediator.subscribe(this.EVENTS.USER_LOADED, (socket) => this.sendMessageHandler(socket));
        this.setMessagesToAll();
    }
    sendMessageHandler(socket) {
        if (socket.user) {
            socket.emit(this.MESSAGES.GET_MESSAGES_ALL, this.getMessagesToAll());
            socket.emit(this.MESSAGES.GET_MESSAGES_PRIVATE, this.getMessagesToUser(socket.user.get().id));
        }
        socket.on(this.MESSAGES.SEND_MESSAGE, (userIdTo, message, token) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if ((_a = socket.user) === null || _a === void 0 ? void 0 : _a.verification(token)) {
                const userIdFrom = socket.user.get().id;
                const result = yield this.addMessage({ userIdFrom, userIdTo, message });
                if (result) {
                    if (userIdTo) {
                        this.io.to(`${userIdTo}`).emit(this.MESSAGES.GET_MESSAGES_PRIVATE, this.getMessagesToUser(userIdTo));
                        this.io.to(`${userIdFrom}`).emit(this.MESSAGES.GET_MESSAGES_PRIVATE, this.getMessagesToUser(userIdFrom));
                    }
                    else
                        this.io.to('online_users').emit(this.MESSAGES.GET_MESSAGES_ALL, this.getMessagesToAll());
                }
            }
        }));
    }
    setMessagesToAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cacheAllMessages = yield this.db.getMessagesToAll();
        });
    }
    setMessagesToUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cacheUserMessages[userId] = yield this.db.getMessagesToUser(userId);
        });
    }
    getMessagesToUser(userId) {
        return this.cacheUserMessages[userId];
    }
    getMessagesToAll() {
        return this.cacheAllMessages;
    }
    getAllMessagesToUser(userId) {
        if (this.cacheUserMessages[userId]) {
            this.setMessagesToUser(userId);
        }
        const messages = this.getMessagesToAll().concat(this.getMessagesToUser(userId));
        return messages.sort((a, b) => a.id - b.id);
    }
    getChatHash() {
    }
    addMessage(newMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.db.addMessage(newMessage)) {
                if (newMessage.userIdTo) {
                    yield this.setMessagesToUser(newMessage.userIdTo);
                    yield this.setMessagesToUser(newMessage.userIdFrom);
                }
                else
                    yield this.setMessagesToAll();
                return true;
            }
            ;
            return false;
        });
    }
}
exports.default = ChatManager;
