import express = require('express');
import cors = require('cors');
import UserManager from './application/modules/UserManager/UserManager';
import ChatManager from './application/modules/ChatManager/ChatManager';
import CONFIG from './config';
import Mediator from './application/modules/Mediator';

const app = express();
const Router = require('./application/routers/Router');
app.use(cors({
    origin: '*'
}));
const config = new CONFIG;
const { PORT, MEDIATOR } = config;
const mediator = new Mediator(MEDIATOR.EVENTS, MEDIATOR.TRIGGERS);
const userManager = new UserManager({mediator: mediator});
const chatManager = new ChatManager({mediator: mediator});
userManager.registration('test', 'test', 'test');
app.use(express.static('public'));
app.use(new Router(userManager,chatManager));

app.listen(3001, () => console.log('It works!!!'));