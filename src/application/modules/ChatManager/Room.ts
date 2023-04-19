import md5 from "md5";
import DB from "../DB/DB";
import User from "../UserManager/User";
import { TMessages } from "../Types";

export default class Rooms{
    private guid: string = '';
    private type: string = '';
    private messages: TMessages = [];
    constructor (private db: DB){
    }

    public async init(roomGuid: string): Promise<boolean>{
        if (roomGuid){
            const room = await this.db.getRoom(roomGuid);
            if (room){
                this.guid = room.guid;
                this.type = room.type;
                this.loadMessage();
                return true;
            }
            return false;
        }
        return false;
    }

    public async getPrivateRoom(user_1: User, user_2: User){
        if (user_1 && user_2){
            return await this.db.getPrivateRoom(user_1.getId(), user_2.getId());
        }
        return null;
    }

    public async createRoom(type: string){
        this.type = type;
        this.guid = md5(Math.random().toString());
        await this.db.addRoom(this.guid, this.type);
    }

    public addUserToRoom(user: User){
        if (user) {
            this.db.addUserToRoom(this.guid, user.getId());
        }
    }

    public getId(): string{
        return this.guid;
    }

    async addMessage(user:User, message: string){
        if (user && message){
            const result  = await this.db.addMessage(this.guid, user.getId(), message);
            if (result) this.messages = await this.loadMessage();
            return this.getMessages();
        }
    }

    async loadMessage(){
        return await this.db.getMessages(this.guid);
    }

    getMessages(){
        return this.messages;
    }

    async verification(userId:number){
        const user = await this.db.getRoomUserById(this.guid,userId);
        if (user) return true;
        return false;
    }
}