"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = __importDefault(require("md5"));
class User {
    constructor(data) {
        this.id = data.id;
        this.token = data.token;
        this.login = data.login;
        this.password = data.password;
        this.name = data.name;
    }
    get() {
        return {
            id: this.id,
            name: this.name
        };
    }
    verification(token) {
        return (this.token === token);
    }
    auth(password) {
        if (password === this.password) {
            this.token = (0, md5_1.default)(Math.random().toString());
            return {
                id: this.id,
                token: this.token,
                name: this.name
            };
        }
        return null;
    }
    logout() {
        this.token = null;
        return true;
    }
    updateData(data) {
        this.token = data.token;
        this.password = data.password;
        this.name = data.name;
    }
}
exports.default = User;
