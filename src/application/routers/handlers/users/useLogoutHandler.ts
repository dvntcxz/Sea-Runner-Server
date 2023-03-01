import { Request, Response } from "express";
import UserManager from "../../../modules/UserManager/UserManager";
import Answer from "../../answer/Answer";

export default function useLogoutHandler(answer:Answer, userManager: UserManager){
    return (req: Request, res: Response): void => {
        userManager.logout(req.params.token)
        res.send();
    }
}
