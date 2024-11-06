import express from 'express';
import dotenv from "dotenv";
import mycontacts from './routes/mycontactsRouter.js';
import middlewareErrorHandler from './middlewares/errorHandler.js';
import connectDB from "./config/dbConnection.js";
import router from './routes/UserRoutes.js';

dotenv.config();


connectDB();

const app = express();

const port = process.env.PORT || 3002;

app.use(express.json());
app.use("/api/contact" , mycontacts);
app.use("/api" , router);
app.use(middlewareErrorHandler);

app.listen(port , ()=>(console.log(`server is successfully running on the ${port}!!!!`)))