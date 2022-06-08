import OlympEvent from "../domain/event"
import { autoInjectable } from "tsyringe";
import EventModel, { IEventDB } from "../database/schemas/event.schema";
import { eventFromDB } from "../database/schemas/eventConverter";

@autoInjectable()
export default class EventRepository{

    async getAllEvents(): Promise<Array<OlympEvent>>{
        let result: Array<IEventDB> = await EventModel.find()
        return result.map(event => {
            return eventFromDB(event)
        })
    }

    async getEventById(id: string): Promise<OlympEvent>{
        let result: OlympEvent = await EventModel.findById(id)
        return result
    }

    public async addEvent(event: OlympEvent): Promise<OlympEvent> {
        let dbEvent: IEventDB  = new EventModel({name: event.name, description: event.description, games: event.games, _id: event._id})
        let result: IEventDB = await dbEvent.save();
        return eventFromDB(result)
    }

    public async updateEvent(event: OlympEvent): Promise<OlympEvent> {
        let result: IEventDB = await EventModel.findByIdAndUpdate(event._id, event,{
            new: true
        })
        return eventFromDB(result)
    }

    async deleteEvent(_id: string): Promise<boolean> {
        let result: IEventDB = await EventModel.findByIdAndDelete(_id)
        return result ? true : false
    }
}

