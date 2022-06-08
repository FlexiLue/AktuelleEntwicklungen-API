import { Mongoose, Model, Models} from "mongoose"
import { eventSchema } from "./schemas/event.schema"
import { autoInjectable } from "tsyringe"

@autoInjectable()
export default class Database{
    database: Mongoose

    constructor(database: Mongoose){
        this.database = database
        database.model('Event', eventSchema)
    }
}
