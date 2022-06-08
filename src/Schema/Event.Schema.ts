import { object, string, array, TypeOf } from "zod";
import { GameSchema } from "./Game.Schema";

export const createEventSchema = object({
    body: object({
        name: string({
            required_error: "Required name field"
        }).min(2, "Description has to have at least 2 characters"),
        description: string({
            required_error: "Required description field"
        }),
        games: array(GameSchema, {
            required_error: "Required games field"
        })
    })
})

export type CreateEventInput = TypeOf<typeof createEventSchema>