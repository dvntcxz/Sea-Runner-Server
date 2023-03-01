import Manager from "../Manager";
import Mediator from "../Mediator";
import User from "./User";

export default class UserManager extends Manager{
    private users:User []  = [];
    private i:number = 0;
    constructor(options:{mediator: Mediator}){
        super(options)
        const {GET_INFO_TEST_1} = this.TRIGGERS;
        this.mediator?.set(GET_INFO_TEST_1, () => this.genId());
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