import Cache from "../Cache";
import Manager, { IManager } from "../Manager";
import User from "./User";
import { Socket } from "socket.io";

export default class UserManager extends Manager {
    private users = new Cache<User>;
    constructor(options: IManager) {
        super(options);
        const messages: any [] = [];
        const {LOG_IN, LOG_OUT, REGISTRATION} = this.MESSAGES;
        //io
        if (!this.io) return;
        this.io.on('connection', (socket: Socket) => {
            socket.on(LOG_IN, (login:string, password: string) => this.login(socket, login, password));
            socket.on(REGISTRATION, (login:string, password: string, name: string) => this.registration(socket, login, password, name));
            socket.on(LOG_OUT, (token: string) => this.logout(socket, token));
            socket.on('disconnect', () => this.disconnect(socket))
        });

        //Mediator Triggers
        const {GET_USER} = this.TRIGGERS;
        this.mediator.set(GET_USER, (socketId: string) => this.getUser(socketId));
        //Mediator Events
        const {USER_LOG_IN} = this.EVENTS;

    }

    private async login(socket: Socket, login: string, password: string){
            const user = new User(socket.id,this.db);
            if (await user.auth(login,password)){
                const userData = user.get();
                this.users.set(socket.id,user);
                socket.emit(this.MESSAGES.LOG_IN, userData);
            }
            socket.emit(this.MESSAGES.LOG_IN, false);
    }

    private userOffline(user: User) {
        this.mediator.call(this.EVENTS.USER_LOG_OUT, user);
        this.users.remove(user.getSocketId());
        user.logout();
    }

    public disconnect(socket: Socket){
        const user = this.getUser(socket.id);
        if (user) this.userOffline(user);
    }

    public getUser(socketId: string): User | null {
        return this.users.get(socketId) || null;
    }

    public async registration(socket:Socket, login: string, password: string, name: string) {
            const user = new User(socket.id, this.db);
            socket.emit(this.MESSAGES.REGISTRATION, await user.registration(login, password, name));
    }

    public logout(socket: Socket, token: string): void {
        let result = false;
        if (token){
            const user = this.getUser(socket.id);
            if (user?.verification(token)) {
                this.userOffline(user);
                result=true;
            }
        }
        socket.emit(this.MESSAGES.LOG_OUT, result);
    }

}

