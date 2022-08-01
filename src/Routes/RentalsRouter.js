import { getRentals, postRentals, finishRentals, deleteRentals } from '../Controllers/RentalsController.js'
import { Router } from 'express'

const server = Router()

server.get('/rentals', getRentals)
server.post('/rentals', postRentals)
server.post('/rentals/:id/return', finishRentals)
server.delete('/rentals/:id', deleteRentals)

export default server;