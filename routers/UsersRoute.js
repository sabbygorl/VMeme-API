import { getUsers } from "../controllers/UsersController.js"

export default async (fastify, option) => {
    fastify.get('/', getUsers)
}