import express, { Request } from 'express';
import "reflect-metadata";
import {container} from "tsyringe";
import expressBasicAuth, { IBasicAuthedRequest } from 'express-basic-auth'
import Authorizer from './auth';
import EventController from './event/eventController';
import mongoose from 'mongoose';
import { errorLogger, errorResponder, invalidPathHandler } from './middleware/Error/ErrorHandler';

const port = 5000;

mongoose.connect('mongodb://localhost:27017/').catch(error => console.log(error))


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

app.listen(port, () => console.log(`listening on port: ${port}`));




