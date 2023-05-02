

//const DB = require('../application/modules/DB/DB');

import md5 from "md5";
import DB from "../application/modules/DB/DB";
import { TUser } from "../application/modules/Types";
import CONFIG from "../config";

const initCb = () => {

}

describe('setUserToken', () => {
    const { DB_CONNECT } = new CONFIG;
    const db = new DB({ ...DB_CONNECT, initCb });
    let user: TUser;
    test('Пользователь Test существует', async () => {
        user = await db.getUserByLogin('test');
        console.log(user);
        expect(user.name).toEqual('Test');
    });
    test('Токен изменяется на md5', async () => {
        const md5Token = Math.random().toString();
        await db.setUserToken(user.id, md5Token);
        user = await db.getUserByLogin('test');
        expect(user.token).toEqual(md5Token);
    });
    test('Заменяем токен на null', async () => {
        await db.setUserToken(user.id, null);
        user = await db.getUserByLogin('test');
        expect(user.token).toEqual(null);
    });
})