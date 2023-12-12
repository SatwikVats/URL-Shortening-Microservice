import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try{
        if(process.env.DATABASE_URI){
            
        }
        // const options: MongoClientOptions
        await mongoose.connect(process.env.DATABASE_URI || "", {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        });
    }
    catch(err){
        console.log(err);
    }
    
}

module.exports = connectDB;