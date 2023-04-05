export default class CONFIG{
    public PORT:number = 3001;

    DB_CONNECT = {
        NAME: './application/modules/DB/SeaRunner.db'
    }

    public MESSAGES: { [key: string]:string } = {
        SEND_MESSAGE: 'SEND_MESSAGE',
        GET_MESSAGES: 'GET_MESSAGES'
    }

    public MEDIATOR:{
        [key: string]: {[key: string]:string}
    } = {
        EVENTS:{
            CHANGE_USERS:'CHANGE_USERS',
            CHANGE_USER:'CHANGE_USER'
        },
        TRIGGERS:{
            GET_USER_BY_TOKEN: 'GET_USER_BY_TOKEN',
            GET_USER: 'GET_USER',
            LOG_IN: 'LOG_IN',
            LOG_OUT: 'LOG_OUT',
            REGISTRATION: 'REGISTRATION',
            GET_ALL_USERS: 'GET_ALL_USERS',
            GET_MESSAGES:'GET_MESSAGES', 
            GET_CHAT_HASH:'GET_CHAT_HASH', 
            ADD_MESSAGE: 'ADD_MESSAGE'
        }
    }
}