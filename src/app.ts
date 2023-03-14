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
mediator.get('REGISTRATION',{login:'test',password:'test', name: 'test'});
console.log(mediator.get('LOG_IN', {login:'test',password:'test'}));
app.use(express.static('public'));
app.use(new Router(mediator));

app.listen(3001, () => console.log('It works!!!'));