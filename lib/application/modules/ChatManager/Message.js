"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(from, text, to) {
        this.from = from;
        this.text = text;
        this.to = to;
    }
    get() {
        return {
            from: this.from.get(),
            message: this.text,
            to: this.to.get()
        };
    }
    canRead(user) {
        if (user === this.from || user === this.to)
            return true;
        return false;
    }
}
exports.default = Message;
