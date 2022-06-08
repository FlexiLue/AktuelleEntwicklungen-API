import { GeneratePrimeOptions } from "crypto";
import { ObjectId } from "mongodb";

export default class OlympEvent{
    _id: string;
    name: string;
    description: string;
    games: Array<string>;


    constructor (name: string, description: string, games: Array<string>, id?: string, ) {
        if(name.length < 1) throw new Error('Name must contain at least 1 character.')
        if(description.length < 1) throw new Error('Description must contain at least 1 character.')

        this._id = id;
        this.name = name;
        this.description = description;
    }
}