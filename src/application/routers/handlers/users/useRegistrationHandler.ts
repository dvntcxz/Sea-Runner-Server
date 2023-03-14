import { Request, Response } from "express";
import Answer from "../../answer/Answer";
import Mediator from "../../../modules/Mediator";

export default function useRegistrationHandler(answer: Answer, mediator: Mediator) {
    return (req: Request, res: Response): void => {
        res.send(answer.good(mediator.get('REGISTRATION',{login: req.params.login, password: req.params.password, name: req.params.name})))
    }
}