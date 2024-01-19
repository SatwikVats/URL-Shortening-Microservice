import {createClient} from 'redis';
import dotenv from "dotenv";

dotenv.config();

const connectRedis = async () => {

    // We are connecting to default port 6379 in this case.
    const client = createClient();
    client.on('error', (error) => {
    console.error('Redis connection error:', error);
    });
    client.on('end', () => {
    console.log('Connection to Redis closed');
    });

    await client.connect();
    return client;

}

export default connectRedis;