"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CONFIG {
    constructor() {
        this.PORT = 3001;
        this.DB_CONNECT = {
            NAME: './application/modules/DB/SeaRunner.db'
        };
        this.MEDIATOR = {
            EVENTS: {
                CHANGE_USERS: 'CHANGE_USERS',
                CHANGE_USER: 'CHANGE_USER'
            },
            TRIGGERS: {
                GET_USER_BY_TOKEN: 'GET_USER_BY_TOKEN',
                GET_USER: 'GET_USER',
                LOG_IN: 'LOG_IN',
                LOG_OUT: 'LOG_OUT',
                REGISTRATION: 'REGISTRATION',
                GET_MESSAGES: 'GET_MESSAGES',
                GET_CHAT_HASH: 'GET_CHAT_HASH',
                ADD_MESSAGE: 'ADD_MESSAGE'
            }
        };
    }
}
exports.default = CONFIG;
