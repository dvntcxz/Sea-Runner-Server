import { Socket } from "socket.io";
import Cache from "../Cache";
import Manager, { IManager } from "../Manager"
import Captain from "./Game/Entite/Captain";
import Game from "./Game/Game";

export default class GameManager extends Manager {
    private captains = new Cache<Captain>;
    private game;
    constructor(options: IManager) {
        super(options);
        this.game = new Game(this.db);
        this.mediator.subscribe(this.EVENTS.USER_LOG_IN, (socket: Socket) => this.loadedHandler(socket));
    }

    private loadedHandler(socket: Socket){
        socket.on(this.MESSAGES.GAME_LOADED, () => this.mediator.call(this.EVENTS.USER_LOADED, socket));
    }

    ////////////////////////////
    /////////CAPTAIN////////////
    ////////////////////////////

    public addCaptain(socket: Socket, allianceId: number, token: string) {
        const user = this.mediator.get('GET_USER', socket.id);
        if(user && user.verification(token)){
            //по айди альанса достаем город из таблицы Town
            //у города берем координаты в X и Y
            //создаем нового капиата new Captain(this.db)
            //добавляем капиатана в таблицу Captain.create(user.getId(), null, X, Y)
        }
    }

    public getCaptain(socket: Socket, token: string) {
        const user = this.mediator.get('GET_USER', socket.id);
        if(user && user.verification(token)){
            //достаем капитана и отправляем обратно клиенту через сокет
        }
    }

    ////////////////////////////
    ////////////SHIP////////////
    ////////////////////////////


    ////////////////////////////
    ////////////SCENE///////////
    ////////////////////////////
    public getScene() {
        const result = [];
        Object.values(this.captains.getAll()).
            forEach((captain: Captain) => result.push(captain.getData()))
    }
}