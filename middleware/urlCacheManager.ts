import dotenv from "dotenv";

dotenv.config();

import connectRedis from "../config/redis";
import { SchemaFieldTypes } from "redis";

export const urlCacheHandler = async (req: any, res: any, next: any) => {
    try{
        const redisClient = await connectRedis();
        redisClient.ft.CREATE('users', {
            '$.username':{
                type: SchemaFieldTypes.TEXT,
                SORTABLE: true,
            },
            '$.password':{
                type: SchemaFieldTypes.TEXT,
                SORTABLE: true,
            },
        }, {

        })

    }
    catch(err){
        res.status(500).json({"data": null, "statusCode": 500, "errorCode": 500, "errorMessage": String(err)});
    }

}