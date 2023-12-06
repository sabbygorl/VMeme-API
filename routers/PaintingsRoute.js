import { addPainting, getPaintings, getPainting, updatePainting } from "../controllers/PaintingsController.js"

export default async (fastify, option) => {
    fastify.get('/', getPaintings)
    fastify.post('/', addPainting)
    fastify.get('/:paintingID', getPainting)
    fastify.patch('/:paintingId', updatePainting)
}