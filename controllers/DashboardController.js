import ArtistModel from '../models/ArtistModel.js'
import PaintingModel from '../models/PaintingModel.js'
import OrderModel from '../models/OrderModel.js'
import UserModel from '../models/UserModel.js'

export const getDocumentCounts = async (request, reply) => {
    try {
        const artistCount = await ArtistModel.countDocuments()
        const paintingCount = await PaintingModel.countDocuments()
        const pendingOrdersCount = await OrderModel.countDocuments({ status: 'Pending' })
        const customerCount = await UserModel.countDocuments()

        return reply.status(200).send({
            artistCount,
            paintingCount,
            pendingOrdersCount,
            customerCount
        })
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}