import dotenv from "dotenv";

dotenv.config();

export const analyticsCacheHandler = async (req: any, res: any, next: any) => {
    try{

    }
    catch(err){
        res.status(500).json({"data": null, "statusCode": 500, "errorCode": 500, "errorMessage": String(err)});
    }

}