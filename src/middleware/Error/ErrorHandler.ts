import { NextFunction, Request, Response } from "express"


export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('\x1b[31m', err) // adding some color to our logs
    next(err) // calling next middleware
}

export const errorResponder = (err: Error, _: Request, res: Response, next: NextFunction) => {
    switch(err.name){
        case "MongoServerError":
            return res.status(409).send({message: "MongoServerError occured"})
        case "ValidationError":
            return res.status(400).send({message: err.message})
    }
    next(err)
}

export const invalidPathHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({message: err.message})
}