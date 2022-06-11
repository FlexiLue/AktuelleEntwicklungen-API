import createServer from '../../server';
import supertest from 'supertest';
import mongoose from 'mongoose';

const eventJestModel = {
    _id: expect.any(String),
    name: expect.any(String),
    description: expect.any(String),
    games: expect.any(Array<string>)
}

const app = createServer();
const request = supertest(createServer());

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/').catch(error => console.log(error))
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
})

describe("event routes", () => {
    describe("given authentication was provided", () => {
        describe("when GET /events get called", () => {
            it('should return a array of Event Objects', async () => {
                const {statusCode, body} = await supertest(app).get('/events').auth('admin', 'supertest')
                expect(statusCode).toBe(200)
                expect(body).toEqual(expect.arrayContaining([expect.objectContaining(eventJestModel)]))
            })
        })

        describe("when PUT /events get called", () => {

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
