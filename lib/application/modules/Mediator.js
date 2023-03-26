"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mediator {
    constructor(EVENTS, TRIGGERS) {
        this.EVENTS = EVENTS;
        this.TRIGGERS = TRIGGERS;
        this.events = {};
        this.triggers = {};
        Object.values(EVENTS).forEach(value => this.events[value] = []);
        Object.values(TRIGGERS).forEach(value => this.triggers[value] = () => { return null; });
    }
    //about triggers
    getTriggersNames() {
        return this.TRIGGERS;
    }
    set(name, func) {
        if (this.triggers[name] && func instanceof Function) {
            this.triggers[name] = func;
        }
    }
    get(name, data) {
        if (name && this.triggers[name] instanceof Function) {
            return this.triggers[name](data);
        }
        return null;
    }
    //about events
    getEventsNames() {
        return this.EVENTS;
    }
    subscribe(name, func) {
        if (this.events[name] && func instanceof Function) {
            this.events[name].push(func);
        }
    }
    call(name, data) {
        if (name && this.events[name]) {
            this.events[name].forEach(event => {
                if (event instanceof Function)
                    event(data);
            });
        }
    }
}
exports.default = Mediator;
