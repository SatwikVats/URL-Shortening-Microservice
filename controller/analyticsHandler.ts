import moment from "moment";

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

export const getTimeBasedAnalyticsHandler = async (req: any, res: any) => {
    try{
        const result = await Analytics.findOne({shortURL: req.params.shortURL, userId: req.params.userId});
        if(result){
            const clicks = result.click;
            const clickCounts = new Map();

            clicks.forEach(click => {
                const hour = moment(click.createdAt).hour();

                const intervalStart = Math.floor(hour/3) * 3;
                const intervalEnd = intervalStart + 3;
                const intervalKey = `${intervalStart}:00-${intervalEnd}:00`;

                clickCounts.set(intervalKey, (clickCounts.get(intervalKey) || 0) + 1);
            })

            let mostActiveInterval = Array.from(clickCounts.keys())[0];
            clickCounts.forEach((count, interval) => {
                if(clickCounts.get(interval) > clickCounts.get(mostActiveInterval)){
                    mostActiveInterval = interval;
                }
            })

            res.status(200).json({"data": {"message":`Most active hours: ${mostActiveInterval}`}, "statusCode": 200, "errorCode": null, "errorMessage": null});
        }
        else{
            res.status(203).json({"data": {"message": "No analytics found for this short URL!"}, "statusCode": 203, "errorCode": null, "errorMessage": null});
        }

    }
    catch(err){
        res.status(500).json({"data": null, "statusCode": 500, "errorCode": 500, "errorMessage": String(err)});
    }
}

