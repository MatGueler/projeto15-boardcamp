import { getGames } from '../Controllers/GamesController.js'
import { postGames } from '../Controllers/GamesController.js'
import { Router } from 'express'

const server = Router()

server.get('/games', getGames)
server.post('/games', postGames)

export default server;