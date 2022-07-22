import express from 'express'
import CategoriesRouter from './Routes/CategoriesRouter.js'
import cors from 'cors'

const server = express();
server.use(express.json());
server.use(cors());

// Categories
server.use(CategoriesRouter)

// Games
server.use(GamesRouter)


server.listen(4000, () => {
    // console.log("Server running on port " + process.env.PORT);
    console.log("Server running on port ");
});