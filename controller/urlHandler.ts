import randomatic from "randomatic";

import Mapping from "../model/mapping.model";
import URL from "../model/url.model";
import convertIdToShortURL from "../util/convertIdToShortURL";

const generateUniqueNumber = async (): Promise<number> => {
    const uniqueInteger = parseInt(randomatic('0', 6));
    const existingEntry = await Mapping.findOne({uniqueId: uniqueInteger});
    if(existingEntry){
        return generateUniqueNumber();
    }
    else{
        return uniqueInteger;
    }
}

export const urlHandler = async (req: any, res: any)=>{
    try{ 
        const result = await URL.findOne({longURL: req.body.url});
        if(result){
            res.status(200).json({"data": result, "statusCode": 200, "errorCode": null, "errorMessage": null});
        }
        else{
            const integerId = await generateUniqueNumber();
            const shortURL = convertIdToShortURL(integerId);
            const urlObject = {
                userId: req.body.userId,
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
        res.status(500).json({message: String(err)});
    }
}

export const fetchLongURLHandler = async (req: any, res: any)=>{
    try{
        const {shortURL, userId} = req.params;
        console.log("shortURL", shortURL);
        console.log("userId", userId);
        const result = await URL.findOne({shortURL: shortURL, userId: userId});
        if(result){
            const {longURL} = result;
            const responseData = {longURL};
            res.status(200).json({"data": responseData, "statusCode": 200, "errorCode": null, "errorMessage": null});
        }
        else{
            res.status(204).json({"data": {"message": "This short URL does not exist in our DB"}, "statusCode": 204, "errorCode": null, "errorMessage": null});
        }
    }
    catch(err){
        res.status(500).json({message: String(err)});
    }
}
