import CartModel from "../models/CartModel.js"
import OrderModel from "../models/OrderModel.js"
import OrderReferenceModel from "../models/OrderReferenceModel.js"
import PaintingModel from "../models/PaintingModel.js"

export const addOrder = async (request, reply) => {
    try {
        const {
            user,
            email,
            phoneNumber,
            address,
            zipCode,
            referenceID,
        } = request.body
        const cartItemsDB = await CartModel.find({ user }).select('painting -_id').populate({ path: 'painting' })
        if (!cartItemsDB || cartItemsDB.length <= 0) throw new Error('No ordered paintings.')

        const paintingReferencesIDs = await cartItemsDB.map(item => item.painting._id)
        const paintingReferences = await cartItemsDB.map(item => item.painting)
        await paintingReferences.forEach((value) => delete value._doc._id)
        const paintingReferencesDB = await OrderReferenceModel.insertMany(paintingReferences)
        const paintingReferencesDBIDs = await paintingReferencesDB.map(item => item._id)

        //add order
        await new OrderModel({
            user,
            email,
            phoneNumber,
            address,
            zipCode,
            referenceID,
            orderedPaintings: paintingReferencesDBIDs
        }).save()


        //make the items unavaible to users
        console.log(paintingReferencesIDs)
        const sam = await PaintingModel.updateMany({ _id: { $in: paintingReferencesIDs } }, { $set: { status: 'Not available' } })
        console.log(sam)

        //delete items in cart
        await CartModel.deleteMany({ user })

        return reply.status(200).send({
            success: true,
            message: 'Item is on verification'
        })

    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}

export const getUserOrders = async (request, reply) => {
    try {
        const { userID } = request.params
        const ordersDB = await OrderModel.find({ user: userID }).sort('-createdAt')
        return reply.status(200).send(ordersDB)
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}

export const getOrders = async (request, reply) => {
    try {
        const page = request.query.page || 1
        const totalDocuments = await OrderModel.countDocuments()
        const ordersDB = await OrderModel.find()
            .sort('createdAt')
            .limit(10).skip(10 * (Number(page) === 1 ? 0 : Number(page) - 1))
            .populate({ path: 'orderedPaintings', populate: { path: 'artist', select: 'name' } })

        return reply.status(200).send({
            totalDocuments,
            page: Number(page),
            data: ordersDB
        })
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.errors.name.message || e.message
        })
    }
}

export const getOrder = async (request, reply) => {
    try {
        const { orderID } = request.params
        const orderDB = await OrderModel.findOne({ _id: orderID }).populate({ path: 'orderedPaintings', populate: { path: 'artist', select: 'name' } })
        if (!orderDB) throw new Error('Order doesn\'t exist')
        return reply.status(200).send(orderDB)
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}

export const updateStatus = async (request, reply) => {
    try {
        const { orderID } = request.params
        const { status } = request.body
        const orderDB = await OrderModel.findOne({ _id: orderID })
        if (!orderDB.confirmedDate && status === 'Confirmed') {
            orderDB.confirmedDate = Date.now()
        }
        else if ((!orderDB.completedDate && status === 'Completed') || (!orderDB.completedDate && status === 'Declined')) {
            orderDB.completedDate = Date.now()
        }

        orderDB.status = status
        orderDB.save()

        return reply.status(200).send({
            success: true,
            message: 'Updated.'
        })

    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}

