import { getRentals, postRentals } from '../Controllers/RentalsController.js'
import { Router } from 'express'

const server = Router()

server.get('/rentals', getRentals)
server.post('/rentals', postRentals)

export default server;