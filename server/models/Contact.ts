import mongoose, { Schema, Document, Error } from 'mongoose'
import { ContactInterface } from '../interfaces/contact'

type ContactDocument = Document & ContactInterface

const ContactSchema: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const contactModel = mongoose.model<ContactDocument>('contact', ContactSchema)

export default contactModel