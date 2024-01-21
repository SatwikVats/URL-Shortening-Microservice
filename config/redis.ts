import {createClient} from 'redis';
import dotenv from "dotenv";

dotenv.config();

const connectRedis = async () => {

    const isDocker = process.env.DOCKER === 'true'? true: false;
    let client;

    if(isDocker){
        //Updating the host incase server is running inside a Docker conatiner.
        client = createClient({url: "redis://@redis-server:6379"});
    }
    else{
        // Default host 127.0.0.1 and port 6379 otherwise.
        client = createClient();
    }
    
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