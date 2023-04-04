"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useDeleteMessageHandler(answer, mediator) {
    return (req, res) => {
        //если есть такое сообщение по id, то удаляем его
    };
}
exports.default = useDeleteMessageHandler;
/*import { Request, Response } from "express";
import ChatManager from "../../../modules/ChatManager/ChatManager";
import Mediator from "../../../modules/Mediator";
import UserManager from "../../../modules/UserManager/UserManager";
import Answer from "../../answer/Answer";


export default function useGetMessagesHandler(answer: Answer, mediator: Mediator) {
    return (req: Request, res: Response): void => {
        if (req.params.chatHash != mediator.get('GET_CHAT_HASH')){
            const user = mediator.get('GET_USER_BY_TOKEN', req.params.token);
            if (user){
                res.send(answer.good({
                    messages: mediator.get('GET_MESSAGES',user.id),
                    chatHash: mediator.get('GET_CHAT_HASH')
                }));
            }
        }
        else res.send(null);
    }
}*/
/*import { Request, Response } from "express";
import Mediator from "../../../modules/Mediator";
import Answer from "../../answer/Answer";

export default function useSendMessage(answer: Answer, mediator: Mediator) {
    return (req: Request, res: Response): void => {
        const {token, userIdTo, message} = req.params;
        const from = mediator.get('GET_USER_BY_TOKEN', token);
        if (from) {
            mediator.get('ADD_MESSAGE', {
                userIdFrom: from.id,
                userIdTo: (userIdTo != 'null') ? userIdTo : null,
                message: message
            })
            res.send(true);
        }
        else res.send(false);
    }
} */ 
