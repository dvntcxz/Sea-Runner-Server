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
const Cache_1 = __importDefault(require("../../Cache"));
const Item_1 = __importDefault(require("./Entite/Item"));
const Updater_1 = __importDefault(require("./Updater"));
class Game {
    constructor(db, mediator) {
        this.db = db;
        this.mediator = mediator;
        this.Towns = new Cache_1.default;
        this.Trader = new Cache_1.default;
        this.updater = new Updater_1.default();
        this.wind = {
            speed: 7,
            direction: 0
        };
        this.EVENTS = this.mediator.getEventsNames();
        this.timer = setInterval(() => this.updater.update());
        this.mediator.subscribe(this.EVENTS.DB_CONNECT, () => __awaiter(this, void 0, void 0, function* () { return yield this.init(); }));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadTowns();
            this.mediator.call(this.EVENTS.INIT_GAME);
        });
    }
    loadTowns() {
    }
    createItem(ownerId, typeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = new Item_1.default(typeId, this.db);
            yield item.create();
            if (item) {
                //this.getTrader(ownerId)
            }
        });
    }
    craftShip() {
    }
}
exports.default = Game;
