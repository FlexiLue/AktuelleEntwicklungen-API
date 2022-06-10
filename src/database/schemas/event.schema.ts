import { Schema, Types} from 'mongoose'
import mongoose from 'mongoose'

export interface IEventDB extends mongoose.Document{
    name: string;
    description: string;
    games: Array<Types.ObjectId>
}


export const eventSchema = new Schema<IEventDB>({
    name: {type: String, required: true},
    description: {type: String, requried: false},
    games: {type: [Schema.Types.ObjectId], ref: 'Game' }
})


export default mongoose.model<IEventDB>('EventModel', eventSchema)