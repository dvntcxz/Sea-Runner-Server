import Manager, { IManager } from "../Manager";
import Mediator from "../Mediator";
import { TMessage, TMessages, TNewMessage } from "../Types";
import User from "../UserManager/User";
import Message from "./Message";

var hash = require('md5');

export default class ChatManager extends Manager {
    private cacheUserMessages: {
        [userId: number]: TMessages
    } = {};
    private cacheAllMessages: TMessages = [];
    private chatHash: string = hash(Math.random());
    constructor(options: IManager) {
        super(options)
        const { GET_MESSAGES_ALL, GET_MESSAGES, GET_CHAT_HASH, ADD_MESSAGE } = this.mediator.getTriggersNames();
        this.mediator.set(GET_MESSAGES, (id: number) => this.getAllMessagesToUser(id));
        this.mediator.set(ADD_MESSAGE, (newMessage:TNewMessage) => this.addMessage(newMessage));
        this.mediator.set(GET_CHAT_HASH, () => this.getChatHash());

        this.setMessagesToAll();
    }

    private async setMessagesToAll(){
        this.cacheAllMessages = await this.db.getMessagesToAll();
    }

    private async setMessagesToUser(userId: number){
        this.cacheUserMessages[userId] = await this.db.getMessagesToUser(userId);
    }

    public getMessagesToUser(userId: number): TMessages{
        return this.cacheUserMessages[userId];
    }

    public getMessagesToAll(): TMessages{
        return this.cacheAllMessages;
    }

    public getAllMessagesToUser(userId: number) {
        if (this.cacheUserMessages[userId]) {
            this.setMessagesToUser(userId);
        }
        const messages = this.getMessagesToAll().concat(this.getMessagesToUser(userId));
        return messages.sort((a,b) => a.id - b.id);
    }

    public getChatHash() {
        return this.chatHash;
    }

    public async addMessage(newMessage:TNewMessage){
        if (await this.db.addMessage(newMessage)) {
            if (newMessage.userIdTo) {
                this.setMessagesToUser(newMessage.userIdTo);
                this.setMessagesToUser(newMessage.userIdFrom);
            }
            else this.setMessagesToAll();
            this.chatHash = hash(Math.random());
            return true;
        };
        return false;
    }
}