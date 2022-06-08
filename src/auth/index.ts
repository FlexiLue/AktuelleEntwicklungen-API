export default class Authorizer{

    /* TODO Authorizer connecting to Database and looking for user */
    static authorize(username: string, password: string): boolean{
        return username == 'admin' || password == 'supertest'
    }
}