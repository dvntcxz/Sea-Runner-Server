import DB from "../../../application/modules/DB/DB";
import CONFIG from "../../../config";
import User from "../../../application/modules/UserManager/User";

const initCb = () => {}

describe('User.auth', () => {
    const { DB_CONNECT } = new CONFIG;
    const db = new DB({ ...DB_CONNECT, initCb });
    const user = new User(db);
    const login = 'test'
    const password = 'test'
    const name = 'Test';
    test('Неправильный пароль', async () => {
        const result = await user.auth(login, '1234','');
        expect(result).toEqual(false);
    });
    test('Попытка входа', async () => {
        const result = await user.auth(login, password,'');
        expect(result).toEqual(true);
        const data = user.getData()
        expect(data.token).not.toBeNull();
        expect(data.name).toBe(name);
    });
    test('Повторный вход', async () => {
        const oldToken = user.getData().token;
        const result = await user.auth(login, password,'');
        expect(user.getData().token).not.toBeNull();
        expect(user.getData().token).not.toBe(oldToken);
    });
})