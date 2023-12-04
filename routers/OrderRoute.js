import { addOrder, getOrder, getOrders, getUserOrders } from "../controllers/OrderController.js"

export default async (fastify, option) => {
    fastify.post('/', addOrder)
    fastify.get('/', getOrders)
    fastify.get('/:userID', getUserOrders)
    fastify.get('/detail/:orderID', getOrder)
}