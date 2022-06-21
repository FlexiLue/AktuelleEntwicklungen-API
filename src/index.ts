import "reflect-metadata";
import mongoose from 'mongoose';
import createServer from './server';
import { container } from "tsyringe";
import EventController from "./event/eventController";

const port = 5000;

mongoose.connect('mongodb://localhost:27017/').catch(error => console.log(error))

const eventController = container.resolve(EventController);


const server = createServer(eventController)

server.listen(port, () => console.log(`listening on port: ${port}`));





