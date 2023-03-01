import User from "../UserManager/User";
import Message from "./Message";

var hash = require('md5');

export default class ChatManager{
    private messages: Message[] = [];
    private chatHash: string = '';

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