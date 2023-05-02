import ActiveRecord from "../ActiveRecord";
import DB from "../DB/DB";
import md5 from "md5";
import { Tables } from "../Types";

type TUserData = {
    id: number;
    token: string;
    name: string;
}

export default class User extends ActiveRecord{
    private token: string | null = null;
    private login: string = '';
    public name: string = '';
    constructor(private socketId: string,db:DB){
        super(db, Tables.users);
    }

    public get() {
        return {
            id: this.id,
            name: this.name
        }
    }

    public getSocketId(){
        return this.socketId;
    }

    public getId(){
        return this.id;
    }

    public verification(token:string):boolean{
        return (this.token === token);
    }

    public async registration(login: string, password: string, name: string){
        if (login && password && name) {
            if (!await this.db.getUserByLogin(login)){
                return await this.db.addUser({login, password, name});
            }
        }
        return false;
    }

    public async auth(login: string, password:string): Promise<boolean> {
        if (login && password){
            const user = await this.db.getUserByLogin(login);
            if (user && password === user.password){
                this.id = user.id;
                this.login = user.login;
                this.name = user.name;
                this.token = md5(Math.random().toString());
                await this.db.setUserToken(this.id,this.token);
                return true;
            }
        }
        return false;
    }

    public async logout(){

    }
}