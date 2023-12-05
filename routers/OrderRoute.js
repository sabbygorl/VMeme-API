import { addOrder, getOrder, getOrders, getUserOrders, updateStatus } from "../controllers/OrderController.js"

export default async (fastify, option) => {
    fastify.post('/', addOrder)
    fastify.get('/', getOrders)
    fastify.get('/:userID', getUserOrders)
    fastify.patch('/:orderID', updateStatus)
    fastify.get('/detail/:orderID', getOrder)
}