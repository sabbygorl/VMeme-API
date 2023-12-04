import mongoose from "mongoose";
const Schema = mongoose.Schema

const OTPSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    }
})

const OTPModel = mongoose.model('otp', OTPSchema)
OTPModel.createIndexes()

export default OTPModel