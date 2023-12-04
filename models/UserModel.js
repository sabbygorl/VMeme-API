import mongoose from "mongoose"
const Schema = mongoose.Schema

const fullNameSchema = new Schema({
    first: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    last: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
}, { _id: false })

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: fullNameSchema,
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema)
userModel.createIndexes()

export default userModel

