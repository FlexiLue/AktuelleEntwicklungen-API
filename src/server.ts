import "reflect-metadata"
import express from "express";
import expressBasicAuth, { IBasicAuthedRequest } from "express-basic-auth";
import { container } from "tsyringe";
import Authorizer from "./auth";
import EventController from "./event/eventController";
import { errorLogger, errorResponder, invalidPathHandler } from "./middleware/Error/ErrorHandler";

function createServer(){
    const app  = express();
    app.use(express.json());


    app.use(
        expressBasicAuth({
            authorizer: (user: string, password: string) => Authorizer.authorize(user, password),
            unauthorizedResponse: (req: IBasicAuthedRequest) => req.auth ? ('Credentials rejected'): 'No credentials provided'
        })
    )

    const eventController = container.resolve(EventController);

    app.use('/events', eventController.routes())

    app.use(errorLogger)
    app.use(errorResponder)
    app.use(invalidPathHandler)

    return app
}

export default createServer
