"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = __importDefault(require("../Cache"));
const Manager_1 = __importDefault(require("../Manager"));
const Room_1 = __importDefault(require("./Room"));
class ChatManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.rooms = new Cache_1.default;
        this.globalChatRoomGuid = '';
        this.allianceChatRoomGuid = {
            1: '',
            2: '',
            3: ''
        };
        if (!this.io)
            return;
        const { SEND_MESSAGE, JOIN_ROOM, CREATE_PRIVATE_ROOM, GET_PRIVATE_ROOM } = this.MESSAGES;
        this.io.on('connection', (socket) => {
            socket.on(SEND_MESSAGE, (token, message, roomGuid) => __awaiter(this, void 0, void 0, function* () { return yield this.sendMessage(socket, token, message, roomGuid); }));
            socket.on(JOIN_ROOM, (token, roomGuid) => __awaiter(this, void 0, void 0, function* () { return yield this.joinRoom(socket, token, roomGuid); }));
        });
    }
    getRoom(roomGuid) {
        return this.rooms.get(roomGuid);
    }
    joinRoom(socket, token, roomGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (token) {
                let messages = [];
                const user = this.mediator.get(this.TRIGGERS.GET_USER, socket.id);
                if (user && user.verification(token)) {
                    const room = this.getRoom(roomGuid);
                    if (room) {
                        socket.join(room.getId().toString());
                        messages = yield room.getMessages();
                    }
                    else {
                        const newRoom = new Room_1.default(this.db);
                        yield newRoom.init(roomGuid);
                        this.rooms.set(roomGuid, newRoom);
                        messages = yield newRoom.getMessages();
                    }
                    socket.emit('GET_MESSAGES', messages);
                }
            }
        });
    }
    sendMessage(socket, token, message, roomGuid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (token && message) {
                const user = this.mediator.get(this.TRIGGERS.GET_USER, socket.id);
                if (user && user.verification(token)) {
                    const room = this.getRoom(roomGuid);
                    if (room && (yield room.verification(user))) {
                        const messages = yield room.addMessage(user, message);
                        socket.to(room.getId().toString()).emit(this.MESSAGES.GET_MESSAGES, messages);
                    }
                    ;
                }
            }
        });
    }
}
exports.default = ChatManager;
