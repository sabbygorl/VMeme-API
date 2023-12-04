import { Schema, model } from 'mongoose'

const artistSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null
    },
    imageURL: {
        type: String,
        default: null
    },
})

const ArtistModel = model('artist', artistSchema)
export default ArtistModel