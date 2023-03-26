import Manager, { IManager } from "../Manager";
import { TUserRegistrationData, TUserSignInData } from "../Types";
import User from "./User";

export default class UserManager extends Manager {
    private users: {
        [key: number]: User
    } = {};
    constructor(options: IManager) {
        super(options);
        //Mediator Triggers
        const { GET_USER_BY_TOKEN, GET_USER, LOG_IN, LOG_OUT, REGISTRATION } = this.TRIGGERS;
        this.mediator.set(GET_USER_BY_TOKEN, (id: number, token: string) => this.getUserByToken(id, token));
        this.mediator.set(GET_USER, (id: number) => this.getUser(id));
        this.mediator.set(LOG_IN, (data: TUserSignInData) => this.login(data));
        this.mediator.set(LOG_OUT, (id: number, token: string) => this.logout(id, token));
        this.mediator.set(REGISTRATION, (data: TUserRegistrationData) => this.registration(data));
        //Mediator Events
        const { CHANGE_USERS, CHANGE_USER } = this.EVENTS;
        this.mediator.subscribe('CHANGE_USERS', () => this.loadAllUserFromDB());
        this.mediator.subscribe('CHANGE_USER', (id: number) => this.updateUserData(id));

        this.loadAllUserFromDB();
    }

    public getUserByToken(id: number, token: string): User | null {
        const user = this.users[id];
        return (user.verification(token)) ? user : null;
    }

    public getUser(id: number): User | undefined {
        return this.users[id];
    }

    private getUserByLogin(login: string): User | undefined {
        return Object.values(this.users).find((user: User) => user.login === login);
    }

    public async updateUserData(id: number) {
        const data = await this.db.getUser(id);
        if (data) this.users[id].updateData(data);
    }

    private async loadAllUserFromDB() {
        let allUsers = await this.db.getAllUsers();
        allUsers.forEach((user) => {
            this.users[user.id] = new User(user)
        })
    }

    public registration(data: TUserRegistrationData) {
        this.db.addUser(data);
        return true;
    }

    public login(data: TUserSignInData) {
        const { login, password } = data;
        const user = this.getUserByLogin(login);
        if (user) return user.auth(password);
        return false;
    }

    public logout(id: number, token: string): boolean {
        const user = this.getUserByToken(id, token);
        if (user) {
            return user.logout();
        }
        return false;
    }
}

