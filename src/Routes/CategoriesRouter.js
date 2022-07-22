import { getCategories } from '../Controllers/CategoriesController.js'
import { postCategories } from '../Controllers/CategoriesController.js'
import { Router } from 'express'

const server = Router()

server.get('/categories', getCategories)
server.post('/categories', postCategories)

export default server;