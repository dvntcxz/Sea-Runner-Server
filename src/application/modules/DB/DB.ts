import { Database } from 'sqlite3';
import ORM from './ORM';
import { IUser, TUsers, TShips, IUserData, TMessages, IMessageData, IShipData, ICaptainData, TCaptainData, ICaptain, TCaptains } from '../Types';

export default class DB {
    private db;
    private orm;
    constructor(options: { NAME: string }) {
        this.db = new Database(options.NAME);
        //run UPDATE,INSERT, DELETE
        //get SELECT for только для одной
        //all SELECT for для НЕСКОЛЬКИХ
        this.orm = new ORM(this.db);
    }

    ////////////////////////////
    //////////USER//////////////
    ////////////////////////////

    public getUser(id: number) {
        return this.orm.get<IUser>('users', id);
    }

    public getUserByLogin(login: string) {
        return this.orm.get<IUser>('users', [login]);
    }

    public addUser(data: IUserData) {
        return this.orm.insert('users',[data]).do();
    }

    public setUserToken(userId: number, token: string | null) {
        return this.orm.update('users', userId, {token});
    }

    public async updateUser(id: number, field: object) {
        return this.orm.update('users', id, field);
    }

    ////////////////////////////
    //////////CAPTAIN///////////
    ////////////////////////////

    public addCaptain(captain: ICaptainData) {
        return this.orm.insert('captains', [captain]).do();
    }

    public getCaptain(userId: number) {
        return this.orm.get<ICaptain>('captains', userId);
    }

    public getCaptains() {
        return this.orm.all('captains').do<TCaptains>();
    }

    public updateCaptain(userId: number, captain: TCaptainData) {
        return this.orm.update('captains', userId, captain);
    }

    ////////////////////////////
    //////////SHIP//////////////
    ////////////////////////////

    public addShip(ship: IShipData) {
        return this.orm.insert('ships', [ship]).do();
    }

    public updateShip(userId: number) {
        return this.orm.update('ships', userId, { name });
    }

    public getShips() {
        return this.orm.all('ships').do<TShips>();
    }


    ////////
    //Chat//
    ////////

    public getMessagesToUser(userId: number) {
        return new Promise<TMessages>((resolve) => {
            this.db.all('SELECT * FROM messages WHERE userIdTo=? or (userIdFrom=? AND userIdTo is NOT NULL)',
                [userId],
                (error: any, rows: any) => resolve((error ? [] : rows)))
        });
    }

    public getMessagesToAll() {
        return new Promise<TMessages>((resolve) => {
            this.db.all('SELECT * FROM messages WHERE userIdTo is NULL',
                (error: any, rows: any) => resolve((error ? [] : rows)))
        });
    }

    public addMessage(newMessage: IMessageData) {
        return this.orm.insert('messages', [newMessage]).do();
    }

    public editMessage(id: number, message: string) {
        return this.orm.update('messages', id, {message});
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

    public addNewItem(guid: string, typeId: number){
        return this.orm.insert('items',[{guid, typeId}])
    }

    public getItem(guid: string){
        return this.orm.get('items',{guid});
    }

    public addItemTo(ownerId: number, cellNumber: number, guid: string){
        return this.orm.insert('items',[{ownerId, cellNumber, guid}])
    }

    public getTypesItems(){
        return this.orm.all('typesItems');
    }

    /////////////////////////////
    /////////////TOWNS///////////
    /////////////////////////////

    public getTowns(){
        return this.orm.all('towns');
    }

    /////////////////////////////
    /////////////PORTS///////////
    /////////////////////////////

    public getPorts(){
        return this.orm.all('ports');
    }

    /////////////////////////////
    /////////////FORTS///////////
    /////////////////////////////

    public getForts(){
        return this.orm.all('forts');
    }

    //typesItems и alliances
    /////////////////////////////
    /////////////ALLIANCES///////////
    /////////////////////////////

    public getAlliances(){
        return this.orm.all('alliances');
    }
}