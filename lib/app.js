"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const config_1 = __importDefault(require("./config"));
const DB_1 = __importDefault(require("./application/modules/DB/DB"));
const Mediator_1 = __importDefault(require("./application/modules/Mediator"));
const UserManager_1 = __importDefault(require("./application/modules/UserManager/UserManager"));
const ChatManager_1 = __importDefault(require("./application/modules/ChatManager/ChatManager"));
const Router_1 = __importDefault(require("./application/routers/Router"));
const GameManager_1 = __importDefault(require("./application/modules/GameManager/GameManager"));
const config = new config_1.default;
const { PORT, MEDIATOR, DB_CONNECT } = config;
const mediator = new Mediator_1.default(MEDIATOR.EVENTS, MEDIATOR.TRIGGERS);
const db = new DB_1.default(DB_CONNECT);
new UserManager_1.default({ mediator, db });
new ChatManager_1.default({ mediator, db });
new GameManager_1.default({ mediator, db });
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.static('public'));
app.use((0, Router_1.default)(mediator));
app.listen(PORT, () => console.log('It works!!!'));
