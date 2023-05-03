////IMPORT//////
////Modules/////
import ActiveRecord from "../ActiveRecord";
import DB from "../DB/DB";
import md5 from "md5";
////Types/////
import { Tables } from "../Types";


export default class User extends ActiveRecord{
    constructor(private socketId: string,db:DB){
        super(db, Tables.users);
    }

    public getSocketId(){
        return this.socketId;
    }

    public verification(token:string):boolean{
        return (this.get('token') === token);
    }

    public getClientData(){
        return {
            id: this.get('id'),
            name: this.get('name'),
            token: this.get('token')
        }
    }

    public async registration(login: string, password: string, name: string): Promise<boolean>{
        if (login && password && name) {
            if (!await this.db.getUserByLogin(login)){
                return await this.create({login, password, name});
            }
        }
        return false;
    }

    public async auth(login: string, password:string): Promise<boolean> {
        if (login && password){
            const user = await this.db.getUserByLogin(login);
            if (user && password === user.password){
                this.reload(user);
                this.attributes.token = md5(Math.random().toString());
                await this.db.setUserToken(this.getId(),this.get('token'));
                return true;
            }
        }
        return false;
    }

    public async logout(){
        await this.db.setUserToken(this.getId(),null);
        this.attributes = {};
    }
}