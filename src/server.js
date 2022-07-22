import express from 'express'
import RegisterRouter from './Routes/RegisterRouter.js'
import cors from 'cors'

const server = express();
server.use(express.json());
server.use(cors());


server.use(RegisterRouter)


server.listen(5009, () => {
    // console.log("Server running on port " + process.env.PORT);
    console.log("Server running on port ");
});