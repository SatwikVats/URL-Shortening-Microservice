import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app: Application = express();
const PORT: number = 3500;

app.use(express.json()); // Middleware
app.use(cors()); // Enable CORS (Cross Origin Resource Sharing) to make the API accessible to frontend.

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});



mongoose.connection.once('open', () => {
  console.log('Connected to the DB');
  app.listen(process.env.PORT || PORT, () => {
    console.log('Server is up and running');
  });
});
