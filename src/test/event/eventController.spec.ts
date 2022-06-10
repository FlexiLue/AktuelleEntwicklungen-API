import createServer from '../../server';
import supertest from 'supertest';
import mongoose from 'mongoose';


const request = supertest(createServer());

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/').catch(error => console.log(error))
})

afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
})

describe("Event Controller", () => {
    it('Gets all Events', done => {
        request.
            get('/events')
            .auth('admin', 'supertest')
            .expect(200)
            .expect((res) => {
            })
            .end(done)
    })

    it('bad URL', done => {
        request.
            get('/url')
            .auth('admin', 'supertest')
            .expect(404)
            .expect((res) => {
            })
            .end(done)
    })
})
