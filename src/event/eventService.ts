import { Request } from "express";
import { autoInjectable }from "tsyringe";
import { eventFromDB } from "../database/schemas/eventConverter";
import OlympEvent from "../domain/event";
import EventRepository from "./eventRepository";

@autoInjectable()
export default class EventService {
    eventRepository: EventRepository

    constructor(eventRepository: EventRepository){
        this.eventRepository = eventRepository
    }

    async getEvents(): Promise<Array<OlympEvent>> {
        let events = await this.eventRepository.getAllEvents();
        return events.map(event => {
            return eventFromDB(event)
        });
    }

    async getEventById(id: string): Promise<OlympEvent | null>{
        let event = await this.eventRepository.getEventById(id)
        if(event)
            return eventFromDB(event)
        else
            return null
    }

    async addOrUpdateEvent(_req: Request): Promise<OlympEvent | null> {
        let {name, description, games, _id } = _req.body
        let result = null
        const event = new OlympEvent(name, description, games, _id)
        if(_id){
            result = await this.eventRepository.updateEvent(event)
        } else {
            result = await this.eventRepository.addEvent(event)
        }
        return result ? eventFromDB(result) : null
    }

    async deleteOne(_req: Request): Promise<boolean> {
        const result = this.eventRepository.deleteEvent(_req.params.id)
        return result
    }
}