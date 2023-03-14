import { Request, Response } from "express";
import ChatManager from "../../../modules/ChatManager/ChatManager";
import Mediator from "../../../modules/Mediator";
import UserManager from "../../../modules/UserManager/UserManager";
import Answer from "../../answer/Answer";

export default function useSendMessage(answer: Answer, mediator: Mediator) {
    return (req: Request, res: Response): void => {
        const from = mediator.get('GET_USER_BY_TOKEN', req.params.token);
        const to = mediator.get('GET_USER', Number(req.params.to));
        res.send(true);
    }
}