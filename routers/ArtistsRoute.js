import { addArtist, getArtist, getArtists, updateArtist } from "../controllers/ArtistsController.js"

export default async (fastify, options) => {
    fastify.get('/', getArtists)
    fastify.post('/', addArtist)
    fastify.patch('/:artistId', updateArtist)
    fastify.get('/:artistID', getArtist)
}