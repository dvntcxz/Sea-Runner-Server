import express = require('express');
import cors = require('cors');
import UserManager from './application/modules/UserManager/UserManager';
import ChatManager from './application/modules/ChatManager/ChatManager';
import CONFIG from './config';
import Mediator from './application/modules/Mediator';

const app = express();
const Router = require('./application/routers/Router');
const DB = require(./application/modules/DB/DB);
app.use(cors({
    origin: '*'
}));
const config = new CONFIG;
const { PORT, MEDIATOR, DB_CONNECT } = config;

const mediator = new Mediator(MEDIATOR.EVENTS, MEDIATOR.TRIGGERS);
const userManager = new UserManager({mediator: mediator, db: DB});
const chatManager = new ChatManager({mediator: mediator, db: DB});
app.use(express.static('public'));
app.use(new Router(mediator));

app.listen(PORT, () => console.log('It works!!!'));