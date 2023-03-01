import { Request, Response } from "express";

export default function baranoffHandler (req: Request, res: Response): void {
    res.send(`Студенты ${Object.values(req.query).join(', ')} получают пять`);
}