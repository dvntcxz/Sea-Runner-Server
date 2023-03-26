"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Manager {
    constructor(options) {
        this.mediator = options.mediator;
        this.db = options.db;
        this.EVENTS = this.mediator.getEventsNames();
        this.TRIGGERS = this.mediator.getTriggersNames();
    }
}
exports.default = Manager;
