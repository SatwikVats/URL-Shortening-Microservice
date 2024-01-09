import { json } from "express";
import User from "../model/user.model";

const fetchUser = async (req: any, res: any) => {
    try{
        const user = await User.findOne({username: req.body.username});
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


const addUser = async (req: any, res: any) => {
    const result = await User.insertMany({username: req.body.username, password: req.body.password});
    if(result){
        res.status(201).json({"data": result, "statusCode": 201, "errorCode": null, "errorMessage": null});
    }
    else{
        res.status(203).json({"data": {"message": "Failed to create a new user!"}, "statusCode": 201, "errorCode": null, "errorMessage": null});
    }
}

