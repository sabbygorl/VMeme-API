
import 'dotenv/config'
import Fastify from "fastify";
import mongoose from 'mongoose';
import fastifyCors from '@fastify/cors';
import AuthRoute from './routers/AuthRoute.js';
import ArtistsRoute from './routers/ArtistsRoute.js';
import PaintingsRoute from './routers/PaintingsRoute.js';
import CartRoute from './routers/CartRoute.js';
import OrderRoute from './routers/OrderRoute.js';
import UsersRoute from './routers/UsersRoute.js';
import DashboardRoute from './routers/DashboardRoute.js';
const port = process.env.PORT || 5000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

const fastify = Fastify()

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err.message))

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

// Run the server!
try {
    await fastify.listen({ host, port })
    console.log(`listening at port ${port}`)
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}