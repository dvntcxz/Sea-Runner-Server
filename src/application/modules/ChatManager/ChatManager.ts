import Manager, { IManager } from "../Manager";
import Mediator from "../Mediator";
import User from "../UserManager/User";
import Message from "./Message";

var hash = require('md5');

export default class ChatManager extends Manager {
    private userMessages: {
        [userId: number]: Message
    } = {};
    private allMessages: {
        [userId: number]: Message
    } = {};
    private chatHash: string = '';
    constructor(options: IManager) {
        super(options)
        const { GET_MESSAGES, GET_CHAT_HASH, ADD_MESSAGE } = this.mediator.getTriggersNames();
    }

    public async getMessagesByUser(id: number) {
        const data = await this.db.allMessagesThisUser(id);
        data.forEach((message) => {
            this.userMessages[message.id] = new Message(message.userIdFrom, message.userIdTo, message.message)
        })
        return this.userMessages;
    }

    public async getMessagesAll() {
        const data = await this.db.getMessagesToAll();
        data.forEach((message) => {
            this.allMessages[message.id] = new Message(message.userIdFrom, message.userIdTo, message.message)
        })
        return this.allMessages;
    }


    public getChatHash() {
        return this.chatHash;
    }

    /*public addMassage(from: number,to: number, text: string){
        
        this.messages.push(new Message(from,to, text));
        this.chatHash = hash(Math.random());
        return true;
    }*/
}