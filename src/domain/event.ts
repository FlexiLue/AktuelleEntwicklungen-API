export default class OlympEvent{
    _id: string;
    name: string;
    description: string;
    games: Array<string>;


    constructor (name: string, description: string, games: Array<string>, id?: string, ) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.games = games;
    }
}