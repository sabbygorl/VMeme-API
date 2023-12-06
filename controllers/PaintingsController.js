import PaintingModel from "../models/PaintingModel.js"

export const addPainting = async (request, reply) => {
    try {
        const paintingBody = request.body
        await new PaintingModel(paintingBody).save()

        return reply.status(200).send({
            success: true,
            message: 'Painting added.'
        })

    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.errors.name.message || e.message
        })
    }
}

export const getPaintings = async (request, reply) => {
    try {
        const page = request.query.page || 1
        const limit = request.query.limit || null
        const search = request.query.search || null
        const totalDocuments = await PaintingModel.countDocuments()
        const paintings = await PaintingModel
            .find({
                name: { $regex: search ? '.*' + search : '', $options: 'i' }
            })
            .limit(limit === 'all' ? null : limit)
            .populate('artist')
            .skip(10 * (Number(page) === 1 ? 0 : Number(page) - 1))

        return reply.status(200).send({
            totalDocuments,
            page: Number(page),
            data: paintings
        })
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}

export const updatePainting = async (request, reply) => {
    try {
        const { paintingId } = request.params
        const paintingBody = request.body
        await PaintingModel.updateOne({ _id: paintingId }, { $set: paintingBody })
        return reply.status(200).send({
            success: true,
            message: 'Updated successfully.'
        })
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}

export const getPainting = async (request, reply) => {
    try {
        const { paintingID } = request.params
        const paintingDB = await PaintingModel.findOne({ _id: paintingID }).populate({ path: 'artist', select: 'name' })
        if (!paintingDB) throw new Error('Painting doesn\'t exist.')
        return reply.status(200).send(paintingDB)
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}