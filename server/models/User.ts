import mongoose, { Schema, Document, Error } from 'mongoose'
import bcrypt from 'bcryptjs'

import { UserInterface } from '../interfaces/user'



type UserDocument = Document & UserInterface & { comparePassword: comparePasswordFunction; }



type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

UserSchema.pre('save', function (next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err: Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
})

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

UserSchema.methods.comparePassword = comparePassword


const userModel = mongoose.model<UserDocument>('user', UserSchema)

export default userModel