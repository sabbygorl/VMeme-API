import { addArtist, getArtist, getArtists } from "../controllers/ArtistsController.js"

export default async (fastify, options) => {
    fastify.get('/', getArtists)
    fastify.post('/', addArtist)
    fastify.get('/:artistID', getArtist)
}