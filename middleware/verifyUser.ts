import { json } from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyUser = (req:any, res:any, next:any) => {
    try{
        const [bearer, token] = req.headers.authorization.split(' ');
        console.log("req.headers.authorization", req.headers.authorization);
        console.log("token", token);
        let jwtSecretKey: string = process.env.JWT_SECRET_KEY!;
        if(token){
            console.log("jwtSecretKey while verifying:", jwtSecretKey);
            jwt.verify(token, jwtSecretKey, (err:any, user:any) => {
                if(err){
                    res.status(403).json({"data": null, "statusCode": 403, "errorCode": 403, "errorMessage": "Invalid token!"});
                }
                else{
                    const decodedToken = jwt.decode(token, {complete: true})?.payload;
                    if(decodedToken && typeof decodedToken === "object"){
                        if(decodedToken.userId !== req.params.userId){
                            res.status(401).json({"data": null, "statusCode": 401, "errorCode": 401, "errorMessage": "Access unauthorized!"});
                        }
                        else{
                            req.user = req;
                            next();
                        }
                    }
                    else{
                        throw new Error("Failed to decode the token!");
                    }
                }
            })
        }
        else{
            res.status(401).json({"data": null, "statusCode": 401, "errorCode": 401, "errorMessage": "Authorization Token not provided!"});
        }
    }
    catch(err){
        res.status(500).json({"data": null, "statusCode": 500, "errorCode": 500, "errorMessage": String(err)});
    }
}