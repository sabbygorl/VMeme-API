import ArtistModel from "../models/ArtistModel.js"
import PaintingModel from "../models/PaintingModel.js"

export const addArtist = async (request, reply) => {
    try {
        const { artistFullName, description, imageURL } = request.body

        await new ArtistModel({
            name: artistFullName,
            description,
            imageURL
        }).save()

        return reply.status(200).send({
            success: true,
            message: "Artist created."
        })

    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.errors.name.message || e.message
        })
    }
}

export const getArtists = async (request, reply) => {
    try {
        const page = request.query.page || 1
        const search = request.query.search || null
        const totalDocuments = await ArtistModel.countDocuments()
        const artists = await ArtistModel.find(
            {
                name: { $regex: search ? '.*' + search : '', $options: 'i' }
            }
        )
            .sort(search && { name: 'asc' })
            .limit(10).skip(10 * (Number(page) === 1 ? 0 : Number(page) - 1))

        return reply.status(200).send({
            totalDocuments,
            page: Number(page),
            data: artists
        })
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.errors.name.message || e.message
        })
    }
}

export const getArtist = async (request, reply) => {
    try {
        const { artistID } = request.params
        const artistDB = ArtistModel.findOne({ _id: artistID })
        const paintingsDB = PaintingModel.find({ artist: artistID, type: 'artist' })

        const [artistData, paintingsData] = await Promise.all([artistDB, paintingsDB])
        return reply.status(200).send({
            artist: artistData,
            paintings: paintingsData
        })
    } catch (e) {
        return reply.status(400).send({
            success: false,
            message: e.message
        })
    }
}