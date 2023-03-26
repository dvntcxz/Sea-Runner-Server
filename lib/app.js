"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const app = express();
const config_1 = __importDefault(require("./config"));
const DB_1 = __importDefault(require("./application/modules/DB/DB"));
const Mediator_1 = __importDefault(require("./application/modules/Mediator"));
const UserManager_1 = __importDefault(require("./application/modules/UserManager/UserManager"));
const ChatManager_1 = __importDefault(require("./application/modules/ChatManager/ChatManager"));
const Router = require('./application/routers/Router');
const config = new config_1.default;
const { PORT, MEDIATOR, DB_CONNECT } = config;
const mediator = new Mediator_1.default(MEDIATOR.EVENTS, MEDIATOR.TRIGGERS);
const db = new DB_1.default(DB_CONNECT);
new UserManager_1.default({ mediator: mediator, db });
new ChatManager_1.default({ mediator: mediator, db });
app.use(cors({
    origin: '*'
}));
app.use(express.static('public'));
app.use(new Router(mediator));
app.listen(PORT, () => console.log('It works!!!'));
