import express = require('express');
import cors = require('cors');
import UserManager from './application/modules/UserManager/UserManager';
import ChatManager from './application/modules/ChatManager/ChatManager';

const app = express();
const Router = require('./application/routers/Router');
app.use(cors({
    origin: '*'
}));

const userManager = new UserManager;
const chatManager = new ChatManager;
userManager.registration('test', 'test', 'test');
app.use(express.static('public'));
app.use(new Router(userManager,chatManager));

app.listen(3001, () => console.log('It works!!!'));