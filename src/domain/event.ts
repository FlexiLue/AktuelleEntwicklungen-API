export default class OlympEvent{
    _id: string;
    name: string;
    description: string;
    games: string[];


    constructor (name: string, description: string, games: string[], id?: string) {
        if(id)
            this._id = id;
        else
            this._id = "";
        this.name = name;
        this.description = description;
        this.games = games;
    }
}