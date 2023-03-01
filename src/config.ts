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
            GET_INFO_TEST_1: 'GET_INFO_TEST_1'
        }
    }
}