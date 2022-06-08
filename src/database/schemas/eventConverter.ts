import OlympEvent from "../../domain/event";
import { IEventDB } from "./event.schema";

export function eventFromDB(event: IEventDB): OlympEvent{
    return new OlympEvent(
        event.name,
        event.description,
        event.games.map(games => {return games.toString()}),
        event._id.toString()
    )
}