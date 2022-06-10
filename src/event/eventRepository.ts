import OlympEvent from "../domain/event"
import { autoInjectable } from "tsyringe";
import EventModel, { IEventDB } from "../database/schemas/event.schema";
import mongoose from "mongoose";

@autoInjectable()
export default class EventRepository{

    async getAllEvents(): Promise<Array<IEventDB>>{
        let result: Array<IEventDB> = await EventModel.find()
        return result;
    }

    async getEventById(id: string): Promise<IEventDB | null>{
        let result: IEventDB | null = await EventModel.findById(id)
        return result
    }

    public async addEvent(event: OlympEvent): Promise<IEventDB> {
        let dbEvent: IEventDB  = new EventModel({name: event.name, description: event.description, games: event.games, _id: event._id})
        let result: IEventDB = await dbEvent.save();
        return result
    }

    public async updateEvent(event: OlympEvent): Promise<IEventDB | null> {
        if(mongoose.isValidObjectId(event._id)){
            let result: IEventDB | null = await EventModel.findByIdAndUpdate(event._id, event,{
                new: true
            })
            return result ? result : null
        } else {
            throw Error('Invalid ID provided')
        }
    }

    async deleteEvent(_id: string): Promise<boolean> {
        let result: IEventDB | null = await EventModel.findByIdAndDelete(_id)
        return result ? true : false
    }
}

