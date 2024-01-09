import { getPage, updatePage } from "../controllers/PageController.js"

const PageRoute = async (fastify) => {
    fastify.get('/', getPage)
    fastify.patch('/', updatePage)
}

export default PageRoute