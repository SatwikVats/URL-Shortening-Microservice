import * as randomatic from "randomatic";

import Mapping from "../model/mapping.model";
import URL from "../model/url.model";
import convertIdToShortURL from "../util/convertIdToShortURL";

const generateUniqueNumber = async () => {
    const uniqueInteger = parseInt(randomatic('0', 6));
    const existingEntry = await Mapping.findOne({uniqueId: uniqueInteger});
    if(existingEntry){
        return generateUniqueNumber();
    }
    else{
        return uniqueInteger;
    }
}

const urlHandler = async (req: any, res: any)=>{
    try{
        // const result = await Mapping.findOne({longURL: req.body.url});
        // if(result){
        //     const integerId = result.uniqueId;
        //     const shortURL = convertIdToShortURL(integerId);
        //     const urlObject = {
        //         longURL: req.body.url,
        //         integerId: integerId,
        //         shortURL: shortURL,
        //     };
        //     const newURL = new URL(urlObject);
        //     const savedURL = await newURL.save();
        //     res.status(201).json({"data": savedURL, "statusCode": 201, "errorCode": null, "errorMessage": null});
        // } 

        const result = await URL.findOne({longURL: req.body.url});
        if(result){
            res.status(200).json({"data": result, "statusCode": 200, "errorCode": null, "errorMessage": null});
        }
        else{
            const integerId = generateUniqueNumber();
            const shortURL = convertIdToShortURL(integerId);
            const urlObject = {
                longURL: req.body.url,
                integerId: integerId,
                shortURL: shortURL,
            };
            const newURL = new URL(urlObject);
            const savedURL = await newURL.save();
            res.status(201).json({"data": savedURL, "statusCode": 201, "errorCode": null, "errorMessage": null});
        }
    }
    catch(err){
        res.status(500).json({message: "Error shortening the URL."});
    }
}

export default urlHandler;