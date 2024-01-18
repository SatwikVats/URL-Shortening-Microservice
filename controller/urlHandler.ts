import randomatic from "randomatic";

import URL from "../model/url.model";
import convertIdToShortURL from "../util/convertIdToShortURL";
import Analytics from "../model/analytics.model";

const generateUniqueNumber = async (): Promise<number> => {
    const uniqueInteger = parseInt(randomatic('0', 6));
    const existingEntry = await URL.findOne({integerId: uniqueInteger});
    if(existingEntry){
        return generateUniqueNumber();
    }
    else{
        return uniqueInteger;
    }
}

export const urlHandler = async (req: any, res: any)=>{
    try{ 
        const result = await URL.findOne({longURL: req.body.url, userId: req.params.userId});
        if(result){
            res.status(203).json({"data": {"message": "Short URL for this URL has already been generated!"}, "statusCode": 203, "errorCode": null, "errorMessage": null});
        }
        else{
            const integerId = await generateUniqueNumber();
            const shortURL = convertIdToShortURL(integerId);
            const urlObject = {
                userId: req.params.userId,
                longURL: req.body.url,
                integerId: integerId,
                shortURL: shortURL,
            };
            const newURL = new URL(urlObject);
            const savedURL = await newURL.save();

            const analyticsObject = {
                userId: req.params.userId,
                longURL: req.body.url,
                shortURL: shortURL,
                totalClicks: 0,
                click: [],
            }
            const newAnalytics = new Analytics(analyticsObject);
            const savedAnalytics = await newAnalytics.save();

            if(savedURL && savedAnalytics){
                res.status(201).json({"data": savedURL, "statusCode": 201, "errorCode": null, "errorMessage": null});
            }
            else{
                res.status(203).json({"data": {"message": "Failed to save the user details!"}, "statusCode": 203, "errorCode": null, "errorMessage": null});
            }            
        }
    }
    catch(err){
        res.status(500).json({"data": null, "statusCode": 500, "errorCode": 500, "errorMessage": String(err)});
    }
}

export const fetchLongURLHandler = async (req: any, res: any)=>{
    try{
        const {shortURL, userId} = req.params;
        const result = await URL.findOne({shortURL: shortURL, userId: userId});
        if(result){

            let location = "Longitude:X Latitude:Y";
            
            //  To be captured in the Frontend and sent as a request body.
            // window.navigator.geolocation.getCurrentPosition((position) => {
            //     const latitude = position.coords.latitude;
            //     const longitude = position.coords.longitude;
            //     location = `Latitude:${latitude} Longitude:${longitude}`;
            //     console.log("location", location);
            // },
            // (err)=> {
            //     console.log("Failed to fetch user location!");
            // });

            let userAgent = "ABC";
            // userAgent = navigator.userAgent;
            // console.log("userAgent", userAgent);
            
            try{
                const analyticsResult = await Analytics.findOneAndUpdate({shortURL: shortURL, userId: userId},{
                    $inc: {totalClicks: 1},
                    $push: {click: {location: location, userAgent: userAgent}},
                },
                {
                    new: true,
                })
            }
            catch(err){
                console.log("Error updating the analytics:", err);
            }

            const {longURL} = result;
            const responseData = {longURL};
            res.status(200).json({"data": responseData, "statusCode": 200, "errorCode": null, "errorMessage": null});
        }
        else{
            res.status(204).json({"data": {"message": "This short URL does not exist in our DB"}, "statusCode": 204, "errorCode": null, "errorMessage": null});
        }
    }
    catch(err){
        res.status(500).json({"data": null, "statusCode": 500, "errorCode": 500, "errorMessage": String(err)});
    }
}
