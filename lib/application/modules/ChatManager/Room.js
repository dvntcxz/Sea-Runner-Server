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
const md5_1 = __importDefault(require("md5"));
const Types_1 = require("../Types");
const ActiveRecord_1 = __importDefault(require("../ActiveRecord"));
class Rooms extends ActiveRecord_1.default {
    constructor(db) {
        super(db, Types_1.Tables.rooms);
        this.guid = '';
        this.type = '';
        this.messages = [];
    }
    init(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (roomId) {
                this.attributes.id = roomId;
                if (yield this.refresh()) {
                    yield this.loadMessage();
                    return true;
                }
                return false;
            }
            return false;
        });
    }
    getPrivateRoom(user_1, user_2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user_1 && user_2) {
                return yield this.db.getPrivateRoom(user_1.getId(), user_2.getId());
            }
            return null;
        });
    }
    createRoom(type) {
        return __awaiter(this, void 0, void 0, function* () {
            this.type = type;
            this.guid = (0, md5_1.default)(Math.random().toString());
            yield this.db.addRoom(this.guid, this.type);
        });
    }
    addUserToRoom(user) {
        if (user) {
            this.db.addUserToRoom(this.guid, user.getId());
        }
    }
    addMessage(user, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user && message) {
                const result = yield this.db.addMessage(this.attributes.id, user.getId(), message);
                if (result)
                    this.messages.push(result);
                return this.getMessages();
            }
        });
    }
    loadMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getMessages(this.attributes.id);
        });
    }
    getMessages() {
        return this.messages;
    }
    verification(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.getRoomUserById(this.guid, userId);
            if (user)
                return true;
            return false;
        });
    }
}
exports.default = Rooms;
