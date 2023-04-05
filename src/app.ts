import express from 'express';
import cors from 'cors';
const app = express();

import CONFIG from './config';
import DB from './application/modules/DB/DB';
import Mediator from './application/modules/Mediator';
import UserManager from './application/modules/UserManager/UserManager';
import ChatManager from './application/modules/ChatManager/ChatManager';
import Router from './application/routers/Router';
import GameManager from './application/modules/GameManager/GameManager';

const config = new CONFIG;
const { PORT, MEDIATOR, DB_CONNECT } = config;


const mediator = new Mediator(MEDIATOR.EVENTS, MEDIATOR.TRIGGERS);
const db = new DB(DB_CONNECT);
new UserManager({mediator, db});
new ChatManager({mediator, db});
new GameManager({mediator, db});
app.use(cors({
    origin: '*'
}));
app.use(express.static('public'));
app.use(Router(mediator));

app.listen(PORT, () => console.log('It works!!!'));

