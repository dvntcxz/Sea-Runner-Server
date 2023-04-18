"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CONFIG {
    constructor() {
        this.PORT = 3001;
        this.DB_CONNECT = {
            NAME: './application/modules/DB/SeaRunner.db'
        };
        this.MESSAGES = {
            SEND_MESSAGE: 'SEND_MESSAGE',
            GET_MESSAGES_ALL: 'GET_MESSAGES_ALL',
            GET_MESSAGES_PRIVATE: 'GET_MESSAGES_PRIVATE',
            LOG_IN: 'LOG_IN',
            REGISTRATION: 'REGISTRATION',
            LOG_OUT: 'LOG_OUT',
            GAME_LOADED: 'GAME_LOADED'
        };
        this.MEDIATOR = {
            EVENTS: {
                CHANGE_USERS: 'CHANGE_USERS',
                CHANGE_USER: 'CHANGE_USER',
                USER_LOG_IN: 'USER_LOG_IN',
                USER_LOADED: 'USER_LOADED'
            },
            TRIGGERS: {
                GET_USER_BY_TOKEN: 'GET_USER_BY_TOKEN',
                GET_USER: 'GET_USER',
                LOG_IN: 'LOG_IN',
                LOG_OUT: 'LOG_OUT',
                REGISTRATION: 'REGISTRATION',
                GET_ALL_USERS: 'GET_ALL_USERS',
                GET_MESSAGES: 'GET_MESSAGES',
                GET_CHAT_HASH: 'GET_CHAT_HASH',
                ADD_MESSAGE: 'ADD_MESSAGE',
                SEND_ALL: 'SEND_ALL'
            }
        };
    }
}
exports.default = CONFIG;