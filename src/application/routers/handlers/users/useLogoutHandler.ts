import { Request, Response } from "express";
import Mediator from "../../../modules/Mediator";
import Answer from "../../answer/Answer";

export default function useLogoutHandler(answer:Answer, mediator: Mediator){
    return (req: Request, res: Response): void => {
        mediator.get('lOG_OUT', {token: req.params.token})
        res.send();
    }
}
