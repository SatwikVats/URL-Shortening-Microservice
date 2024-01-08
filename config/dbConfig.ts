import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try{
        if(process.env.DATABASE_URI){
           console.log("Able to fetch URI from env"); 
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

export default connectDB;