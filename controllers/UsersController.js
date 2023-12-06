import UserModel from '../models/UserModel.js'
export const getUsers = async (request, reply) => {
    try {
        const page = request.query.page || 1
        const limit = request.query.limit || null
        const search = request.query.search || null
        const totalDocuments = await UserModel.countDocuments()

        const users = await UserModel.find(
            {
                'fullName.first': { $regex: search ? '.*' + search : '', $options: 'i' }
            }
        )
            .select('-password')
            .sort({ createdAt: 'desc' })
            .limit(limit === 'all' ? null : limit)
            .skip(10 * (Number(page) === 1 ? 0 : Number(page) - 1))

        return reply.status(200).send({
            totalDocuments,
            page: Number(page),
            data: users
        })
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}