import { Request, Response } from "express";

export default function powHandler(req:Request, res:Response) {
    const value:number = Number(req.params.value);
    const pow:number = Number(req.params.pow);
    res.send(Math.pow(value, pow).toString());
}