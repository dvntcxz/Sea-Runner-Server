"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash = require('md5');
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
            this.token = hash(Math.random());
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
