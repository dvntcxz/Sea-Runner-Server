"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cache {
    constructor() {
        this.cache = {};
    }
    set(key, value) {
        this.cache[key] = value;
    }
    get(key) {
        return this.cache[key];
    }
    getAll() {
        return this.cache;
    }
    remove(key) {
        delete this.cache[key];
    }
    delete() {
        this.cache = {};
    }
    forAll(func) {
        Object.values(this.cache).forEach((value) => func(value));
    }
}
exports.default = Cache;
