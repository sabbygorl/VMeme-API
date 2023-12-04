import { Schema, model } from 'mongoose'
import { paintingSchema } from './PaintingModel.js'


const OrderReferenceModel = model('orderReference', paintingSchema)

export default OrderReferenceModel