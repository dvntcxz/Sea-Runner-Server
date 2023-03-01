import { Request, Response } from "express";
import ChatManager from "../../../modules/ChatManager/ChatManager";
import UserManager from "../../../modules/UserManager/UserManager";
import Answer from "../../answer/Answer";


export default function useGetMessagesHandler(answer: Answer, userManager: UserManager, chatManager: ChatManager) {
    return (req: Request, res: Response): void => {
        const user = userManager.getUserByToken(req.params.token);
        if (user){
            res.send(answer.good({
                messages: chatManager.getMessages(user),
                chatHash: chatManager.getChatHash()
            }));
        }
    }
}