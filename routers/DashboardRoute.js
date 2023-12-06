import { getDocumentCounts } from "../controllers/DashboardController.js"

export default async (fastify, option) => {
    fastify.get('/', getDocumentCounts)
}