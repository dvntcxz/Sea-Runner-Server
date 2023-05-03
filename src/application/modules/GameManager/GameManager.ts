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
        this.io.on((socket:Socket) => {
            socket.on(this.MESSAGES.GET_CAPTAIN, (token: string, answer: Function) => this.getCaptain(socket.id,token, answer));
        })
        this.game = new Game(this.db, this.mediator);
    }

    public gameLoaded(answer: Function){
        //answer();
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

    public async getCaptain(socketId: string, token: string, answer: Function) {
        const user = this.mediator.get('GET_USER', socketId);
        if(user && user.verification(token)){
            const cacheCaptain = this.captains.get(user.getId());
            if (cacheCaptain) answer(cacheCaptain.getId());
            else {
                const captain = new Captain(this.db);
                const result = await captain.getByUserId(user.getId());
                if (result) answer(captain.getId());
                else answer(null);
            }
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
            forEach((captain: Captain) => result.push())
    }

    ////////////////////////////
    ////////////TOWN////////////
    ////////////////////////////
    public getTown(){

    }
}