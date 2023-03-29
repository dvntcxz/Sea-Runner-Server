import Manager, { IManager } from "../Manager";
import { TUser, TUserRegistrationData, TUserSignInData } from "../Types";
import User from "./User";

var hash = require('md5');

type TCacheUser = {
    [key:number | string]: User
}

export default class UserManager extends Manager {
    private cacheUsersById: TCacheUser = {};
    private cacheUsersByToken: TCacheUser = {};
    private cacheUsersByLogin: TCacheUser = {};
    constructor(options: IManager) {
        super(options);
        //Mediator Triggers
        const { GET_USER_BY_TOKEN, GET_USER, LOG_IN, LOG_OUT, REGISTRATION, GET_ALL_USERS } = this.TRIGGERS;
        this.mediator.set(GET_USER_BY_TOKEN, (token: string) => this.getUserByToken(token));
        this.mediator.set(GET_USER, (id: number) => this.getUser(id));
        this.mediator.set(LOG_IN, (data: TUserSignInData) => this.login(data));
        this.mediator.set(LOG_OUT, (token: string) => this.logout(token));
        this.mediator.set(REGISTRATION, (data: TUserRegistrationData) => this.registration(data));
        this.mediator.set(GET_ALL_USERS, () => this.getAllUsers());
        //Mediator Events
        const { CHANGE_USERS, CHANGE_USER } = this.EVENTS;
        this.mediator.subscribe('CHANGE_USERS', () => this.loadAllUserFromDB());
        this.mediator.subscribe('CHANGE_USER', (id: number) => this.updateUserData(id));

        this.loadAllUserFromDB();
    }

    public getUserByToken(token: string): User | null {
        return this.cacheUsersByToken[token] || null;
    }

    public getUser(id: number): User | null {
        return this.cacheUsersById[id] || null;
    }

    private getUserByLogin(login: string): User | null {
        return this.cacheUsersByLogin[login] || null;;
    }

    private updateCaches(user: TUser){
        const cacheUser = new User(user);
        this.cacheUsersById[user.id] = cacheUser;
        this.cacheUsersByLogin[user.login] = cacheUser;
        if (user.token) this.cacheUsersByToken[user.token] = cacheUser;
    }

    public async updateUserData(id: number) {
        const user = await this.db.getUser(id);
        if (user) this.updateCaches(user);
    }

    private async loadAllUserFromDB() {
        let allUsers = await this.db.getAllUsers();
        this.cacheUsersByToken = {};
        allUsers.forEach((user) => this.updateCaches(user))
    }

    public async registration(data: TUserRegistrationData) {
        if (await this.db.addUser(data)) this.loadAllUserFromDB();
        return true;
    }

    public login(data: TUserSignInData) {
        const { login, password } = data;
        const user = this.getUserByLogin(login);
        if (user) {
            const data = user.auth(password);
            if (data){
                this.db.setUserToken(user.id, hash(Math.random()));
                this.updateUserData(user.id);
            }
            return data;
        }
        return false;
    }

    public logout(token: string): boolean {
        const user = this.getUserByToken(token);
        if (user) {
            if (user.logout()) {
                delete(this.cacheUsersByToken[token]);
                this.db.setUserToken(user.id, null);
                this.updateUserData(user.id);
                return true;
            }
        }
        return false;
    }

    public getAllUsers(){
        return Object.values(this.cacheUsersById).map(user => user.get());
    }
}

