import express from 'express'
import CategoriesRouter from './Routes/CategoriesRouter.js'
import GamesRouter from './Routes/GamesRouter.js'
import CustomersRouter from './Routes/CustomersRouter.js'
import cors from 'cors'

const server = express();
server.use(express.json());
server.use(cors());

// Categories
server.use(CategoriesRouter)

// Games
server.use(GamesRouter)

// Customers
server.use(CustomersRouter)

// Rentals
server.use(RentalsRouter)


server.listen(4000, () => {
    // console.log("Server running on port " + process.env.PORT);
    console.log("Server running on port ");
});