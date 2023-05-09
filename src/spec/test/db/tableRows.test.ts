import DB from "../../../application/modules/DB/DB";
import { Tables } from "../../../application/modules/Types";
import CONFIG from "../../../config";
import { Client } from 'pg';

const DB_forTest = new Client ({
    host: 'localhost',
    port: 5432,
    database: 'searunner',
    user: 'postgres',
    password: '111'
});

(async () => {
    await DB_forTest.connect();
})();

function randomString(i: number) {
    var rnd = '';
    while (rnd.length < i) 
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};

const initCb = () => {}

describe('tableRows', () => {

    const { DB_CONNECT } = new CONFIG;
    const db = new DB({ ...DB_CONNECT, initCb });
    const login = randomString(8);
    const password = randomString(8);
    const name = randomString(8);
    test('find', async () => {
        let tables = await db.find(Tables.users, 8);
        expect(tables).not.toBeNull();
        expect(tables).toHaveProperty('login');
    });
    test('addRecord', async () => {
        let newTable = Tables.users;
        let fields = {
            login: login,
            password: password,
            name: name
        }
        const result = await db.addRecord(newTable, fields);
        expect(result).not.toBeUndefined();
        expect(result).toEqual(
            expect.objectContaining({
              name: name
            }));
        (async ()=> {
            const res = await DB_forTest.query(`DELETE FROM users WHERE login = '${login}'`);
        })();
    });
});