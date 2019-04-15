import { Schema, Document, model } from 'mongoose'

export interface IUser extends Document {
    email: string,
    password: string,
    createdEvents: string[]
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
})

const User = model<IUser>('User', UserSchema)
export default User