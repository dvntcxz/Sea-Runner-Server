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
var hash = require('md5');
class ChatManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.cacheUserMessages = {};
        this.cacheAllMessages = [];
        this.chatHash = hash(Math.random());
        const { GET_MESSAGES_ALL, GET_MESSAGES, GET_CHAT_HASH, ADD_MESSAGE } = this.mediator.getTriggersNames();
        this.mediator.set(GET_MESSAGES, (id) => this.getAllMessagesToUser(id));
        this.mediator.set(ADD_MESSAGE, (newMessage) => this.addMessage(newMessage));
        this.mediator.set(GET_CHAT_HASH, () => this.getChatHash());
        this.setMessagesToAll();
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
        return this.chatHash;
    }
    addMessage(newMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.db.addMessage(newMessage)) {
                if (newMessage.userIdTo) {
                    this.setMessagesToUser(newMessage.userIdTo);
                    this.setMessagesToUser(newMessage.userIdFrom);
                }
                else
                    this.setMessagesToAll();
                this.chatHash = hash(Math.random());
                return true;
            }
            ;
            return false;
        });
    }
}
exports.default = ChatManager;
