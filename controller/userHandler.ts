import { json } from "express";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model";

dotenv.config()

export const fetchUser = async (req: any, res: any) => {
    try{
        const user = await User.findOne({username: req.body.username});
        console.log("typeof(user)" ,typeof(user));
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        // const token = jsonwebtoken.sign(json(user), jwtSecretKey);
        if(user){
            if(req.body.password === user.password){
                res.status(200).json({"data": user, "statusCode": 200, "errorCode": null, "errorMessage": null});
            }
            else{
                res.status(203).json({"data": {"message":"Incorrect password!"}, "statusCode": 203, "errorCode": null, "errorMessage": null});
            }
        }
        else{
            res.status(204).json({"data": {"message":"User not found!"}, "statusCode": 204, "errorCode": null, "errorMessage": null});
        }
    }
    catch(e){
        res.status(500).json({"data": null, "statusCode": 500, "errorCode": 500, "errorMessage": String(e)});
    }
}


export const addUser = async (req: any, res: any) => {
    try{
        const userData = {username: req.body.username, password: req.body.password};
        const result = await User.insertMany(userData);
        if(result){
            res.status(201).json({"data": result, "statusCode": 201, "errorCode": null, "errorMessage": null});
        }
        else{
            res.status(203).json({"data": {"message": "Failed to create a new user!"}, "statusCode": 201, "errorCode": null, "errorMessage": null});
        }
    }
    catch(e){
        res.status(500).json({"data": null, "statusCode": 500, "errorCode": 500, "errorMessage": String(e)});
    }

}


// export default {addUser, fetchUser};
// export default addUser;

