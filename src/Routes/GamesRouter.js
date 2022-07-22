import { getGames } from '../Controllers/GamesController.js'
import { Router } from 'express'

const server = Router()

server.get('/games', getGames)
// server.post('/categories', postCategories)

export default server;