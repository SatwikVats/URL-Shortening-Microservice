import { json } from "express";
import User from "../model/user.model";

const fetchUser = async (req: any, res: any) => {
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

