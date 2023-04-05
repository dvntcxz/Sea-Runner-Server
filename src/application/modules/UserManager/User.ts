import { IUser } from "../Types";



export default class User {
    private token: string | null;
    readonly id: number;
    readonly login: string;
    private password: string;
    public name: string;
    constructor(data: IUser) {
        this.id = data.id;
        this.token = data.token;
        this.login = data.login;
        this.password = data.password;
        this.name = data.name;
    }

    public get() {
        return {
            id: this.id,
            name: this.name
        }
    }

    public verification(token:string):boolean{
        return (this.token === token);
    }

    public auth(password:string): object | null {
        if (password === this.password){
            return {
                id: this.id,
                token: this.token,
                name: this.name
            }
        }
        return null;
    }

    public logout(): boolean {
            this.token = null;
            return true;
    }

    public updateData(data: IUser): void{
        this.token = data.token;
        this.password = data.password;
        this.name = data.name;
    }
}