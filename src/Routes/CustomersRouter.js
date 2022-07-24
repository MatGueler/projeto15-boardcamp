import { getCustomers, getCustomersId, postCustomers, updateCustomers } from '../Controllers/CustomersController.js'
import { Router } from 'express'

const server = Router()

server.get('/customers', getCustomers)
server.get('/customers/:id', getCustomersId)
server.post('/customers', postCustomers)
server.put('/customers/:id', updateCustomers)


export default server;