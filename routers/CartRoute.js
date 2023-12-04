import { addToCart, checkCart, getItemsInCart, removeToCart } from "../controllers/CartController.js"

export default async (fastify, option) => {
    fastify.post('/', addToCart)
    fastify.delete('/', removeToCart)
    fastify.get('/:userID', getItemsInCart)
    fastify.get('/check', checkCart)
}