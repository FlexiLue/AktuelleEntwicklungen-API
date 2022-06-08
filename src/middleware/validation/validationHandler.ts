import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validateRessource = (schema: AnyZodObject) => (req: Request, res: Response , next: NextFunction) => {
    try{
        schema.parse({
            body: req.body,
            parameter: req.params,
            query: req.query
        });
        next();
    } catch (e){
        if(e instanceof ZodError){
            return res.status(400).send(e.flatten())
        } else {
            throw e
        }
    }
}