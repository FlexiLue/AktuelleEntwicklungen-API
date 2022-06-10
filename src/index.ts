import "reflect-metadata";
import mongoose from 'mongoose';
import createServer from './server';

const port = 5000;

mongoose.connect('mongodb://localhost:27017/').catch(error => console.log(error))
const server = createServer()

/* const app  = express();
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
 */
server.listen(port, () => console.log(`listening on port: ${port}`));





