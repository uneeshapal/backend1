import express from 'express';
import router from './approuter/routing.js';
import './backconnection/db.js';
import { configDotenv } from 'dotenv';
configDotenv();
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';


const app = express();

const myport = process.env.PORT || 9000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(myport, () => {
    console.log(`Server is running on port ${myport}`);
});