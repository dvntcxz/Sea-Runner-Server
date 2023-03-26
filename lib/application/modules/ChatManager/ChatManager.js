"use strict";
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
        this.messages = [];
        this.chatHash = '';
        const { GET_MESSAGES, GET_CHAT_HASH, ADD_MESSAGE } = this.mediator.getTriggersNames();
    }
    getMessages(user) {
        const answer = [];
        this.messages.forEach(message => {
            if (message && message.canRead(user))
                answer.push(message);
        });
        return answer;
    }
    getChatHash() {
        return this.chatHash;
    }
    addMassage(from, text, to) {
        this.messages.push(new Message_1.default(from, text, to));
        this.chatHash = hash(Math.random());
        return true;
    }
}
exports.default = ChatManager;
