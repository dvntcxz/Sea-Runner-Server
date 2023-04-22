import { Client } from 'pg';
import ORM from './ORM';
import { IUser, TUsers, TShips, IUserData, TMessages, IMessageData, IShipData, ICaptainData, TCaptainData, ICaptain, TCaptains, TRoom } from '../Types';

export default class DB {
    private db;
    private orm;
    constructor(options: {
        HOST: string,
        PORT: number,
        NAME: string,
        USER: string,
        PASS: string,
        initCb: Function
    }) {
        const { HOST, PORT, NAME, USER, PASS, initCb = () => { } } = options;
        this.db = new Client({
            host: HOST,
            port: PORT,
            databaase: NAME,
            user: USER,
            passsword: PASS
        });
        //run UPDATE,INSERT, DELETE
        //get SELECT for только для одной
        //all SELECT for для НЕСКОЛЬКИХ
        (async () => {
            await this.db.connect();
            this.orm = new ORM(this.db);
            initCb();

            /*const query = 'SELECT * FROM users WHERE id=$1::integer';
            const users = await this.db.query(query, [1]).rows?.[0];
            console.log(users);*/
            try {
                const query = 'INSERT INTO users (login, password) VALUES ($1, $2)';
                const result = await this.db.query(query, ['masha2', '3212']);
                console.log('result', result);
            } catch (e: any) {
                console.log(e.code);
            }
        })();
    }

    destructor() {
        if (this.db) {
            this.db.end();
            this.db = null;
        }
    }

    ////////////////////////////
    //////////USER//////////////
    ////////////////////////////

    public getUser(id: number) {
        return this.orm.get<IUser>('users', id);
    }

    public getUserByLogin(login: string) {
        return this.orm.get<IUser>('users', { login });
    }

    public addUser(data: IUserData) {
        return this.orm.insert('users', [data]).run();
    }

    public setUserToken(userId: number, token: string | null) {
        return this.orm.update('users', userId, { token });
    }

    public async updateUser(id: number, field: object) {
        return this.orm.update('users', id, field);
    }

    ////////////////////////////
    //////////CAPTAIN///////////
    ////////////////////////////

    public addCaptain(captain: ICaptainData) {
        return this.orm.insert('captains', [captain]).run();
    }

    public getCaptain(userId: number) {
        return this.orm.get<ICaptain>('captains', userId);
    }

    public getCaptains() {
        return this.orm.all('captains').all<TCaptains>();
    }

    public updateCaptain(userId: number, captain: TCaptainData) {
        return this.orm.update('captains', userId, captain);
    }

    ////////////////////////////
    //////////SHIP//////////////
    ////////////////////////////

    public addShip(ship: IShipData) {
        return this.orm.insert('ships', [ship]).run();
    }

    public updateShip(userId: number) {
        return this.orm.update('ships', userId, { name });
    }

    public getShips() {
        return this.orm.all('ships').all<TShips>();
    }


    ////////
    //Chat//
    ////////

    public getMessages(roomGuid: string) {
        return new Promise<TMessages>((resolve) => {
            this.db.all('SELECT messages.userIdFrom, users.name, messages.message, rooms.type FROM messages,users, rooms WHERE users.id = messages.userIdFrom AND rooms.guid = messages.roomGuid AND messages.roomGuid=? ',
                [roomGuid],
                (error: any, rows: any) => resolve((error ? [] : rows)))
        });
    }

    public getRoom(guid: string) {
        return this.orm.get<TRoom>('rooms', { guid });
    }

    public addRoom(guid: string, type: string) {
        return this.orm.insert('rooms', [{ guid, type }]).run()
    }

    public addUserToRoom(roomGuid: string, userId: number) {
        return this.orm.insert('roomsUsers', [{ roomGuid, userId }]).run()
    }

    public getRoomUserById(roomGuid: string, userId: number) {
        return this.orm.get<string>('roomsUsers', { roomGuid, userId });
    }

    public getPrivateRoom(userId_1: number, userId_2: number) {
        return 1;
    }

    public addMessage(roomGuid: string, userIdFrom: number, message: string) {
        return this.orm.insert('messages', [{ roomGuid, userIdFrom, message }]).run();
    }

    public editMessage(id: number, message: string) {
        return this.orm.update('messages', id, { message });
    }

    public deleteMessages(id: number) {
        return this.orm.delete('messages', id)
    }

    public deleteUser(id: number) {
        return this.orm.delete('users', id);
    }

    /////////////////////////////
    /////////////ITEMS///////////
    /////////////////////////////

    public addNewItem(guid: string, typeId: number) {
        return this.orm.insert('items', [{ guid, typeId }])
    }

    public getItem(guid: string) {
        return this.orm.get('items', { guid });
    }

    public addItemTo(ownerId: number, cellNumber: number, guid: string) {
        return this.orm.insert('items', [{ ownerId, cellNumber, guid }])
    }

    public getTypesItems() {
        return this.orm.all('typesItems');
    }

    /////////////////////////////
    /////////////TOWNS///////////
    /////////////////////////////

    public getTowns() {
        return this.orm.all('towns');
    }

    /////////////////////////////
    /////////////PORTS///////////
    /////////////////////////////

    public getPorts() {
        return this.orm.all('ports');
    }

    /////////////////////////////
    /////////////FORTS///////////
    /////////////////////////////

    public getForts() {
        return this.orm.all('forts');
    }

    //typesItems и alliances
    /////////////////////////////
    /////////////ALLIANCES///////////
    /////////////////////////////

    public getAlliances() {
        return this.orm.all('alliances');
    }
}