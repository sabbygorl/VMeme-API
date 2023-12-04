import { Schema, model } from "mongoose";

export const paintingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        require: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'artist',
        required: true
    },
    type: {
        type: String,
        enum: ['artist', 'exhibition'],
        default: 'artist',
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Not available', 'Sold'],
        default: 'Available', // Set a default value if needed
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
})

const paintingModel = model('painting', paintingSchema)

export default paintingModel