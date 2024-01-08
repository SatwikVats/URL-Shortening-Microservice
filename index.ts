import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import connectDB from './config/dbConfig';

const app: Application = express();
const PORT: number = 8000;

app.use(express.json()); // Middleware
app.use(cors()); // Enable CORS (Cross Origin Resource Sharing) to make the API accessible to frontend.
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

// app.listen(PORT, () => {
//   console.log(`Now listening on port ${PORT}`);
// });



mongoose.connection.once('open', () => {
  console.log('Connected to the DB');
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
    console.log('Server is up and running');
  });
});
