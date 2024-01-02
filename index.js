
import 'dotenv/config'
import fastifyCors from '@fastify/cors';
import AuthRoute from './routers/AuthRoute.js';
import ArtistsRoute from './routers/ArtistsRoute.js';
import PaintingsRoute from './routers/PaintingsRoute.js';
import CartRoute from './routers/CartRoute.js';
import OrderRoute from './routers/OrderRoute.js';
import UsersRoute from './routers/UsersRoute.js';
import DashboardRoute from './routers/DashboardRoute.js';

const main = async (fastify) => {
    fastify.register(fastifyCors, {
        origin: 'http://localhost:3000'
    })

    fastify.register(AuthRoute, { prefix: '/api/v1/auth' })
    fastify.register(ArtistsRoute, { prefix: '/api/v1/artist' })
    fastify.register(PaintingsRoute, { prefix: '/api/v1/paintings' })
    fastify.register(CartRoute, { prefix: '/api/v1/cart' })
    fastify.register(OrderRoute, { prefix: '/api/v1/order' })
    fastify.register(UsersRoute, { prefix: '/api/v1/user' })
    fastify.register(DashboardRoute, { prefix: '/api/v1/dashboard' })
}

export default main



