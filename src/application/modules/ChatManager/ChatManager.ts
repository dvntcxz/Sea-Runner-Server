import { Socket } from "socket.io";
import Cache from "../Cache";
import Manager, { IManager } from "../Manager";
import Room from "./Room";

export default class ChatManager extends Manager {
    private rooms = new Cache<Room>;
    private globalChatRoomGuid = '';
    private allianceChatRoomGuid = {
        1:'',
        2:'',
        3:''
    }

    constructor(options: IManager) {
        super(options)
        if (!this.io) return;
        const {SEND_MESSAGE, JOIN_ROOM, CREATE_PRIVATE_ROOM, GET_PRIVATE_ROOM} = this.MESSAGES;
        this.io.on('connection', (socket:Socket)=>{
            socket.on(SEND_MESSAGE,async (token: string, message: string, roomGuid: string)=>await this.sendMessage(socket,token, message, roomGuid));
            socket.on(JOIN_ROOM,async (token: string, roomGuid: string)=>await this.joinRoom(socket,token, roomGuid));
        });
    }

    private getRoom(roomGuid: string){
        return this.rooms.get(roomGuid);
    }

    public async joinRoom(socket: Socket, token: string, roomGuid: string){
        if (token){
            let messages = [];
            const user = this.mediator.get(this.TRIGGERS.GET_USER, socket.id);
            if (user && user.verification(token)){
                const room = this.getRoom(roomGuid);
                if (room) {
                    socket.join(room.getId().toString());
                    messages = await room.getMessages();
                }
                else
                {
                    const newRoom = new Room(this.db);
                    await newRoom.init(roomGuid);
                    this.rooms.set(roomGuid, newRoom);
                    messages = await newRoom.getMessages();
                }
                socket.emit('GET_MESSAGES', messages);
            }
        }
    }

    public async sendMessage(socket: Socket, token: string, message: string, roomGuid: string){
        if (token && message){
            const user = this.mediator.get(this.TRIGGERS.GET_USER, socket.id);
            if (user && user.verification(token)){
                const room = this.getRoom(roomGuid);
                if (room && await room.verification(user)) {
                    const messages = await room.addMessage(user,message);
                    socket.to(room.getId().toString()).emit(this.MESSAGES.GET_MESSAGES, messages);
                };
            }
        }
    }



}