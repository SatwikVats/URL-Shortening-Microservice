import { Client, Repository, Schema } from 'redis-om';
import { RedisClientConnection } from 'redis-om';
import { createClient } from 'redis';
import dotenv from "dotenv";



dotenv.config();


const urlSchema = new Schema('Person', {
    userId: {type: 'string'},
    longURL: {type: 'string'},
    shortURL: {type: 'string'},
    integerId: {type: 'number'},
})

const connectRedisOm = async () => {

    // const client = createClient().on('error', error => console.error(error)).connect();

    const client = new Client();
    await client.open();

    const urlRepository = new Repository(urlSchema, client);
    await urlRepository.createIndex();

    

    

}

export default connectRedisOm;