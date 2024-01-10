import { json } from "express";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import User from "../model/user.model";

dotenv.config()

export const fetchUser = async (req: any, res: any) => {
    try{
        const user = await User.findOne({username: req.body.username});
        console.log("typeof(user)" ,typeof(user));
        

        if(user){

            let jwtSecretKey: string = process.env.JWT_SECRET_KEY!;
            console.log("jwtSecretKey while signing:", jwtSecretKey);
            const token = jwt.sign(user.username, jwtSecretKey);

            let passwordSecretKey: string= process.env.PASSWORD_SECRET_KEY!;
            const decodedPassword = CryptoJS.AES.decrypt(req.body.password, passwordSecretKey).toString(CryptoJS.enc.Utf8);

            if(req.body.password !== decodedPassword){
                res.status(200).json({"data": {"userData": user, "accessToken": token}, "statusCode": 200, "errorCode": null, "errorMessage": null});
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
        let passwordSecretKey: string= process.env.PASSWORD_SECRET_KEY!;
        if(typeof(passwordSecretKey)!==undefined){
            const userData = {username: req.body.username, password: CryptoJS.AES.encrypt(req.body.password, passwordSecretKey).toString()};
            const result = await User.insertMany(userData);
            if(result){
                res.status(201).json({"data": {"userData": result}, "statusCode": 201, "errorCode": null, "errorMessage": null});
            }
            else{
                res.status(203).json({"data": {"message": "Failed to create a new user!"}, "statusCode": 201, "errorCode": null, "errorMessage": null});
            }
        }
        else{
            throw new Error("Hashing of password failed due to missing secret key!");    
        }
    }
    catch(e){
        res.status(500).json({"data": null, "statusCode": 500, "errorCode": 500, "errorMessage": String(e)});
    }

}


// export default {addUser, fetchUser};
// export default addUser;

