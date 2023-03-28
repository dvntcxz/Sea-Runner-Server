import User from "../UserManager/User";

export default class Message {
    constructor(
        private userIdFrom: number,
        private userIdTo: number | null,
        private message: string
    ) { }

    /*get(){
        return {
            userIdFrom: this.userIdFrom.get(),
            userIdTo: this.userIdTo.get(),
            message: this.message
        }
    }

    canRead(userId:id):boolean{
        if (user === this.from || user === this.to) return true 
        return false;
    }*/
}