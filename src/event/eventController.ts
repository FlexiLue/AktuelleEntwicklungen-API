import { NextFunction, Request, Response, Router } from "express";
import { autoInjectable } from "tsyringe";
import OlympEvent from "../domain/event";
import { validateRessource } from "../middleware/validation/validationHandler";
import { createEventSchema } from "../Schema/Event.Schema";
import EventService from "./eventService";

@autoInjectable()
export default class EventController {
    eventService: EventService;
    router: Router;

    constructor(eventService: EventService) {
        this.eventService = eventService;
        this.router = Router();
    }

    public routes() {
        this.router.get('/:id', async (_req: Request, res: Response, next: NextFunction) =>{
            try {
                let event: OlympEvent | null = await this.eventService.getEventById(_req.params.id)
                if(event)
                    res.send(event)
                else
                    res.sendStatus(404)
            } catch (err){
                next(err)
            }
        })

        this.router.get('/', async (_req: Request, res: Response, next: NextFunction) =>{
            try {
                res.send(await this.eventService.getEvents())
            } catch (err){
                next(err)
            }
        })

        this.router.put('/', validateRessource(createEventSchema), async (_req: Request, res: Response, next: NextFunction) => {
            try {
                let result = await this.eventService.addOrUpdateEvent(_req)
                if(result){
                    res.location('/events/' + result._id)
                    res.json(result)
                } else {
                    res.sendStatus(400)
                }
            } catch (err){
                next(err)
            }
        })

        this.router.delete('/:id', async (_req: Request, res: Response, next: NextFunction) => {
            try {
                let result: boolean = await this.eventService.deleteOne(_req)
                if(result)
                    res.sendStatus(204)
                else
                    res.sendStatus(400)
            } catch (err){
                next(err)
            }
        })
        return this.router;
    }
}