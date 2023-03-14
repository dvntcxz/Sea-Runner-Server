import express from 'express';
import useBaranoffHandler from './handlers/other/useBaranoffHandler';
import powHandler from './handlers/other/powHandler';
import notFoundHandler from './handlers/notFound/notFoundHandler';
import useLoginHandler from './handlers/users/useLoginHandler';
import useRegistrationHandler from './handlers/users/useRegistrationHandler';
import useLogoutHandler from './handlers/users/useLogoutHandler'
import useGetMessagesHandler from './handlers/chat/useGetMessagesHandler'
import useSendMessage from './handlers/chat/useSendMessage';
import getAllUsersHandler from './handlers/users/getAllUsersHandler';
import Answer from './answer/Answer';
import Mediator from '../modules/Mediator';

const router = express.Router();

function Router(mediator: Mediator) {
    const answer = new Answer;
    //Users//
    router.get('/api/login/:login/:password/:time', useLoginHandler(answer, mediator));
    router.get('/api/registration/:login/:password/:name', useRegistrationHandler(answer, mediator));
    router.get('/api/logout/:token', useLogoutHandler(answer, mediator));
    //router.get('/api/getAllUsers/:token', getAllUsersHandler);
    //Chat//
    router.get('/api/getMessages/:chatHash/:token', useGetMessagesHandler(answer, mediator));
    router.get('/api/sendMessage/:message/:to/:token', useSendMessage(answer, mediator));
    //Other//
    router.get('/api/baranoff', useBaranoffHandler(answer));
    router.get('/api/pow/:value/:pow', powHandler);
    //notFound//
    router.all('/*', notFoundHandler);
    return router;
}

module.exports = Router;