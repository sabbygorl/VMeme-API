
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
const fastify = Fastify()

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err.message))


fastify.register((instance) => {
    instance.register(fastifyCors, {
        origin: 'http://localhost:3000'
    })
    instance.register(AuthRoute, { prefix: '/api/v1/auth' })
    instance.register(ArtistsRoute, { prefix: '/api/v1/artist' })
    instance.register(PaintingsRoute, { prefix: '/api/v1/paintings' })
    instance.register(CartRoute, { prefix: '/api/v1/cart' })
    instance.register(OrderRoute, { prefix: '/api/v1/order' })
    instance.register(UsersRoute, { prefix: '/api/v1/user' })
    instance.register(DashboardRoute, { prefix: '/api/v1/dashboard' })
})

export default async (req, res) => {
    await fastify.ready();
    fastify.server.emit("request", req, res);
};