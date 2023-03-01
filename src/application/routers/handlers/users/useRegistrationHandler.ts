import { Request, Response } from "express";
import Answer from "../../answer/Answer";
import UserManager from "../../../modules/UserManager/UserManager";

export default function useRegistrationHandler(answer: Answer, userManager: UserManager) {
    return (req: Request, res: Response): void => {
        res.send(answer.good(userManager.registration(req.params.login, req.params.password, req.params.name)))
    }
}