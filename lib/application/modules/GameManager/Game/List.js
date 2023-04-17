"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class List {
    constructor() {
        this.HEAD = null;
        this.id = 0;
    }
    getId() {
        this.id++;
        return this.id;
    }
    newList(func, time, delta = null) {
        return {
            prev: null,
            next: null,
            func,
            delta,
            time,
            id: this.getId()
        };
    }
    add(NEW) {
        if (NEW) {
            let top = this.HEAD;
            while (top && top.time < NEW.time) {
                top = top.next;
            }
            this.insert(NEW, top);
            return NEW.id;
        }
    }
    insert(NEW, NEXT) {
        if (NEW) {
            if (NEXT) {
                const PREV = NEXT.prev;
                NEXT.prev = NEW;
                NEW.next = NEXT;
                if (PREV) {
                    PREV.next = NEW;
                    NEW.prev = PREV;
                }
                else
                    this.HEAD = NEW;
            }
            else {
                this.HEAD = NEW;
            }
        }
    }
    get() {
        return this.HEAD;
    }
    pop() {
        if (this.HEAD) {
            if (this.HEAD.delta) {
                this.HEAD.time += this.HEAD.delta;
                this.add(this.HEAD);
            }
            ;
            this.HEAD.func();
            this.HEAD = this.HEAD.next;
        }
        return this.HEAD;
    }
}
exports.default = List;
