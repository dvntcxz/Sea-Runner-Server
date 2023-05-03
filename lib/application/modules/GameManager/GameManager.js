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
const Captain_1 = __importDefault(require("./Game/Entite/Captain"));
const Game_1 = __importDefault(require("./Game/Game"));
class GameManager extends Manager_1.default {
    constructor(options) {
        super(options);
        this.captains = new Cache_1.default;
        this.io.on((socket) => {
            socket.on(this.MESSAGES.GET_CAPTAIN, (token, answer) => this.getCaptain(socket.id, token, answer));
        });
        this.game = new Game_1.default(this.db, this.mediator);
    }
    gameLoaded(answer) {
        //answer();
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
    getCaptain(socketId, token, answer) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.mediator.get('GET_USER', socketId);
            if (user && user.verification(token)) {
                const cacheCaptain = this.captains.get(user.getId());
                if (cacheCaptain)
                    answer(cacheCaptain.getId());
                else {
                    const captain = new Captain_1.default(this.db);
                    const result = yield captain.getByUserId(user.getId());
                    if (result)
                        answer(captain.getId());
                    else
                        answer(null);
                }
            }
        });
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
            forEach((captain) => result.push());
    }
    ////////////////////////////
    ////////////TOWN////////////
    ////////////////////////////
    getTown() {
    }
}
exports.default = GameManager;
