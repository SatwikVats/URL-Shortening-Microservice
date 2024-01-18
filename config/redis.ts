import {createClient} from 'redis';
import dotenv from "dotenv";

dotenv.config();

const connectRedis = async () => {
    const port = process.env.REDIS_PORT;
    const username = process.env.REDIS_USERNAME;
    const password = process.env.REDIS_PASSWORD;
    const host = process.env.REDIS_HOST;
    const dbNumber = process.env.REDIS_DB_NUMBER;

    console.log("Error checkpoint 1");
    // const client = await createClient({url: `redis://${username}:${password}@${host}.redis.server:${port}/${dbNumber}`}).on('error', error => console.error(error)).connect();

    // Connects to default PORT at 6379
    // const client = await createClient().on('error', error => console.error(error)).connect();

    const client = createClient();

    console.log("Error checkpoint 2");

    client.on('error', (error) => {
    console.error('Redis connection error:', error);
    });

    console.log("Error checkpoint 3");

    client.on('end', () => {
    console.log('Connection to Redis closed');
    });

    console.log("Error checkpoint 4");

    await client.connect();

    
    // try{
    //     const redisClient = await connectRedis();
    

    // }
    // catch(err){
    //     console.log("Error while connecting to Redis:", err)
        
    // }
    
    console.log("Error checkpoint 5");
    return client;

}

export default connectRedis;