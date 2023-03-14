import { Request, Response } from "express";
import Mediator from "../../../modules/Mediator";
import Answer from "../../answer/Answer";


export default function useLoginHandler(answer: Answer, mediator: Mediator) {
    return (req: Request, res: Response): void => {
        res.send(answer.good(mediator.get('LOG_IN', {login: req.params.login, password: req.params.password})));
    }
}