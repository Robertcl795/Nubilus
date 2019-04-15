import { Schema, Document, model } from 'mongoose'

export interface IEvent extends Document {
    title: string,
    description: string,
    price: number,
    date: Date,
    createdBy: string
}

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Event = model<IEvent>('Event', EventSchema)
export default Event