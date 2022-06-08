import {object, string, array, TypeOf} from "zod";

export const GameSchema = object({
    _id: string(),
    name: string()
})