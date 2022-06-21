import "reflect-metadata";

import EventRepository from "../../event/eventRepository";
import EventModel from "../../database/schemas/event.schema";
import OlympEvent from "../../domain/event";

const eventRepository = new EventRepository();

describe("updateEvent", () => {
    it("given a valid event, when invoked, should return IEvent or null", async () => {
        jest.spyOn(EventModel, 'findByIdAndUpdate').mockResolvedValue({_id: "5349b4ddd2781d08c09890f3", name: "aidösfa", description: "öjsaldfaosöf", games: []});

        let result = await eventRepository.updateEvent(new OlympEvent("aidösfa", "öjsaldfaosöf", [], "5349b4ddd2781d08c09890f3"))
        expect(result).toEqual(expect.objectContaining({name: expect.any(String), description: expect.any(String), games: expect.any(Array), _id: expect.any(String)}))
    })
})