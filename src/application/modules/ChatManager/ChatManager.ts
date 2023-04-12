import Manager, { IManager } from "../Manager";
import { IMessage, TMessages, IMessageData, IUserSocket } from "../Types";

export default class ChatManager extends Manager {
    private cacheUserMessages: {
        [userId: number]: TMessages
    } = {};
    private cacheAllMessages: TMessages = [];
    constructor(options: IManager) {
        super(options)
        if (!this.io) return;
        const { GET_MESSAGES_ALL, GET_MESSAGES, GET_CHAT_HASH, ADD_MESSAGE } = this.mediator.getTriggersNames();
        this.mediator.set(GET_MESSAGES, (id: number) => this.getAllMessagesToUser(id));
        this.mediator.set(ADD_MESSAGE, (newMessage: IMessageData) => this.addMessage(newMessage));
        this.mediator.set(GET_CHAT_HASH, () => this.getChatHash());
        this.mediator.subscribe(this.EVENTS.USER_LOADED, (socket: IUserSocket) => this.sendMessageHandler(socket))
        this.setMessagesToAll();
    }

    private sendMessageHandler(socket: IUserSocket) {
        if (socket.user) {
            socket.emit(this.MESSAGES.GET_MESSAGES_ALL, this.getMessagesToAll());
            socket.emit(this.MESSAGES.GET_MESSAGES_PRIVATE, this.getMessagesToUser(socket.user.get().id))
        }
        socket.on(this.MESSAGES.SEND_MESSAGE, async (userIdTo: number | null, message: string, token: string) => {
            if (socket.user?.verification(token)) {
                const userIdFrom = socket.user.get().id;
                const result = await this.addMessage({ userIdFrom, userIdTo, message });
                if (result) {
                    if (userIdTo) {
                        this.io.to(`${userIdTo}`).emit(this.MESSAGES.GET_MESSAGES_PRIVATE, this.getMessagesToUser(userIdTo));
                        this.io.to(`${userIdFrom}`).emit(this.MESSAGES.GET_MESSAGES_PRIVATE, this.getMessagesToUser(userIdFrom));
                    }
                    else this.io.to('online_users').emit(this.MESSAGES.GET_MESSAGES_ALL, this.getMessagesToAll());
                }
            }
        });
    }

    private async setMessagesToAll() {
        this.cacheAllMessages = await this.db.getMessagesToAll();
    }

    private async setMessagesToUser(userId: number) {
        this.cacheUserMessages[userId] = await this.db.getMessagesToUser(userId);
    }

    public getMessagesToUser(userId: number): TMessages {
        return this.cacheUserMessages[userId];
    }

    public getMessagesToAll(): TMessages {
        return this.cacheAllMessages;
    }

    public getAllMessagesToUser(userId: number) {
        if (this.cacheUserMessages[userId]) {
            this.setMessagesToUser(userId);
        }
        const messages = this.getMessagesToAll().concat(this.getMessagesToUser(userId));
        return messages.sort((a, b) => a.id - b.id);
    }

    public getChatHash() {
    }

    public async addMessage(newMessage: IMessageData) {
        if (await this.db.addMessage(newMessage)) {
            if (newMessage.userIdTo) {
                await this.setMessagesToUser(newMessage.userIdTo);
                await this.setMessagesToUser(newMessage.userIdFrom);
            }
            else await this.setMessagesToAll();
            return true;
        };
        return false;
    }
}