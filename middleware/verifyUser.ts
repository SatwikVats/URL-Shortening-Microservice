import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyUser = (req:any, res:any, next:any) => {
    const token = req.headers.authorization;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    if(token){
        //jsonwebtoken.verify(token, jwtSecretKey, )
    }

}