import PageModel from '../models/PageModel.js'
export const getPage = async (request, reply) => {
    try {
        const pageDB = await PageModel.findOne()
        return reply.status(200).send(pageDB)
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}

export const updatePage = async (request, reply) => {
    try {
        const updateBody = request.body
        await PageModel.updateOne({}, { ...updateBody }, { upsert: true })
        return reply.status(200).send({
            success: true,
            message: 'Page updated.'
        })
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}