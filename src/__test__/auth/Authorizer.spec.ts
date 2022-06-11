import Authorizer from "../../auth"

describe('Testing Authorizer', ()=>{
    it('given the authorizer function is called, when the user puts in admin and supertest, then it should return true', () => {
        let result = Authorizer.authorize("admin", "supertest")
        expect(result).toBe(true)
    })
})