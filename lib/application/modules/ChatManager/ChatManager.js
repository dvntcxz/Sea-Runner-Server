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
const Message_1 = __importDefault(require("./Message"));
var hash = require('md5');
class ChatManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.userMessages = {};
        this.allMessages = {};
        this.chatHash = '';
        const { GET_MESSAGES, GET_CHAT_HASH, ADD_MESSAGE } = this.mediator.getTriggersNames();
        (() => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getMessagesAll();
            console.log(user);
        }))();
    }
    getMessagesByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db.allMessagesThisUser(id);
            data.forEach((message) => {
                this.userMessages[message.id] = new Message_1.default(message.userIdFrom, message.userIdTo, message.message);
            });
            return this.userMessages;
        });
    }
    getMessagesAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db.getMessagesToAll();
            data.forEach((message) => {
                this.allMessages[message.id] = new Message_1.default(message.userIdFrom, message.userIdTo, message.message);
            });
            return this.allMessages;
        });
    }
    getChatHash() {
        return this.chatHash;
    }
}
exports.default = ChatManager;
