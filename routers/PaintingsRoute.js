import { addPainting, getPaintings, getPainting } from "../controllers/PaintingsController.js"

export default async (fastify, option) => {
    fastify.get('/', getPaintings)
    fastify.post('/', addPainting)
    fastify.get('/:paintingID', getPainting)
}