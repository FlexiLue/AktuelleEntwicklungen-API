import { Schema, Types }from 'mongoose'


export default interface IGame{
    _id: Types.ObjectId
    name: String
}

const gameSchema = new Schema<IGame>({
    name: {type: String, required: true}
})