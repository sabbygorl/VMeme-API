
import { signup, otp, otpVerify, signin } from '../controllers/AuthController.js'

export default async (fastify, options) => {
    fastify.post('/signup', signup)
    fastify.post('/signin', signin)
    fastify.post('/otp', otp)
    fastify.post('/otp/verify', otpVerify)
}