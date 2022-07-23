import { getCustomers, getCustomersId, postCustomers } from '../Controllers/CustomerController.js'
import { Router } from 'express'

const server = Router()

server.get('/customers', getCustomers)
server.get('/customers/:id', getCustomersId)
server.post('/customers', postCustomers)

export default server;