import User from "../UserManager/User";

export default class Message{
    constructor(
        private from: User,
        private text: string,
        private to: User
    ){}

    get(){
        return {
            from: this.from.get(),
            message: this.text,
            to: this.to.get()
        }
    }

    canRead(user:User):boolean{
        if (user === this.from || user === this.to) return true 
        return false;
    }
}