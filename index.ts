import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import connectDB from './config/dbConfig';


//Trial
import connectRedis from './config/redis';


import urlShortenRouter from './route/url.router';
import userRouter from './route/user.router';
import analyticsRouter from './route/analytics.router';
import { SchemaFieldTypes } from 'redis';

const app: Application = express();
const PORT: number = 8000;

app.use(express.json()); // Middleware
app.use(cors()); 
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.use("/api/url", urlShortenRouter);
app.use("/api/user", userRouter);
app.use("/api/analytics", analyticsRouter);



mongoose.connection.once('open', () => {
  console.log('Connected to the DB');
  app.listen(PORT, async () => {
    console.log(`Now listening on port ${PORT}`);
    console.log('Server is up and running');

    const redisClient = await connectRedis();
    // redisClient.SET('object_trial', {'ffh': 'dds'});

    

    //Health check for Redis
    // redisClient.set('kkk', 'kkk');

    const obj = {
        "k1": "v1",
        "k2": "v2",
    }

    const objResult = await redisClient.hSet('random:1', obj);
    console.log("objResult", objResult);

    // redisClient.json.SET("jsonkey", "jsonstring", obj);
    
    
    // try {
    //   await redisClient.ft.create('idx:users', {
    //       '$.name': {
    //           type: SchemaFieldTypes.TEXT,
    //           SORTABLE: true
    //       },
    //       '$.city': {
    //           type: SchemaFieldTypes.TEXT,
    //           AS: 'city'
    //       },
    //       '$.age': {
    //           type: SchemaFieldTypes.NUMERIC,
    //           AS: 'age'
    //       }
    //   }, {
    //       ON: 'JSON',
    //       PREFIX: 'user:'
    //   });

    //   await Promise.all([
    //     redisClient.json.set('user:1', '$', {
    //         "name": "Paul John",
    //         "email": "paul.john@example.com",
    //         "age": 42,
    //         "city": "London"
    //     }),
    //     redisClient.json.set('user:2', '$', {
    //         "name": "Eden Zamir",
    //         "email": "eden.zamir@example.com",
    //         "age": 29,
    //         "city": "Tel Aviv"
    //     }),
    //     redisClient.json.set('user:3', '$', {
    //         "name": "Paul Zamir",
    //         "email": "paul.zamir@example.com",
    //         "age": 35,
    //         "city": "Tel Aviv"
    //     }),
    //   ]);

    // } catch (e) {
    //     if (String(e) === 'Index already exists') {
    //         console.log('Index exists already, skipped creation.');
    //     } else {
    //         // Something went wrong, perhaps RediSearch isn't installed...
    //         console.error(e);
    //         process.exit(1);
    //     }
    // }
   });
});
