export default class CONFIG{
    public PORT:number = 3001;

    public MEDIATOR:{
        [key: string]: {[key: string]:string}
    } = {
        EVENTS:{
            TEST_1:'TEST_1',
            TEST_2:'TEST_2'
        },
        TRIGGERS:{
            GET_USER_BY_TOKEN: 'GET_USER_BY_TOKEN',
            GET_USER: 'GET_USER',
            LOG_IN: 'LOG_IN',
            LOG_OUT: 'LOG_OUT',
            REGISTRATION: 'REGISTRATION',
            GET_MESSAGES:'GET_MESSAGES', 
            GET_CHAT_HASH:'GET_CHAT_HASH', 
            ADD_MESSAGE: 'ADD_MESSAGE'
        }
    }
}