import DB from "../../../application/modules/DB/DB";
import { Tables } from "../../../application/modules/Types";
import CONFIG from "../../../config";

const initCb = () => {}

describe('tables', () => {

    const { DB_CONNECT } = new CONFIG;
    const db = new DB({ ...DB_CONNECT, initCb });
    test('find', async () => {
        let tables = await db.find(Tables.users, 8);
        expect(tables).not.toBeNull();
        expect(tables).toHaveProperty('login');
    });
    test('addRecord', async () => {
        let newTable = Tables.users;
        let fields = {
            login: 'Pooteen',
            password: 'blabla',
            name: 'vlad'
        }
        const result = await db.addRecord(newTable, fields);
        expect(result).not.toBeUndefined();
        expect(result).toEqual(
            expect.objectContaining({
              name: 'vlad'
            }))
    });
});