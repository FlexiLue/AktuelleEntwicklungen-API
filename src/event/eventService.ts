import { Request } from "express";
import { autoInjectable }from "tsyringe";
import OlympEvent from "../domain/event";
import EventRepository from "./eventRepository";

@autoInjectable()
export default class EventService {
    eventRepository: EventRepository

    constructor(eventRepository: EventRepository){
        this.eventRepository = eventRepository
    }

    getEvents(): Promise<Array<OlympEvent>> {
        return this.eventRepository.getAllEvents();
    }

    getEventById(id: string): Promise<OlympEvent>{
        return this.eventRepository.getEventById(id)
    }

    async addOrUpdateEvent(_req: Request): Promise<OlympEvent> {
        const { name, description, games, _id } = _req.body
        const event = new OlympEvent(name, description, games, _id)

        if(await (this.eventRepository.getEventById(_id)) != null){
            const result = this.eventRepository.updateEvent(event);
            return result
        } else {
            const result = this.eventRepository.addEvent(event)
            return result
        }
    }

    async deleteOne(_req: Request): Promise<boolean> {
        const result = this.eventRepository.deleteEvent(_req.params.id)
        return result
    }
}