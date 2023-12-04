import CartModel from '../models/CartModel.js'

export const addToCart = async (request, reply) => {
    try {
        const { userID, paintingID } = request.body
        const cartDB = await CartModel.findOne({ user: userID, painting: paintingID })
        if (cartDB) throw new Error('Painting is already added.')

        const addedCartDB = await new CartModel({
            user: userID,
            painting: paintingID
        }).save()
        return reply.status(200).send(addedCartDB)
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}

export const getItemsInCart = async (request, reply) => {
    try {
        const { userID } = request.params
        const paintingItemsInCartDB = await CartModel.find({ user: userID }).populate('painting')
        return reply.status(200).send(paintingItemsInCartDB)
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}

export const removeToCart = async (request, reply) => {
    try {
        const { userID, paintingID } = request.body
        await CartModel.deleteOne({ user: userID, painting: paintingID })
        return reply.status(200).send({
            success: true,
            message: 'removed to cart.'
        })
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}



export const checkCart = async (request, reply) => {
    try {
        const { userID, paintingID } = request.query
        const cartDB = await CartModel.findOne({ user: userID, painting: paintingID })
        if (!cartDB) throw new Error('Not added.')
        return reply.status(200).send({
            success: true,
            message: 'Painting exist.'
        })
    } catch (e) {
        return reply.status(400).send({
            success: true,
            message: e.message
        })
    }
}