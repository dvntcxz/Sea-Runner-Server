import { Request, Response } from "express";
import Answer from "../../answer/Answer";

export default function useBaranoffHandler (answer:Answer) {
    return (req: Request, res: Response):void => {
        res.send(`Студенты ${Object.values(req.query).join(', ')} получают пять`);
    }
}