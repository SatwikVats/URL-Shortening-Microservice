import { json } from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyUser = (req:any, res:any, next:any) => {
    const token = req.headers.authorization;
    let jwtSecretKey: string = process.env.JWT_SECRET_KEY!;
    if(token){
        console.log("jwtSecretKey while verifying:", jwtSecretKey);
        jwt.verify(token, jwtSecretKey, (err:any, user:any) => {
            if(err){
                res.status(403).json({"data": null, "statusCode": 403, "errorCode": 403, "errorMessage": "Invalid token!"});
                //req.user = req;
                next();
            }
        })
    }
}