import mongoose from "mongoose";
import { DBNAME } from "../constants.js";

const connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`);
        console.log("Mongo DB connection successfull!!");
    } catch (error) {
        console.log("Mongo DB connection failed!!",error);
        process.exit(1);
    }
}

export default connectdb