"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notFoundHandler_1 = __importDefault(require("./handlers/notFound/notFoundHandler"));
const useLoginHandler_1 = __importDefault(require("./handlers/users/useLoginHandler"));
const useRegistrationHandler_1 = __importDefault(require("./handlers/users/useRegistrationHandler"));
const useLogoutHandler_1 = __importDefault(require("./handlers/users/useLogoutHandler"));
const useGetMessagesHandler_1 = __importDefault(require("./handlers/chat/useGetMessagesHandler"));
const useSendMessage_1 = __importDefault(require("./handlers/chat/useSendMessage"));
const getAllUsersHandler_1 = __importDefault(require("./handlers/users/getAllUsersHandler"));
const Answer_1 = __importDefault(require("./answer/Answer"));
const router = express_1.default.Router();
function Router(mediator) {
    const answer = new Answer_1.default;
    //Users//
    router.get('/api/login/:login/:password/:time', (0, useLoginHandler_1.default)(answer, mediator));
    router.get('/api/registration/:login/:password/:name', (0, useRegistrationHandler_1.default)(answer, mediator));
    router.get('/api/logout/:token', (0, useLogoutHandler_1.default)(answer, mediator));
    router.get('/api/getAllUsers/:token', (0, getAllUsersHandler_1.default)(answer, mediator));
    //Chat//
    router.get('/api/getMessages/:chatHash/:token', (0, useGetMessagesHandler_1.default)(answer, mediator));
    router.get('/api/sendMessage/:message/:userIdTo/:token', (0, useSendMessage_1.default)(answer, mediator));
    //notFound//
    router.all('/*', notFoundHandler_1.default);
    return router;
}
exports.default = Router;
