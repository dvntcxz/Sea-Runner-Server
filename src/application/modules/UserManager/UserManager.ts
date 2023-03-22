import Manager from "../Manager";
import Mediator from "../Mediator";
import User from "./User";
import db from "../DB/DB";

export default class UserManager extends Manager {
    private db: db;

    constructor(options: { mediator: Mediator; db: db }) {
        super(options);
        const { GET_USER_BY_TOKEN, GET_USER, LOG_IN, LOG_OUT, REGISTRATION } =
            this.TRIGGERS;
        this.mediator?.set(
            GET_USER_BY_TOKEN,
            (data: { token: string }) => this.getUserByToken(data.token)
        );
        this.mediator?.set(
            GET_USER,
            (data: { id: number }) => this.getUser(data.id)
        );
        this.mediator?.set(
            LOG_IN,
            (data: { login: string; password: string }) =>
                this.login(data.login, data.password)
        );
        this.mediator?.set(
            LOG_OUT,
            (data: { token: string }) => this.logout(data.token)
        );
        this.mediator?.set(
            REGISTRATION,
            (data: { login: string; password: string; name: string }) =>
                this.registration(data.login, data.password, data.name)
        );


        this.db = options.db;
    }

    public async getUserByToken(token: string): Promise<User | undefined> {
        const user = await this.db.getUserByToken(token);
        return user ? new User(user.id, user.login, user.password, user.name) : undefined;
    }

    public async getUser(id: number): Promise<User | undefined> {
        const user = await this.db.getUser(id);
        return user ? new User(user.id, user.login, user.password, user.name) : undefined;
    }

    private async getUserByLogin(login: string): Promise<User | undefined> {
        const user = await this.db.getUserByLogin(login);
        return user ? new User(user.id, user.login, user.password, user.name) : undefined;
    }

    public async registration(
        login: string,
        password: string,
        name: string
    ): Promise<boolean> {
        const newId = await this.db.getNextUserId();
        const user = new User(newId, login, password, name);
        const response = await this.db.addUser(user);
        return response;
    }

    public async login(login: string, password: string): Promise<boolean> {
        const user = await this.getUserByLogin(login);
        if (user) {
            const authenticated = await user.auth(password);
            if (authenticated) {
                await this.db.updateUser(user);
                return true;
            }
        }
        return false;
    }

    public async logout(token: string): Promise<boolean> {
        const user = await this.getUserByToken(token);
        if (user) {
            const result = await this.db.updateUser(user);
            if (result) {
                return user.logout();
            }
        }
        return false;
    }
}