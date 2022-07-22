import { getCategories } from '../Controllers/CategoriesController.js'
import { Router } from 'express'

const server = Router()

server.get('/categories', getCategories)

export default server;