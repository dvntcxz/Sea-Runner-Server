import Manager from "../Manager";
import Mediator from "../Mediator";
import User from "../UserManager/User";
import Message from "./Message";

var hash = require('md5');

export default class ChatManager extends Manager{
    private messages: Message[] = [];
    private chatHash: string = '';
    constructor(options:{mediator: Mediator}){
        super(options)
        const {GET_MESSAGES, GET_CHAT_HASH, ADD_MESSAGE} = this.mediator.getTriggersNames();
    }

    public getMessages(user: User): Message []{
        const answer: Message [] = [];
        this.messages.forEach(message => {
            if (message && message.canRead(user)) answer.push(message);
        })
        return answer;
    }

    public getChatHash(){
        return this.chatHash;
    }

    public addMassage(from: User, text: string, to: User){
        this.messages.push(new Message(from, text, to));
        this.chatHash = hash(Math.random());
        return true;
    }
}