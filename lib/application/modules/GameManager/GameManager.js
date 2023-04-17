"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cache_1 = __importDefault(require("../Cache"));
const Manager_1 = __importDefault(require("../Manager"));
const Game_1 = __importDefault(require("./Game/Game"));
class GameManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.captains = new Cache_1.default;
        this.game = new Game_1.default(this.db);
        this.mediator.subscribe(this.EVENTS.USER_LOG_IN, (socket) => this.loadedHandler(socket));
    }
    loadedHandler(socket) {
        socket.on(this.MESSAGES.GAME_LOADED, () => this.mediator.call(this.EVENTS.USER_LOADED, socket));
    }
    ////////////////////////////
    /////////CAPTAIN////////////
    ////////////////////////////
    addCaptain(socket, allianceId, token) {
        const user = this.mediator.get('GET_USER', socket.id);
        if (user && user.verification(token)) {
            //по айди альанса достаем город из таблицы Town
            //у города берем координаты в X и Y
            //создаем нового капиата new Captain(this.db)
            //добавляем капиатана в таблицу Captain.create(user.getId(), null, X, Y)
        }
    }
    getCaptain(socket, token) {
        const user = this.mediator.get('GET_USER', socket.id);
        if (user && user.verification(token)) {
            //достаем капитана и отправляем обратно клиенту через сокет
        }
    }
    ////////////////////////////
    ////////////SHIP////////////
    ////////////////////////////
    ////////////////////////////
    ////////////SCENE///////////
    ////////////////////////////
    getScene() {
        const result = [];
        Object.values(this.captains.getAll()).
            forEach((captain) => result.push(captain.getData()));
    }
}
exports.default = GameManager;
