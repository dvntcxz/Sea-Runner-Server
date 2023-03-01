import { Request, Response } from "express";
import ChatManager from "../../../modules/ChatManager/ChatManager";
import UserManager from "../../../modules/UserManager/UserManager";
import Answer from "../../answer/Answer";

export default function useSendMessage(answer: Answer, userManager: UserManager, chatManager: ChatManager) {
    return (req: Request, res: Response): void => {
        const from = userManager.getUserByToken(req.params.token);
        const to = userManager.getUser(Number(req.params.to));
        res.send(true);
    }
}