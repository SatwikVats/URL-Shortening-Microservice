import Analytics from "../model/analytics.model";

export const getAnalyticsHandler = async (req: any, res: any)=> {
    try{
        const result = await Analytics.findOne({shortURL: req.params.shortURL, userId: req.params.userId});
        if(result){
            res.status(200).json({"data": result, "statusCode": 200, "errorCode": null, "errorMessage": null});
        }
        else{
            res.status(203).json({"data": {"message": "No analytics found for this short URL!"}, "statusCode": 203, "errorCode": null, "errorMessage": null});
        }
    }
    catch(err){
        res.status(500).json({"data": null, "statusCode": 500, "errorCode": 500, "errorMessage": String(err)});
    }
}



