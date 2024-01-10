import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import connectDB from './config/dbConfig';

import urlShortenRouter from './route/url.router';
import userRouter from './route/user.router';

const app: Application = express();
const PORT: number = 8000;

app.use(express.json()); // Middleware
app.use(cors()); 
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.use("/api/url", urlShortenRouter);
app.use("/api/user", userRouter)



mongoose.connection.once('open', () => {
  console.log('Connected to the DB');
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
    console.log('Server is up and running');
  });
});
