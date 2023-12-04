import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    painting: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'painting'
    },
})

const CartModel = model('cart', cartSchema)

export default CartModel