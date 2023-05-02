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
            socket.on(LOG_IN, (login:string, password: string, cbLogin: Function) => this.login(socket, login, password, cbLogin));
            socket.on(REGISTRATION, (login:string, password: string, name: string, cbRegistration: Function) => this.registration(socket, login, password, name, cbRegistration));
            socket.on(LOG_OUT, (token: string, cbLogout: Function) => this.logout(socket, token, cbLogout));
            socket.on('disconnect', () => this.disconnect(socket))
        });

        //Mediator Triggers
        const {GET_USER} = this.TRIGGERS;
        this.mediator.set(GET_USER, (socketId: string) => this.getUser(socketId));
        //Mediator Events
    }

    private async login(socket: Socket, login: string, password: string, cbLogin: Function){
        const user = new User(socket.id,this.db);
        if (await user.auth(login,password)){
            const userData = user.getClientData();
            this.users.set(socket.id,user);
            cbLogin(userData);
        }
        else cbLogin(null);
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

    public async registration(socket:Socket, login: string, password: string, name: string, cbRegistration: Function) {
            const user = new User(socket.id, this.db);
            cbRegistration(await user.registration(login, password, name));
    }

    public logout(socket: Socket, token: string, cbLogout: Function): void {
        let result = false;
        if (token){
            const user = this.getUser(socket.id);
            if (user?.verification(token)) {
                this.userOffline(user);
                result=true;
            }
        }
        cbLogout();
    }

}

