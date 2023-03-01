import { Request, Response } from "express";
import UserManager from "../../../modules/UserManager/UserManager";
import Answer from "../../answer/Answer";

export default function logoutHandler(answer: Answer, userManager:UserManager) {
    return (req: Request, res: Response):void => {
    }
}
