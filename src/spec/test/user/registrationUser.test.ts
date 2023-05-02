import DB from "../../../application/modules/DB/DB";
import CONFIG from "../../../config";
import User from "../../../application/modules/UserManager/User";

function randomString(i: number) {
    var rnd = '';
    while (rnd.length < i) 
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

const initCb = () => {}

describe('User.registration', () => {
    const { DB_CONNECT } = new CONFIG;
    const db = new DB({ ...DB_CONNECT, initCb });
    const user = new User('123',db);
    const newLogin = randomString(8);
    const password = randomString(8);
    const name = randomString(10);
    test('Регистрируем рандомного пользователя', async () => {
        const result = await user.registration(newLogin, password, name);
        expect(result).toEqual(true);
    });
    test('Повторная регистрация', async () => {
        const result = await user.registration(newLogin, password, name);
        expect(result).toEqual(false);
    });
    test('Попытка входа', async () => {
        const result = await user.auth(newLogin, password);
        expect(user.getClientData().token).not.toBeNull();
    });
})