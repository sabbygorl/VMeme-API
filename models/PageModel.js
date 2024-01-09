import { Schema, model } from 'mongoose'

const PageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
})

const PageModel = model('page', PageSchema)

export default PageModel