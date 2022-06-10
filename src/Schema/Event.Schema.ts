import { object, string, array, TypeOf, z } from "zod";
import { GameSchema } from "./Game.Schema";

export const createEventSchema = object({
    body: object({
        _id: string().optional(),
        name: string({
            required_error: "Required name field"
        }).min(2, "Description has to have at least 2 characters"),
        description: string({
            required_error: "Required description field"
        }),
        games: array(string()/* GameSchema */, {
            required_error: "Required games field"
        })
    })
})

export type CreateEventInput = z.infer<typeof createEventSchema>;