import "reflect-metadata";
import mongoose from 'mongoose';
import createServer from './server';

const port = 5000;

mongoose.connect('mongodb://localhost:27017/').catch(error => console.log(error))
const server = createServer()

server.listen(port, () => console.log(`listening on port: ${port}`));





