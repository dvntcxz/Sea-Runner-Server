import Manager from "../Manager";
import Mediator from "../Mediator";
import User from "./User";

export default class UserManager extends Manager{
    private users:User []  = [];
    private i:number = 0;
    constructor(options:{mediator: Mediator}){
        super(options)
        const {GET_USER_BY_TOKEN, GET_USER, LOG_IN, LOG_OUT, REGISTRATION} = this.TRIGGERS;
        this.mediator?.set(GET_USER_BY_TOKEN, (data: {token:string}) => this.getUserByToken(data.token));
        this.mediator?.set(GET_USER, (data: {id:number}) => this.getUser(data.id));
        this.mediator?.set(LOG_IN, (data: {login:string, password: string}) => this.login(data.login,data.password));
        this.mediator?.set(LOG_OUT, (data: {token:string}) => this.logout(data.token));
        this.mediator?.set(REGISTRATION, (data: {login:string, password: string, name: string}) => this.registration(data.login, data.password, data.name));
    }

    private genId():number {
        this.i++;
        return this.i;
    }

    public getUserByToken(token:string):User | undefined{
        return this.users.find((user: User) => user.verification(token));
    }
    public getUser(id:number): User | undefined{
        return this.users.find((user: User)=> user.id === id);
    }

    private getUserByLogin(login:string):User | undefined{
        return this.users.find((user: User)=> user.login === login);
    }

    public registration (login:string, password:string, name:string) {
        const newId = this.genId()
        console.log(name);
        this.users.push(new User(newId,login,password,name));
        return true; 
    }

    public login(login: string, password: string) {
        const user = this.getUserByLogin(login);
        if (user) return user.auth(password);
        return false;
    }

    public logout(token: string):boolean {
        const user = this.getUserByToken(token);
        if (user) {
            return user.logout();
        }
        return false;
    }
}