import createServer from '../../server';
import supertest from 'supertest';
import EventService from '../../event/eventService';
import EventRepository from '../../event/eventRepository';
import EventController from '../../event/eventController';
import OlympEvent from '../../domain/event';
import mongoose from 'mongoose';


const eventJestModel = {
    _id: expect.any(String),
    name: expect.any(String),
    description: expect.any(String),
    games: expect.any(Array<string>)
}

const addEventPayload = {
    name: "Bierolympiade",
    description: "Hier wird Bier getrunken",
    games: []
}

const updateEventPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: "Bierolympiade",
    description: "Hier wird Bier getrunken",
    games: []
}

const eventsPayload = [{
        name: "Bierolympiade",
        description: "Hier wird Bier getrunken",
        games: [],
        _id: "dfaofdsofaösdfasdf"
    }]


const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);
let app: Express.Application


beforeAll(async () => {
    app = createServer(eventController);

    //await mongoose.connect('mongodb://localhost:27017/').catch(error => console.log(error))
})

afterAll(async () => {
    /* await mongoose.disconnect()
    await mongoose.connection.close() */
})

describe("event routes", () => {
    describe("given authentication was provided", () => {
        describe("when GET /events get called", () => {
            it('should return a array of Event Objects', async () => {
                //@ts-ignore
                const getAllEventsMock = jest.spyOn(eventRepository, 'getAllEvents').mockResolvedValue(eventsPayload);

                const {statusCode, body} = await supertest(app).get('/events').auth('admin', 'supertest')

                expect(statusCode).toBe(200)
                expect(getAllEventsMock).toBeCalled()
                expect(body).toEqual(expect.arrayContaining([expect.objectContaining(eventJestModel)]))
            })
        })

        describe("when PUT /events get called", () => {
            describe("and no _id is present", () => {
                it("should create a new Entry in the Database", async () =>  {
                    const addEventMock = jest.spyOn(eventRepository, 'addEvent').mockImplementation(
                        //@ts-ignore
                        (event: OlympEvent) => {
                        return {name: event.name, description: event.description, games: event.games, _id: new mongoose.Types.ObjectId()}
                    })

                    const {statusCode, body} = await await supertest(app).put('/events').send(addEventPayload).auth('admin', 'supertest')
                    expect(statusCode).toBe(201)
                    expect(addEventMock).toBeCalledTimes(1)
                    expect(body).toEqual({...addEventPayload, _id: expect.any(String)})
                    expect(mongoose.isValidObjectId(body._id)).toBeTruthy()
                })
            })
            describe("and valid _id is present", () => {
                it("should updated the ressource", async () => {
                    const updateEventMock = jest.spyOn(eventRepository, 'updateEvent').mockImplementation(
                        //@ts-ignore
                        (event: OlympEvent) => {
                        return {name: event.name, description: event.description, games: event.games, _id: event._id}
                    })

                    const {statusCode, body} = await supertest(app).put('/events').send(updateEventPayload).auth('admin', 'supertest')
                    expect(updateEventMock).toBeCalledTimes(1)
                    expect(statusCode).toBe(200)
                    expect(body).toEqual(updateEventPayload)
                })
            })

            describe("and invalid _id is present", () => {
                it("should throw error", async () => {
                    const updateEventMock = jest.spyOn(eventRepository, 'updateEvent').mockImplementation(
                        //@ts-ignore
                        function (event: OlympEvent) {
                            if(mongoose.isValidObjectId(event._id))
                                 return {name: event.name, description: event.description, games: event.games, _id: event._id}
                            else
                                throw Error('Invalid ID provided')
                    })

                    const {statusCode, body} = await supertest(app).put('/events').send({...updateEventPayload, _id: 'ajdföasfö'}).auth('admin', 'supertest')
                    expect(updateEventMock).toBeCalledTimes(1)
                    expect(statusCode).toBe(500)
                    expect(body).toEqual({"message": "Invalid ID provided"})
                })
            })
        })

        describe("when DELTE /events get called with an valid ID", () => {
            it("should return 204", () => {
                // TODO Spy on Function and mock itw
            })
        })
    })

    describe("given authentication was not provided", () => {
        it('should return a 401 Not Authorized', async () => {
            const {statusCode} = await supertest(app).get('/events')
            expect(statusCode).toBe(401)
        })
    })

})
