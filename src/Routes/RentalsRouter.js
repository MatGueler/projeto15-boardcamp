import { getRentals } from '../Controllers/GamesController.js'
import { Router } from 'express'

const server = Router()

server.get('/games', getRentals)
// server.post('/games', postGames)

export default server;