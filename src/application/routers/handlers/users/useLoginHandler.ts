import { Request, Response } from "express";
import UserManager from "../../../modules/UserManager/UserManager";
import Answer from "../../answer/Answer";


export default function useloginHandler(answer: Answer, userManager: UserManager) {
    return (req: Request, res: Response): void => {
        res.send(answer.good(userManager.login(req.params.login, req.params.password)));
    }
}