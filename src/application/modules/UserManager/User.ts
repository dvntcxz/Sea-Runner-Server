var hash = require('md5');

export default class User {
    private token: string | null = null;
    constructor(
        readonly id: number,
        readonly login: string,
        private password: string,
        private name: string) { }

    public get() {
        return {
            id: this.id,
            name: this.name
        }
    }

    public verification(token:string):boolean{
        return (this.token === token);
    }

    public auth(password:string): string | null {
        if (password === this.password){
            this.token = hash(Math.random());
            return this.token;
        }
        return null;
    }

    public logout(): boolean {
            this.token = null;
            return true;
    }
}