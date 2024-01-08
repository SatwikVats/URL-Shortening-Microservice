import randomatic from "randomatic";

import Mapping from "../model/mapping.model";
import { Collection } from "mongoose";

const generateUniqueNumber = async (): Promise<number> => {
    const randomInt = randomatic('0', 6);
    const uniqueInteger = parseInt(randomInt);
    const existingEntry = await Mapping.findOne({uniqueId: uniqueInteger});
    if(existingEntry){
        return generateUniqueNumber();
    }
    else{
        return uniqueInteger;
    }
}

const mappingHandler = async (req: any, res: any)=>{
    try{
        const mappingObject = {
            longURL: req.body.url,
            uniqueId: generateUniqueNumber(),
        };

        const newMapping = new Mapping(mappingObject);
        const savedMapping = await newMapping.save();
        res.status(201).json({"data": savedMapping, "statusCode": 201, "errorCode": null, "errorMessage": null});
    }
    catch(err){
        res.status(500).json({message: "Error saving the URL."});
    }
}

export default mappingHandler;