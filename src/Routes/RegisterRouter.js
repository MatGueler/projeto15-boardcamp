import { registerUser } from '../Controllers/RegisterController.js'
import { Router } from 'express'

const server = Router()

server.get('/cadastro', registerUser)

export default server;