"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(userIdFrom, userIdTo, message) {
        this.userIdFrom = userIdFrom;
        this.userIdTo = userIdTo;
        this.message = message;
    }
}
exports.default = Message;
