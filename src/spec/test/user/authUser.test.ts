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

describe('User.auth', () => {
    const { DB_CONNECT } = new CONFIG;
    const db = new DB({ ...DB_CONNECT, initCb });
    const user = new User('123',db);
    const login = 'test'
    const password = 'test'
    const name = 'Test';
    test('Неправильный пароль', async () => {
        const result = await user.auth(login, '1234');
        expect(result).toEqual(false);
    });
    test('Попытка входа', async () => {
        const result = await user.auth(login, password);
        expect(result).toEqual(true);
        const data = user.getClientData()
        expect(data.token).not.toBeNull();
        expect(data.name).toBe(name);
    });
    test('Повторный вход', async () => {
        const oldToken = user.getClientData().token;
        const result = await user.auth(login, password);
        expect(user.getClientData().token).not.toBeNull();
        expect(user.getClientData().token).not.toBe(oldToken);
    });
})